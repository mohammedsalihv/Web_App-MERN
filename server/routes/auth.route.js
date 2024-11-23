import express from 'express'
import { signin, signup ,  google , signout} from '../controllers/auth.controller.js'


const user_router = express.Router()

user_router.post('/signup', signup)
user_router.post('/signin', signin)
user_router.post('/google' , google)
user_router.get('/signout', signout)

export default user_router;