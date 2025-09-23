import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res = await api.login(email, password)
      if (res.token) {
        setToken(res.token)
        navigate('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (e2) {
      setError(e2.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3">
        <h1 className="text-xl font-semibold">Login</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}





