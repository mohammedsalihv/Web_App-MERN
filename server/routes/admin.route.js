import express from "express";
import {
  users,
  getUserById,
  addUser,
  deleteUser,
  editUser,
} from "../controllers/admin.controller.js";
const admin_router = express.Router();


admin_router.get("/users-data", users);
admin_router.get('/user/:id', getUserById)
admin_router.post("/add-user", addUser);
admin_router.put("/edit-user/:id", editUser);
admin_router.delete("/delete-user/:id", deleteUser);

export default admin_router;
