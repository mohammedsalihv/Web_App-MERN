import User from "../models/user.model.js";
import bcryptsjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "../utils/error.js";
dotenv.config();



export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log('user sign up data ' , req.body);
  
  const hashedPassword = bcryptsjs.hashSync(password, 10);
  const newUser = new User({ username, email, password : hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    next(error);
    console.log(error);
    
  }
};


export const signin =async (req,res,next)=>{
  const { email,password} = req.body;
  try{
      const validUser=await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'User not found')) 
      const validPassword = bcryptsjs.compareSync(password,validUser.password);
      if(!validPassword) return next(errorHandler(401,'wrong credentials'))
      
      const token = jwt.sign({id:validUser._id, isAdmin:validUser.isAdmin},process.env.JWT_SECRET)
      const {password:hashedPassword,...rest} = validUser._doc; 
      const expiryDate= new Date(Date.now()+3600000);
      res.cookie('access_token',token,{httpOnly: true,expires: expiryDate}).status(200).json(rest)
      dispatch(setCurrentUser(data)); // Assuming 'data' contains user info
    }catch(error){
      next(error)
  }
  
  
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptsjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        profilePicture: req.body.photo,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("signout successfull");
};
