import { Request, Response } from 'express'
import Employee from '../models/Employee'

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 })
    res.json(employees)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    res.status(201).json(employee)
  } catch (err) {
    res.status(400).json({ message: 'Could not create employee', error: err })
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!employee) return res.status(404).json({ message: 'Not found' })
    res.json(employee)
  } catch (err) {
    res.status(400).json({ message: 'Could not update', error: err })
  }
}

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted successfully' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}
