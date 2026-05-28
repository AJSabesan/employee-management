import express from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import employeeRoutes from './routes/employees'

dotenv.config()

const app   = express()
const PORT  = process.env.PORT  || 5000
const MONGO = process.env.MONGODB_URI || ''
const SECRET = process.env.SESSION_SECRET || 'fallback_secret'

// Connect MongoDB
mongoose.connect(MONGO)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('❌ MongoDB error:', err); process.exit(1) })

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,           // ← important for sessions + cookies
}))
app.use(express.json())

// ─── Sessions stored in MongoDB ───────────────────────────────────────────────
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO,
    collectionName: 'sessions',  // sessions saved in MongoDB
    ttl: 24 * 60 * 60,           // session expires in 1 day
  }),
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: false,               // set true in production with HTTPS
  },
}))

// Routes
app.use('/api/auth',      authRoutes)
app.use('/api/employees', employeeRoutes)

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
