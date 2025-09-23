import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { decodeJwt, getToken, saveToken, clearToken } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken())
  const [user, setUser] = useState(() => (getToken() ? decodeJwt(getToken()) : null))

  useEffect(() => {
    if (token) {
      saveToken(token)
      setUser(decodeJwt(token))
    } else {
      clearToken()
      setUser(null)
    }
  }, [token])

  const value = useMemo(() => ({ token, setToken, user, logout: () => setToken(null) }), [token, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}





