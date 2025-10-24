import { Router } from "express"
import { userLogin, userLogout, userRegister } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/register', userRegister)
authRouter.post('/login', userLogin)
authRouter.post('/logout', userLogout)

export default authRouter;