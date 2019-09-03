import { Router } from 'express'

import auth from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.put('/users', auth, UserController.update)

routes.post('/sessions', SessionController.store)

export default routes
