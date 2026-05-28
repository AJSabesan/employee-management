import React, { useState, useEffect } from 'react'
import { X, Plus, Pencil } from 'lucide-react'
import { Employee, EmployeeFormData } from '../types'

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design']
const EMPTY: EmployeeFormData = {
  firstName: '', lastName: '', email: '', phone: '',
  department: 'Engineering', position: '', address: '', status: 'active',
}
const inputCls = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#764ba2]"

interface Props {
  existing?: Employee | null
  onSave: (data: EmployeeFormData) => Promise<void>
  onCancel: () => void
}

const EmployeeForm: React.FC<Props> = ({ existing, onSave, onCancel }) => {
  const [form, setForm]       = useState<EmployeeFormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    setForm(existing ? {
      firstName: existing.firstName, lastName: existing.lastName,
      email: existing.email, phone: existing.phone,
      department: existing.department, position: existing.position,
      address: existing.address, status: existing.status,
    } : EMPTY)
  }, [existing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.position || !form.address) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try { await onSave(form) }
    catch { setError('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[#1a1033]/40 px-4 backdrop-blur-md"
      onClick={onCancel}
    >
      <form
        onSubmit={handleSubmit}
        className="animate-slide-up mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-glow ring-1 ring-gray-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-gradient flex items-center justify-between px-8 py-6 text-white">
          <h3 className="inline-flex items-center gap-2 text-xl font-bold">
            {existing ? <><Pencil className="h-5 w-5" /> Edit Employee</> : <><Plus className="h-5 w-5" /> Add Employee</>}
          </h3>
          <button
            type="button" onClick={onCancel}
            className="rounded-full bg-white/20 p-2 text-white transition hover:rotate-90 hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mx-8 mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Fields */}
        <div className="grid grid-cols-1 gap-4 px-8 py-7 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">First Name *</label>
            <input name="firstName" className={`mt-1.5 ${inputCls}`} value={form.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Last Name *</label>
            <input name="lastName" className={`mt-1.5 ${inputCls}`} value={form.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email *</label>
            <input name="email" type="email" className={`mt-1.5 ${inputCls}`} value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Phone *</label>
            <input name="phone" className={`mt-1.5 ${inputCls}`} placeholder="077 XXX XXXX" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Department *</label>
            <select name="department" className={`mt-1.5 ${inputCls}`} value={form.department} onChange={handleChange}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Position *</label>
            <input name="position" className={`mt-1.5 ${inputCls}`} value={form.position} onChange={handleChange} required />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Address *</label>
            <input name="address" className={`mt-1.5 ${inputCls}`} placeholder="No. 25, Main Street, Colombo" value={form.address} onChange={handleChange} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Status</label>
            <select name="status" className={`mt-1.5 ${inputCls}`} value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-8 py-5">
          <button
            type="button" onClick={onCancel}
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 transition hover:-translate-y-0.5"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={loading}
            className="bg-brand-gradient shadow-soft rounded-2xl px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-70"
          >
            {loading ? 'Saving...' : existing ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
