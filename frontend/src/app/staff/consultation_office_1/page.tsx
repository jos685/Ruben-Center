'use client'

import { useEffect, useState } from 'react'

type Patient = {
  id: number
  name: string
  phone: string
  gender: string
  age: number
  assigned_office: string
  status: string
  notes?: string
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [testInstructions, setTestInstructions] = useState('')
  const [prescribedDrugs, setPrescribedDrugs] = useState('')

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token')

      const res = await fetch('http://127.0.0.1:8000/api/patients', {
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

    fetchPatients()
  }, [])

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setNotes(patient.notes || '')
    setStatus(patient.status || 'waiting')
    setTestInstructions('')
    setPrescribedDrugs('')
  }

  const handleUpdatePatient = async () => {
    if (!selectedPatient) return

    const token = localStorage.getItem('token')

    const payload = {
      notes,
      status: status === 'lab' || status === 'pharmacy' ? 'checked' : status,
      ...(status === 'lab' && {
        test_instructions: testInstructions,
        forward_to: 'lab',
      }),
      ...(status === 'pharmacy' && {
        prescribed_drugs: prescribedDrugs,
        forward_to: 'pharmacy',
      }),
    }

    const res = await fetch(`http://127.0.0.1:8000/api/patients/${selectedPatient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('Patient updated successfully')
      setSelectedPatient(null)
      const updated: Patient = await res.json()
      setPatients((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      )
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        🩺 Patients Waiting for Consultation
      </h2>

      <table className="w-full border-collapse border border-gray-900 bg-white shadow-sm">
        <thead className="bg-green-500 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Age</th>
            <th className="p-2">Office</th>
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
              <td className="p-2 text-blue-700">{p.phone}</td>
              <td className="p-2 text-blue-700">{p.gender}</td>
              <td className="p-2 text-blue-700">{p.age}</td>
              <td className="p-2 text-blue-700">{p.assigned_office}</td>
              <td className="p-2 text-yellow-600 font-semibold">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-2 text-green-700">
            📝 Update Patient: {selectedPatient.name}
          </h3>

          <textarea
            rows={4}
            className="w-full p-2 border border-gray-400 rounded mb-2 text-gray-700"
            placeholder="Write symptoms, diagnosis, or recommendations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <select
            className="w-full p-2 border border-gray-900 rounded mb-4 text-gray-900"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="checked">Just Seen</option>
            <option value="lab">Send to Lab</option>
            <option value="pharmacy">Send to Pharmacy</option>
          </select>

          {status === 'lab' && (
            <textarea
              rows={3}
              className="w-full p-2 border border-gray-400 rounded mb-2 text-gray-700"
              placeholder="Write lab test instructions..."
              value={testInstructions}
              onChange={(e) => setTestInstructions(e.target.value)}
            />
          )}

          {status === 'pharmacy' && (
            <textarea
              rows={3}
              className="w-full p-2 border border-gray-400 rounded mb-2 text-gray-700"
              placeholder="Write prescribed drugs..."
              value={prescribedDrugs}
              onChange={(e) => setPrescribedDrugs(e.target.value)}
            />
          )}

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleUpdatePatient}
          >
            ✅ Submit Details
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
