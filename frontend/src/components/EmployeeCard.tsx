import React, { useEffect } from 'react'
import { X, Mail, Phone, Building2, MapPin, Calendar, Trash2, Pencil } from 'lucide-react'
import { Employee } from '../types'

interface Props {
  employee: Employee
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

const EmployeeCard: React.FC<Props> = ({ employee, onEdit, onDelete, onClose }) => {
  const initials = `${employee.firstName[0]}${employee.lastName[0]}`.toUpperCase()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[#1a1033]/40 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-slide-up mx-auto w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-glow ring-1 ring-gray-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-gradient relative px-8 pb-8 pt-7 text-white">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full bg-white/20 p-2 text-white transition hover:rotate-90 hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/25 text-2xl font-bold text-white ring-4 ring-white/30 backdrop-blur">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-white/85">{employee.position}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  employee.status === 'active'
                    ? 'bg-emerald-100/20 text-emerald-200 ring-emerald-200/30'
                    : 'bg-white/10 text-white/70 ring-white/20'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${employee.status === 'active' ? 'bg-emerald-400' : 'bg-white/50'}`} />
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 px-8 py-7">
          {[
            { icon: <Mail className="h-4 w-4" />, label: 'Email', value: employee.email },
            { icon: <Phone className="h-4 w-4" />, label: 'Phone', value: employee.phone },
            { icon: <Building2 className="h-4 w-4" />, label: 'Department', value: employee.department },
            { icon: <MapPin className="h-4 w-4" />, label: 'Address', value: employee.address },
            { icon: <Calendar className="h-4 w-4" />, label: 'Joined', value: new Date(employee.createdAt).toLocaleDateString() },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-[#764ba2]">
                {row.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">{row.label}</div>
                <div className="text-sm font-medium text-gray-800">{row.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-8 py-5">
          <button
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <button
            onClick={onEdit}
            className="bg-brand-gradient shadow-soft flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
