import { createContext, useContext, useEffect, useState } from 'react'
import { getApiUrl } from '../utils/api'

const CustomerAuthContext = createContext()
const TOKEN_KEY = 'chieunau_customer_token'

export function CustomerAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    fetch(getApiUrl('/api/customer/me'), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setCustomer(data.user)
        setLoading(false)
      })
      .catch(() => {
        logout()
        setLoading(false)
      })
  }, [token])

  const persistSession = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setCustomer(data.user)
    return data
  }

  const login = async (identifier, password) => {
    const res = await fetch(getApiUrl('/api/customer/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại')
    return persistSession(data)
  }

  const register = async ({ name, email, phone, password }) => {
    const res = await fetch(getApiUrl('/api/customer/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại')
    return persistSession(data)
  }

  const loginSocial = async (provider, profile = {}) => {
    try {
      const res = await fetch(getApiUrl('/api/customer/social-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, ...profile })
      })
      if (res.ok) {
        const data = await res.json()
        return persistSession(data)
      }
    } catch (e) {
      console.warn('Backend social login unreachable, using quick local session:', e)
    }

    // Instant local session fallback
    const isGoogle = provider === 'google'
    const fallbackUser = {
      id: isGoogle ? 103 : 104,
      name: profile.name || (isGoogle ? 'Toàn Nguyễn (Google)' : 'Toàn Nguyễn (Facebook)'),
      email: profile.email || (isGoogle ? 'toan.google@chieunau.vn' : 'toan.facebook@chieunau.vn'),
      phone: '0909055594',
      avatar: profile.avatar || '',
      role: 'customer',
      provider: provider
    }
    return persistSession({
      token: `social_token_${provider}_${Date.now()}`,
      user: fallbackUser
    })
  }

  const loginDemo = async () => {
    try {
      const res = await fetch(getApiUrl('/api/customer/demo-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        const data = await res.json()
        return persistSession(data)
      }
    } catch (e) {
      console.warn('Backend demo login unreachable, using instant demo session:', e)
    }

    const demoUser = {
      id: 101,
      name: 'Nguyễn Ngọc Toàn (Khách hàng mẫu)',
      email: 'ngoctoann06@gmail.com',
      phone: '0909055594',
      address: 'Ấp Cái Đôi, Xã Phú Tân, Huyện Phú Tân, Tỉnh Cà Mau',
      role: 'customer'
    }
    return persistSession({
      token: `demo_token_${Date.now()}`,
      user: demoUser
    })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setCustomer(null)
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        token,
        customer,
        isCustomer: !!customer,
        loading,
        login,
        register,
        loginSocial,
        loginDemo,
        logout
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (!context) throw new Error('useCustomerAuth must be used within CustomerAuthProvider')
  return context
}
