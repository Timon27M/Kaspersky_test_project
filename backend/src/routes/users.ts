import { Router } from "express";
import { getUser, updateUser, getAllUsers, addUser, addMockUsers, deleteUser } from "../controllers/users";

import { validationUpdateUser, validationAddUser } from "../middlewares/validators";

const router = Router();

router.get("/user/:userId", getUser);
router.get("/users", getAllUsers)
router.post("/user", validationAddUser, addUser)
router.post("/mock/users", addMockUsers)
router.patch("/user/:userId", validationUpdateUser, updateUser);
router.delete("/user/:userId", deleteUser)

export default router;
