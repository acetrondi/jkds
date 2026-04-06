import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'adminAuth'

export function useAdminAuth() {
  const navigate = useNavigate()

  const isAuthenticated = Boolean(sessionStorage.getItem(STORAGE_KEY))

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) return false
      const { token } = (await res.json()) as { token: string }
      sessionStorage.setItem(STORAGE_KEY, token)
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    navigate('/admin/login', { replace: true })
  }

  return { isAuthenticated, login, logout }
}
