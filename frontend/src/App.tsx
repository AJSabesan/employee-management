import React, { useState, useEffect } from 'react'
import { Users, LogOut, Plus, Pencil, Trash2, AlertTriangle, Sparkles } from 'lucide-react'
import { Employee, EmployeeFormData } from './types'
import * as api from './services/api'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmployeeForm from './components/EmployeeForm'
import EmployeeCard from './components/EmployeeCard'

type Page = 'login' | 'register' | 'app'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    inactive: 'bg-gray-100 text-gray-600 ring-gray-200',
    'on-leave': 'bg-amber-100 text-amber-700 ring-amber-200',
  }
  const dot: Record<string, string> = {
    active: 'bg-emerald-500',
    inactive: 'bg-gray-400',
    'on-leave': 'bg-amber-500',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${map[status] || map.inactive}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status] || dot.inactive}`} />
      {status.replace('-', ' ')}
    </span>
  )
}

function Avatar({ emp }: { emp: Employee }) {
  const initials = `${emp.firstName[0]}${emp.lastName[0]}`.toUpperCase()
  return (
    <div className="bg-brand-gradient flex items-center justify-center font-bold text-white shadow-soft"
      style={{ width: 40, height: 40, borderRadius: 12, fontSize: 14 }}>
      {initials}
    </div>
  )
}

const App: React.FC = () => {
  const [page, setPage]               = useState<Page>('login')
  const [userName, setUserName]       = useState('')
  const [employees, setEmployees]     = useState<Employee[]>([])
  const [loading, setLoading]         = useState(false)
  const [showForm, setShowForm]       = useState(false)
  const [editTarget, setEditTarget]   = useState<Employee | null>(null)
  const [viewTarget, setViewTarget]   = useState<Employee | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)
  const [toast, setToast]             = useState('')

  useEffect(() => {
    api.getMe().then(data => {
      if (data.loggedIn) { setUserName(data.name); setPage('app') }
    })
  }, [])

  useEffect(() => {
    if (page === 'app') loadEmployees()
  }, [page])

  const loadEmployees = async () => {
    setLoading(true)
    try { setEmployees(await api.getEmployees()) }
    catch { showToast('Failed to load employees') }
    finally { setLoading(false) }
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleLogin = (name: string) => { setUserName(name); setPage('app') }

  const handleLogout = async () => {
    await api.logout()
    setUserName(''); setEmployees([]); setPage('login')
  }

  const handleSave = async (data: EmployeeFormData) => {
    if (editTarget) {
      await api.updateEmployee(editTarget._id, data)
      showToast('Employee updated!')
    } else {
      await api.createEmployee(data)
      showToast('Employee added!')
    }
    setShowForm(false); setEditTarget(null); loadEmployees()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await api.deleteEmployee(deleteTarget._id)
    showToast('Employee deleted')
    setDeleteTarget(null); setViewTarget(null); loadEmployees()
  }

  const openEdit = (emp: Employee) => {
    setEditTarget(emp); setViewTarget(null); setShowForm(true)
  }

  if (page === 'login') return <LoginPage onLogin={handleLogin} goToRegister={() => setPage('register')} />
  if (page === 'register') return <RegisterPage onLogin={handleLogin} goToLogin={() => setPage('login')} />

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-brand-gradient sticky top-0 z-30 shadow-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Employee Manager</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur sm:inline-flex">
              Hello, {userName} 👋
            </span>
            <button
              onClick={() => { setEditTarget(null); setShowForm(true) }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#764ba2] shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" /> Add Employee
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Team Directory</h1>
          <p className="mt-1 text-sm text-gray-500">
            <span className="text-brand-gradient font-bold">{employees.length} employees</span> total
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 rounded-full border-4 border-purple-100 border-t-[#667eea] animate-spin" />
          </div>
        )}

        {!loading && employees.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="text-6xl">🗂️</span>
            <p className="mt-4 text-lg font-medium">No employees yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-brand-gradient mt-4 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Add first employee
            </button>
          </div>
        )}

        {!loading && employees.length > 0 && (
          <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Position</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr
                    key={emp._id}
                    onClick={() => setViewTarget(emp)}
                    className="cursor-pointer border-b border-gray-50 transition hover:-translate-y-0.5 hover:bg-purple-50/40 hover:shadow-soft"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar emp={emp} />
                        <div>
                          <div className="font-semibold text-gray-900">{emp.firstName} {emp.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.position}</td>
                    <td className="px-6 py-4"><StatusBadge status={emp.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={e => { e.stopPropagation(); openEdit(emp) }}
                          className="rounded-xl bg-purple-50 p-2 text-[#764ba2] transition hover:-translate-y-0.5 hover:bg-[#764ba2] hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); setDeleteTarget(emp) }}
                          className="rounded-xl bg-red-50 p-2 text-red-500 transition hover:-translate-y-0.5 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modals */}
      {viewTarget && !showForm && (
        <EmployeeCard
          employee={viewTarget}
          onEdit={() => openEdit(viewTarget)}
          onDelete={() => { setDeleteTarget(viewTarget); setViewTarget(null) }}
          onClose={() => setViewTarget(null)}
        />
      )}

      {showForm && (
        <EmployeeForm
          existing={editTarget}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null) }}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[#1a1033]/40 px-4 backdrop-blur-md"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="animate-slide-up mx-auto w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-7 text-center shadow-glow ring-1 ring-gray-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">Delete Employee?</h3>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-900">{deleteTarget.firstName} {deleteTarget.lastName}</span>?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-2xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-2xl py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60]">
          <div className="bg-brand-gradient animate-slide-in-right inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-glow">
            <Sparkles className="h-4 w-4" /> {toast}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
