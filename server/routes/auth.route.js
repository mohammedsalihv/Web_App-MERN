import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'
import User from '../models/user.model.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

