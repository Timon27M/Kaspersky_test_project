import { Router } from "express";
import { getUser, updateUser, getAllUsers, addUser, addMockUsers, getManagementUsers, getAccountingUsers, getDevelopmentUsers, getAnalyticsUsers, getTesterUsers, getUnknownUsers } from "../controllers/users";

import { validationUpdateUser, validationAddUser } from "../middlewares/validators";

const router = Router();

router.get("/user/:userId", getUser);
router.get("/users", getAllUsers)
router.get("/users/managment", getManagementUsers)
router.get("/users/accounting", getAccountingUsers)
router.get("/users/development", getDevelopmentUsers)
router.get("/users/analytics", getAnalyticsUsers)
router.get("/users/tester", getTesterUsers)
router.get("/users/unknown", getUnknownUsers)
router.post("/user", validationAddUser, addUser)
router.post("/mock/users", addMockUsers)
router.patch("/user/:userId", validationUpdateUser, updateUser);

export default router;
