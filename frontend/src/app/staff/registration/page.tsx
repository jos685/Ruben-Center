'use client'

import { useEffect, useState } from 'react'

type FormData = {
  name: string
  phone: string
  gender: string
  age: string
  assigned_office: string
  has_paid: boolean
  payment_method: string
}

type Patient = {
  id: number
  name: string
  phone: string
  gender: string
  age: string
  assigned_office: string
  has_paid: boolean
  payment_method: string | null
}

export default function RegistrationDashboard() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    gender: '',
    age: '',
    assigned_office: '',
    has_paid: false,
    payment_method: '',
  })

  const [patients, setPatients] = useState<Patient[]>([])
  const [message, setMessage] = useState('')

  const fetchPatients = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://127.0.0.1:8000/api/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (!res.ok) throw new Error('Failed to fetch patients')
      const data = await res.json()
      setPatients(data)
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setForm({ ...form, [name]: newValue })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://127.0.0.1:8000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to register patient')
      await res.json()
      setMessage('✅ Patient registered successfully!')
      fetchPatients()

      setForm({
        name: '',
        phone: '',
        gender: '',
        age: '',
        assigned_office: '',
        has_paid: false,
        payment_method: '',
      })
    } catch (err: unknown) {
      if(err instanceof Error){
        setMessage(err.message)
      }else{
         setMessage('Something went wrong')
      }
     
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          📝 Patient Registration
        </h2>

        {message && (
          <div className="mb-4 text-center text-green-600 font-medium">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <table className="w-full text-left border-spacing-y-4 border-separate">
            <tbody>
              <tr>
                <td className="font-medium text-gray-700">Patient Full Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 text-gray-900"
                    placeholder="e.g. Mwikali Wambui"
                  />
                </td>
              </tr>

              <tr>
                <td className="font-medium text-gray-700">Phone Number</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 text-gray-900"
                    placeholder="07XXXXXXXX"
                  />
                </td>
              </tr>

              <tr>
                <td className="font-medium text-gray-700">Age</td>
                <td>
                  <input
                    type="text"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 text-gray-900"
                    placeholder="Years Old"
                  />
                </td>
              </tr>

              <tr>
                <td className="font-medium text-gray-700">Gender</td>
                <td>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 text-gray-900"
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="font-medium text-gray-700">Assign to Office</td>
                <td>
                  <select
                    name="assigned_office"
                    value={form.assigned_office}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 text-gray-900"
                  >
                    <option value="">-- Select Office --</option>
                    <option value="consultation office 1">Consultation</option>
                    <option value="dentist office 1">Clinic</option>
                    <option value="maternity office 1">Maternity</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="font-medium text-gray-700">Has Paid</td>
                <td>
                  <input
                    type="checkbox"
                    name="has_paid"
                    checked={form.has_paid}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-900">Yes</span>
                </td>
              </tr>

              {form.has_paid && (
                <tr>
                  <td className="font-medium text-gray-700">Payment Method</td>
                  <td>
                    <select
                      name="payment_method"
                      value={form.payment_method}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 text-gray-900"
                    >
                      <option value="">-- Select Method --</option>
                      <option value="Cash">Cash</option>
                      <option value="Paybill">Paybill</option>
                    </select>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              Register Patient
            </button>
          </div>
        </form>

        {patients.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-green-700 text-center">
              🧾 Today&apos;s Registered Patients
            </h3>
            <table className="w-full text-sm border border-black-700">
              <thead className="bg-green-400 text-left">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Office</th>
                  <th className="p-2">Paid</th>
                  <th className="p-2">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p: Patient) => (
                  <tr key={p.id} className="border-t border-gray-200">
                    <td className="p-2 text-gray-900">{p.name}</td>
                    <td className="p-2 text-gray-900">{p.phone}</td>
                    <td className="p-2 text-gray-900">{p.gender}</td>
                    <td className="p-2 text-gray-900">{p.age}</td>
                    <td className="p-2 text-gray-900">{p.assigned_office}</td>
                    <td className="p-2 text-red-900">{p.has_paid ? 'Yes' : 'No'}</td>
                    <td className="p-2 text-gray-900">{p.payment_method || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
