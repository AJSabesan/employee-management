import { Request, Response, NextFunction } from 'express'

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Please log in first' })
  }
  next()
}

export default requireAuth
