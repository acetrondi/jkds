/**
 * Upload all public/ images to ImageKit and rewrite the JSON config files.
 * Run: node scripts/upload-to-imagekit.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ImageKit from 'imagekit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Load .env.local manually ──────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env.local')
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
    .filter(([k]) => k)
    .map(([k, ...v]) => [k, v.join('=')])
)

const ik = new ImageKit({
  publicKey:   env.VITE_IMAGEKIT_PUBLIC_KEY,
  privateKey:  env.VITE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.VITE_IMAGEKIT_URL_ENDPOINT,
})

const IK_ENDPOINT = env.VITE_IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '')

// ── Helpers ───────────────────────────────────────────────────────────────────
/** Upload a single file buffer to ImageKit. Returns the CDN url. */
async function uploadFile(filePath, ikFolder) {
  const buffer = fs.readFileSync(filePath)
  const fileName = path.basename(filePath)
  const res = await ik.upload({
    file: buffer,
    fileName,
    folder: ikFolder,
    useUniqueFileName: false,
    overwriteFile: true,
  })
  return res.url
}

/** Map a local public path like /projects/foo/bar.avif → ImageKit URL */
function localToIK(localPath) {
  // localPath might be "/projects/foo/bar.avif" or "/hero/1.png" etc.
  const rel = localPath.replace(/^\//, '') // strip leading slash
  return `${IK_ENDPOINT}/${rel}`
}

let uploaded = 0
let skipped = 0

async function uploadDir(dir, ikFolder) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await uploadDir(full, `${ikFolder}/${entry.name}`)
    } else if (/\.(png|jpg|jpeg|avif|webp|gif|svg)$/i.test(entry.name)) {
      try {
        process.stdout.write(`  uploading ${full.replace(ROOT, '')} ... `)
        const url = await uploadFile(full, ikFolder)
        console.log(`✓  ${url}`)
        uploaded++
      } catch (err) {
        console.log(`✗  ${err.message}`)
        skipped++
      }
    }
  }
}

// ── Upload images ─────────────────────────────────────────────────────────────
console.log('\n📤  Uploading images to ImageKit...\n')

// Hero images
console.log('── hero ──')
await uploadDir(path.join(ROOT, 'public/hero'), '/hero')

// Project images
console.log('\n── projects ──')
await uploadDir(path.join(ROOT, 'public/projects'), '/projects')

console.log(`\n✅  Done. ${uploaded} uploaded, ${skipped} failed.\n`)

// ── Rewrite JSON configs ───────────────────────────────────────────────────────
console.log('📝  Rewriting JSON configs with ImageKit URLs...\n')

// projects.json
const projectsPath = path.join(ROOT, 'src/data/projects.json')
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'))

for (const p of projects) {
  p.images      = p.images.map(u => u.startsWith('/') ? localToIK(u) : u)
  p.cover_images = p.cover_images.map(u => u.startsWith('/') ? localToIK(u) : u)
  if (p.testimonial?.image?.startsWith('/')) {
    p.testimonial.image = localToIK(p.testimonial.image)
  }
}
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 4))
console.log('  ✓  src/data/projects.json updated')

// hero.json
const heroPath = path.join(ROOT, 'src/data/hero.json')
const hero = JSON.parse(fs.readFileSync(heroPath, 'utf8'))
for (const s of hero) {
  if (s.image?.startsWith('/')) s.image = localToIK(s.image)
}
fs.writeFileSync(heroPath, JSON.stringify(hero, null, 2))
console.log('  ✓  src/data/hero.json updated')

// ── Upload config JSONs to ImageKit ───────────────────────────────────────────
console.log('\n☁️   Uploading config JSONs to ImageKit /config/ ...\n')

async function uploadJSON(data, filename) {
  const buffer = Buffer.from(JSON.stringify(data, null, 2))
  await ik.upload({
    file: buffer,
    fileName: filename,
    folder: '/config',
    useUniqueFileName: false,
    overwriteFile: true,
  })
  console.log(`  ✓  /config/${filename}`)
}

const testimonials = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/data/testimonials.json'), 'utf8')
)

await uploadJSON(projects,     'projects.json')
await uploadJSON(hero,         'hero.json')
await uploadJSON(testimonials, 'testimonials.json')

console.log('\n🎉  All done! Config live on ImageKit.')
