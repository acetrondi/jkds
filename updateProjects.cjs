const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'src', 'assets', 'projects');
const jsonPath = path.join(__dirname, 'src', 'data', 'projects.json');

const oldData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const folders = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());

const idMap = {
    'aphrodite-foods': 'aphrodtie-foods',
    'dr-dimple': 'dimple-chudgars',
    'nirmaan-heena': 'heena-building',
    'kanakias': 'kanakia-house',
    'mehul-mehta': 'mehul-mehta-house'
};

const newData = [];

for (const folder of folders) {
    const oldId = idMap[folder];
    let proj = oldData.find(p => p.id === oldId);
    
    if (!proj) {
         proj = {
             id: folder,
             title: folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
             description: "A stunning architectural showcase of premium design and luxurious details.",
             images: [],
             cover_images: [],
             testimonial: {
                 text: "An exemplary execution that flawlessly blended creativity with precision.",
                 image: "",
                 video: ""
             },
             is_hero_project: false,
             area: "500m²",
             style: "Modern Architecture",
             date: "2025"
         };
    } else {
         proj.id = folder; // Update ID to match folder
    }

    // Refresh images
    const files = fs.readdirSync(path.join(projectsDir, folder)).filter(f => f.endsWith('.avif') || f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
    
    files.sort();

    const imagePaths = files.map(f => `/src/assets/projects/${folder}/${f}`);
    
    proj.images = imagePaths;
    proj.cover_images = imagePaths.slice(0, 2);
    if(proj.testimonial && imagePaths.length > 2) {
       proj.testimonial.image = imagePaths[2];
    }
    newData.push(proj);
}

fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 4));
console.log('projects.json updated successfully with new folder architecture and local AVIF images!');
