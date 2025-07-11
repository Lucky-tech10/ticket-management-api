const router = require("express").Router();
import { register, login, logout } from "../controllers/authController";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
