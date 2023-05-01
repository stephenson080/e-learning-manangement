import {Router} from 'express'

import { isAdmin } from '../middlewares/is-auth'

import {getIndexPage, addStaff, getDepartmentPage, addDepartment, getCoursesPage, addCourse, getCoursesWithCriteria, assignUserCourse, addCourseMaterial} from '../controllers/admin.controller'

const adminRouter = Router()

adminRouter.get('/', isAdmin, getIndexPage)
adminRouter.get('/departments', isAdmin, getDepartmentPage)
adminRouter.post('/add-department', isAdmin, addDepartment)
adminRouter.post('/add-staff', isAdmin, addStaff)
adminRouter.post('/add-course', isAdmin, addCourse)
adminRouter.get('/get-courses', isAdmin, getCoursesWithCriteria)
adminRouter.get('/courses', isAdmin, getCoursesPage)
adminRouter.post('/assign-staff', isAdmin, assignUserCourse)
adminRouter.post('/add-material', isAdmin, addCourseMaterial)


export default adminRouter