import {Router} from 'express'

import { getCourseMaterialsPage, getUserIndexPage } from '../controllers/user.controller'

import { isUser } from '../middlewares/is-auth'

const userRouter = Router()

userRouter.get('/', isUser, getUserIndexPage)
userRouter.get('/get-course-materials', isUser, getCourseMaterialsPage)

export default userRouter