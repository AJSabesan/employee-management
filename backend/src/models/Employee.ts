import mongoose, { Document, Schema } from 'mongoose'

export interface IEmployee extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  address: string
  status: 'active' | 'inactive'
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName:  { type: String, required: true },
    lastName:   { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    phone:      { type: String, required: true },
    department: { type: String, required: true },
    position:   { type: String, required: true },
    address:    { type: String, required: true },
    status:     { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
)

export default mongoose.model<IEmployee>('Employee', EmployeeSchema)
