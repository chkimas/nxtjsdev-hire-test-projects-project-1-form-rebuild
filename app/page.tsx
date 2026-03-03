'use client'

import { useState, FormEvent } from 'react'

// Defined the form data for TypeScript safety
type DonationData = {
  firstName: string
  lastName: string
  email: string
  presetAmount: number | null
  customAmount: string
  message: string
}

export default function DonationForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<DonationData>({
    firstName: '',
    lastName: '',
    email: '',
    presetAmount: null,
    customAmount: '',
    message: ''
  })

  const totalSteps = 3

  const update = (fields: Partial<DonationData>) => {
    setError(null) // Clear errors when user provides input
    setData(prev => ({ ...prev, ...fields }))
  }

  const handleNext = (e: FormEvent) => {
    e.preventDefault()

    // Friendly validation errors
    if (step === 1 && (!data.firstName || !data.lastName || !data.email)) {
      setError("Please let us know who you are before moving to the next step.")
      return
    }
    if (step === 2 && !data.presetAmount && !data.customAmount) {
      setError("Please choose or enter an amount to continue.")
      return
    }

    if (step < totalSteps) {
      setStep(s => s + 1)
    } else {
      // Calculate final amount and log as a single object
      const amount = data.presetAmount ?? (data.customAmount ? parseFloat(data.customAmount) : 0)
      console.log("Donation Submitted:", { ...data, donationAmount: amount })
      setSubmitted(true)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSubmitted(false)
    setError(null)
    setData({
      firstName: '',
      lastName: '',
      email: '',
      presetAmount: null,
      customAmount: '',
      message: ''
    })
  }

  if (submitted) return <SuccessView firstName={data.firstName} onReset={resetForm} />

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-blue-600 h-2 transition-all duration-300" 
            style={{ width: `${(step / totalSteps) * 100}%` }} 
          />
        </div>

        <form onSubmit={handleNext} className="p-6 space-y-5">
          <header>
            <h1 className="text-xl font-bold text-gray-800">Donation Form</h1>
            <p className="text-sm text-gray-500 font-medium">Step {step} of {totalSteps}</p>
          </header>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded text-xs border border-red-100 animate-in fade-in">
              {error}
            </div>
          )}

          {/* Logical grouping of fields per step */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider border-b pb-1">Personal Details</p>
              <Input label="First Name" value={data.firstName} onValueChange={v => update({ firstName: v })} />
              <Input label="Last Name" value={data.lastName} onValueChange={v => update({ lastName: v })} />
              <Input label="Email" type="email" value={data.email} onValueChange={v => update({ email: v })} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider border-b pb-1">Donation Amount</p>
              <div className="grid grid-cols-2 gap-2">
                {[10, 25, 50, 100].map(amt => (
                  <button key={amt} type="button" onClick={() => update({ presetAmount: amt, customAmount: '' })}
                    className={`p-2 border rounded text-sm font-bold transition-colors ${data.presetAmount === amt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}>
                    ${amt}
                  </button>
                ))}
              </div>
              <input type="number" placeholder="Custom amount" value={data.customAmount} onChange={e => update({ customAmount: e.target.value, presetAmount: null })}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider border-b pb-1">Final Message</p>
              <div className="text-[11px] bg-blue-50 p-2 rounded text-blue-700 border border-blue-100">
                <strong>Summary:</strong> {data.firstName} {data.lastName} — ${data.presetAmount || data.customAmount || 0}
              </div>
              <textarea placeholder="Optional message..." rows={3} value={data.message} onChange={e => update({ message: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none" />
            </div>
          )}

          <footer className="flex justify-between items-center pt-4">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => { setStep(s => s - 1); setError(null); }} 
                className="text-sm font-bold text-gray-400 hover:text-gray-600"
              >
                Back
              </button>
            )}
            <button type="submit" className="ml-auto bg-gray-900 text-white px-5 py-2 rounded font-bold text-sm hover:bg-black transition-colors">
              {step === totalSteps ? 'Submit' : 'Continue'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

// Simple helpers to keep the main component readable
function Input({ label, value, onValueChange, type = "text" }: { 
  label: string, 
  value: string, 
  onValueChange: (v: string) => void, 
  type?: string
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={e => onValueChange(e.target.value)} 
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors" 
      />
    </div>
  )
}

function SuccessView({ firstName, onReset }: { firstName: string, onReset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm border-t-4 border-green-500 animate-in zoom-in">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Thanks, {firstName}!</h2>
        <p className="text-gray-600 text-sm mb-6">Your donation has been logged successfully.</p>
        
        <button 
          onClick={onReset}
          className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Submit another donation
        </button>
      </div>
    </div>
  )
}