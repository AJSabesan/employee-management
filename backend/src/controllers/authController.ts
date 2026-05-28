import { Request, Response } from 'express'
import User from '../models/User'

// Extend session type
declare module 'express-session' {
  interface SessionData {
    userId: string
    userName: string
  }
}

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = new User({ name, email, password })
    await user.save()

    // Create session after register
    req.session.userId   = user._id.toString()
    req.session.userName = user.name

    res.status(201).json({ message: 'Registered successfully', user: { name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', err })
  }
}

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Create session
    req.session.userId   = user._id.toString()
    req.session.userName = user.name

    res.json({ message: 'Logged in successfully', user: { name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/auth/logout
export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' })
  })
}

// GET /api/auth/me  — check if logged in
export const getMe = (req: Request, res: Response) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, name: req.session.userName })
  } else {
    res.json({ loggedIn: false })
  }
}
