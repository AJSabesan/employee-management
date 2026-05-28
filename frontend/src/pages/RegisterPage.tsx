import React, { useState } from 'react'
import { Users, Eye, EyeOff } from 'lucide-react'
import { register } from '../services/api'

interface Props {
    onLogin: (name: string) => void
    goToLogin: () => void
}

const RegisterPage: React.FC<Props> = ({ onLogin, goToLogin }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const e: Record<string, string> = {}
        if (!name.trim()) e.name = 'Full name is required'
        else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters'
        else if (/[^a-zA-Z\s]/.test(name)) e.name = 'Name can only contain letters'
        if (!email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
        if (!password) e.password = 'Password is required'
        else if (password.length < 8) e.password = 'Password must be at least 8 characters'
        else if (/\s/.test(password)) e.password = 'Password cannot contain spaces'
        else if (!/[A-Z]/.test(password)) e.password = 'Must have at least one uppercase letter'
        else if (!/[0-9]/.test(password)) e.password = 'Must have at least one number'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setServerError('')
        if (!validate()) return
        setLoading(true)
        try {
            const data = await register(name, email, password)
            onLogin(data.user.name)
        } catch (err: any) {
            setServerError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="animate-float absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
                <div className="animate-float absolute right-0 top-1/3 h-96 w-96 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '2s' }} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="glass animate-slide-up relative z-10 w-full max-w-md rounded-[28px] p-10 shadow-glow ring-1 ring-white/40"
            >
                <div className="flex flex-col items-center">
                    <div className="bg-brand-gradient animate-bounce-slow flex h-20 w-20 items-center justify-center rounded-3xl shadow-glow">
                        <Users className="h-10 w-10 text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-brand-gradient mt-5 text-3xl font-extrabold tracking-tight">Employee Manager</h1>
                    <p className="mt-1 text-sm text-gray-500">Create your account</p>
                </div>

                {serverError && (
                    <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
                        ⚠️ {serverError}
                    </div>
                )}

                <div className="mt-8 space-y-4">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                            className={`mt-1.5 w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#764ba2] ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">⚠ {errors.name}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email *</label>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value.trim())}
                            placeholder="you@example.com"
                            className={`mt-1.5 w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#764ba2] ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">⚠ {errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Password *</label>
                        <div className="relative mt-1.5">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Min 8 chars, 1 uppercase, 1 number"
                                className={`w-full rounded-2xl border bg-white/80 px-4 py-3 pr-12 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#764ba2] ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#764ba2] transition"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">⚠ {errors.password}</p>}
                        <p className="mt-1 text-xs text-gray-400">Must be 8+ characters, include uppercase and number</p>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="bg-brand-gradient shadow-soft mt-2 flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-70"
                    >
                        {loading ? <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : 'Create Account'}
                    </button>

                    <p className="pt-2 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <button type="button" onClick={goToLogin} className="font-semibold text-[#764ba2] hover:underline">
                            Sign In
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage