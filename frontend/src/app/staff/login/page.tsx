'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

export default function StaffLoginPage() {
  const [office, setOffice] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ office, password }),
        credentials: 'include',
      })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || 'Login failed')
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('office', data.office)

      router.push(`/staff/${data.office.toLowerCase().replace(/\s+/g, '-')}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed')
      }
    }
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Staff Login</h2>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="office" className="block mb-1 font-medium text-gray-900">
                Office/Department
              </label>
              <select
                id="office"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-green-500 text-gray-900"
                required
              >
                <option value="">-- Select Office --</option>
                <option value="registration">Registration</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="dentist_office_1">Dentist Office 1</option>
                <option value="dentist_office_2">Dentist Office 2</option>
                <option value="consultation_office_1">Consultation Office 1</option>
                <option value="consultation_office_2">Consultation Office 2</option>
                <option value="lab">Laboratory</option>
                <option value="maternity_office_1">Maternity Office 1</option>
                <option value="pediatric">Children Section / Clinic</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}
