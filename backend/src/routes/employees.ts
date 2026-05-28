import { Router } from 'express'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController'
import requireAuth from '../middleware/requireAuth'

const router = Router()

// All employee routes require login
router.use(requireAuth)

router.get('/',        getEmployees)
router.post('/',       createEmployee)
router.put('/:id',     updateEmployee)
router.delete('/:id',  deleteEmployee)

export default router
