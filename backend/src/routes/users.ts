import { Router } from "express";
import { getUser, updateUser, getAllUsers, addUser, addMockUsers } from "../controllers/users";

import { validationUpdateUser, validationAddUser } from "../middlewares/validators";

const router = Router();

router.get("/users/me", getUser);
router.get("/users", getAllUsers)
router.post("/user", validationAddUser, addUser)
router.post("/mock/users", addMockUsers)
router.patch("/users/me", validationUpdateUser, updateUser);

export default router;
