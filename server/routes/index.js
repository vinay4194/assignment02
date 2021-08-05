import express from "express";
const router = express.Router();
import loginController from "../controllers/loginController";
import addUserController from "../controllers/addUserController";
import getUserController from "../controllers/getUserController";
import auth from "../middlewares/auth";

router.post("/login", loginController.login);
router.post("/adduser", auth, addUserController.add);
router.get("/getusers", getUserController.getUsers);
router.post("/deleteuser/:id", auth, getUserController.deleteUser);

export default router;
