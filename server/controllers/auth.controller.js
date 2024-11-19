import User from '../models/user.model.js'
import bcrypts from 'bcryptjs'

export const signup = async (req,res) =>{
     const {username , email , password} = req.body;

     const hashedPassword = bcrypts.hashSync(password , 10)
     const newUser = new User({username , email , hashedPassword})
     try {
        await newUser.save()
        res.status(201).json('user craeted success')
     } catch (error) {
        console.log(error)
     }
}