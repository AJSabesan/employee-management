export interface Employee {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  address: string
  status: 'active' | 'inactive'
  createdAt: string
}

export type EmployeeFormData = Omit<Employee, '_id' | 'createdAt'>

export interface User {
  name: string
  email: string
}
