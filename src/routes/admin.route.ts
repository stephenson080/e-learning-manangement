import {Router} from 'express'

import { isAdmin } from '../middlewares/is-auth'

import {getIndexPage} from '../controllers/admin.controller'

const adminRouter = Router()

adminRouter.get('/', isAdmin, getIndexPage)


export default adminRouter