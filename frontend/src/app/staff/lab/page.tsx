'use client'

import { useEffect, useState } from 'react'

type Patient = {
  id: number
  name: string
  gender: string
  age: number
  notes?: string
  test_instructions?: string
  lab_report?: string
  status: string
}

export default function LabDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [labReport, setLabReport] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLabPatients = async () => {
      const token = localStorage.getItem('token')

      const res = await fetch('http://127.0.0.1:8000/api/patients?forward_to=lab', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (res.ok) {
        const data: Patient[] = await res.json()
        setPatients(data)
      }
    }

    fetchLabPatients()
  }, [])

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setLabReport(patient.lab_report || '')
    setError('')
  }

  const handleSubmitReport = async () => {
    if (!selectedPatient) return

    setLoading(true)
    setError('')

    const token = localStorage.getItem('token')

    const res = await fetch(`http://127.0.0.1:8000/api/patients/${selectedPatient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        lab_report: labReport,
        status: 'lab_checked',
        forward_to: 'doctor',
      }),
    })

    if (res.ok) {
      alert('Lab report submitted successfully')
      const updated: Patient = await res.json()
      setPatients((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      )
      setSelectedPatient(null)
      setLabReport('')
    } else {
      const err = await res.json()
      setError(err.message || 'Error submitting report')
    }

    setLoading(false)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        🧪 Patients Sent to Lab
      </h2>

      <table className="w-full border-collapse border border-gray-900 bg-white shadow-sm mb-6">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Age</th>
            <th className="p-2">Doctor&apos;s Notes</th>
            <th className="p-2">Test Instructions</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className="border-t border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPatient(p)}
            >
              <td className="p-2 text-blue-700 underline">{p.name}</td>
              <td className="p-2">{p.gender}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.notes}</td>
              <td className="p-2 text-sm text-gray-600">{p.test_instructions}</td>
              <td className="p-2 font-semibold text-yellow-600">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">
            📝 Write Lab Report for: {selectedPatient.name}
          </h3>

          <textarea
            rows={5}
            className="w-full p-2 border border-gray-400 rounded mb-2 text-gray-700"
            placeholder="Write lab findings, results, or notes..."
            value={labReport}
            onChange={(e) => setLabReport(e.target.value)}
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {loading && <p className="text-gray-500">Submitting...</p>}

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={handleSubmitReport}
            disabled={loading}
          >
            ✅ Submit Lab Report
          </button>

          <button
            className="ml-4 text-red-600"
            onClick={() => setSelectedPatient(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
