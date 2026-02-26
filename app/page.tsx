'use client'

import { useState } from 'react'

export default function DonationForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [presetAmount, setPresetAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = presetAmount !== null ? presetAmount : (customAmount ? parseFloat(customAmount) : null)
    const formData = {
      firstName,
      lastName,
      email,
      donationAmount: amount,
      message: message || undefined,
    }
    console.log(formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-xl">Thank you</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">Donation Form</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm mb-1">First name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm mb-1">Last name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <span className="block text-sm mb-2">Donation amount</span>
          <div className="flex gap-2 flex-wrap mb-2">
            {[10, 25, 50, 100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setPresetAmount(amt)
                  setCustomAmount('')
                }}
                className={`px-4 py-2 border rounded ${presetAmount === amt ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value)
              setPresetAmount(null)
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm mb-1">Message (optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
