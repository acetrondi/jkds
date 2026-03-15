import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'adminAuth'

export function useAdminAuth() {
  const navigate = useNavigate()

  const isAuthenticated = sessionStorage.getItem(STORAGE_KEY) === 'true'

  const login = (username: string, password: string): boolean => {
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (username === validUsername && password === validPassword) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    navigate('/admin/login', { replace: true })
  }

  return { isAuthenticated, login, logout }
}
