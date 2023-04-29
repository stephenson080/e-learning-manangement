import {Router} from 'express'

import {getLoginPage, getSignUpPage, signUpUser, loginUser} from '../controllers/auth.controller'

const authRouter = Router()

authRouter.get('/', getLoginPage)
authRouter.get('/login', getLoginPage)
authRouter.get('/signup', getSignUpPage)
authRouter.post('/signup', signUpUser)
authRouter.post('/login', loginUser)

export default authRouter