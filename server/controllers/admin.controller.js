import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};




export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};




export const addUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(errorHandler(501, "Internal Server Error"));
  }
};



export const editUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};



export const deleteUser = async (req, res, next) => {
  try {
    const userDelete = await User.findByIdAndDelete({ _id: req.params.id });
    if (!userDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json("user has been removed");
  } catch (error) {
    next(error);
  }
};