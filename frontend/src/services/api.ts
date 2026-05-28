import axios from 'axios'
import { Employee, EmployeeFormData } from '../types'

// withCredentials: true is important — sends the session cookie with every request
const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// Auth
export const register = (name: string, email: string, password: string) =>
  API.post('/auth/register', { name, email, password }).then(r => r.data)

export const login = (email: string, password: string) =>
  API.post('/auth/login', { email, password }).then(r => r.data)

export const logout = () =>
  API.post('/auth/logout').then(r => r.data)

export const getMe = () =>
  API.get('/auth/me').then(r => r.data)

// Employees
export const getEmployees = () =>
  API.get<Employee[]>('/employees').then(r => r.data)

export const createEmployee = (data: EmployeeFormData) =>
  API.post<Employee>('/employees', data).then(r => r.data)

export const updateEmployee = (id: string, data: EmployeeFormData) =>
  API.put<Employee>(`/employees/${id}`, data).then(r => r.data)

export const deleteEmployee = (id: string) =>
  API.delete(`/employees/${id}`).then(r => r.data)
