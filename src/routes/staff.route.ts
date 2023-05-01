import {Router} from 'express'

import { getCourseMaterialsPage, getStaffIndexPage, addCourseMaterial } from '../controllers/staff.controller'

import { isStaff } from '../middlewares/is-auth'

const staffRouter = Router()

staffRouter.get('/', isStaff, getStaffIndexPage)
staffRouter.get('/get-course-materials', isStaff, getCourseMaterialsPage)
staffRouter.post('/add-material', isStaff, addCourseMaterial)

export default staffRouter