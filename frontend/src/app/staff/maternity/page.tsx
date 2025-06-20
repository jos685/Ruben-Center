'use client'

import { useEffect, useState } from 'react'

type Vitals = {
  temp: string
  bp: string
  hr: string
  rr: string
}

type Patient = {
  id: number
  name: string
  age: number
  admissionDate: string
  room?: string
  status: string
  vitals?: Vitals
  careNotes?: string
  medicationAdministered?: string
}

export default function MaternityNurses() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [vitals, setVitals] = useState<Vitals>({ temp: '', bp: '', hr: '', rr: '' })
  const [careNotes, setCareNotes] = useState('')
  const [status, setStatus] = useState('')
  const [medicationAdministered, setMedicationAdministered] = useState('')

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch('http://127.0.0.1:8000/api/patients?department=maternity', {
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
    setVitals(patient.vitals || { temp: '', bp: '', hr: '', rr: '' })
    setCareNotes(patient.careNotes || '')
    setStatus(patient.status || 'stable')
    setMedicationAdministered(patient.medicationAdministered || '')
  }

  const handleSubmitNursingNotes = async () => {
    if (!selectedPatient) return
    const token = localStorage.getItem('token')

    const res = await fetch(`http://127.0.0.1:8000/api/patients/${selectedPatient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        vitals,
        careNotes,
        status,
        medicationAdministered,
      }),
    })

    if (res.ok) {
      alert('Nursing notes updated')
      const updated: Patient = await res.json()
      setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setSelectedPatient(null)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        🏥 Maternity Patients Under Your Care
      </h2>

      <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Admission Date</th>
            <th className="p-2">Room/Bed</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className="border-t border-gray-200 hover:bg-green-50 cursor-pointer"
              onClick={() => handleSelectPatient(p)}
            >
              <td className="p-2 text-blue-700 underline">{p.name}</td>
              <td className="p-2 text-blue-700">{p.age}</td>
              <td className="p-2 text-blue-700">
                {new Date(p.admissionDate).toLocaleDateString()}
              </td>
              <td className="p-2 text-blue-700">{p.room || 'N/A'}</td>
              <td className="p-2 font-semibold text-yellow-800">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className="mt-8 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4 text-green-700">
            Update Care for {selectedPatient.name}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                className="w-full border text-black border-gray-800 rounded p-2"
                value={vitals.temp}
                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
              />
            </div>
            <div>
              <label className="text-blue-700 block font-semibold mb-1">Blood Pressure (mmHg)</label>
              <input
                type="text"
                className="w-full border text-black border-gray-800 rounded p-2"
                value={vitals.bp}
                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
              />
            </div>
            <div>
              <label className="text-blue-700 block font-semibold mb-1">Heart Rate (bpm)</label>
              <input
                type="number"
                className="w-full border text-black border-gray-800 rounded p-2"
                value={vitals.hr}
                onChange={(e) => setVitals({ ...vitals, hr: e.target.value })}
              />
            </div>
            <div>
              <label className="text-blue-700 block font-semibold mb-1">Respiratory Rate (breaths/min)</label>
              <input
                type="number"
                className="w-full border text-black border-gray-800 rounded p-2"
                value={vitals.rr}
                onChange={(e) => setVitals({ ...vitals, rr: e.target.value })}
              />
            </div>
          </div>

          <label className="text-blue-700 block font-semibold mb-1">Care Notes</label>
          <textarea
            rows={4}
            className="w-full border text-black border-gray-800 rounded p-2 mb-4"
            placeholder="Record symptoms, mood, feeding, other observations..."
            value={careNotes}
            onChange={(e) => setCareNotes(e.target.value)}
          />

          <label className="text-blue-700 block font-semibold mb-1">Medication Administered</label>
          <textarea
            rows={2}
            className="w-full border text-black border-gray-800 rounded p-2 mb-4"
            placeholder="Confirm medications given according to prescriptions"
            value={medicationAdministered}
            onChange={(e) => setMedicationAdministered(e.target.value)}
          />

          <label className="text-blue-700 block font-semibold mb-1">Patient Status</label>
          <select
            className="w-full border border-gray-800 text-blue-700 rounded p-2 mb-6"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="stable">Stable</option>
            <option value="needs attention">Needs Attention</option>
            <option value="critical">Critical</option>
            <option value="discharged">Discharged</option>
          </select>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-600 transition"
              onClick={handleSubmitNursingNotes}
            >
              Save Notes
            </button>
            <button
              className="text-red-600 px-4 py-2 rounded hover:underline"
              onClick={() => setSelectedPatient(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
