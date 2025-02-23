import { Router } from "express";
import {signup,login,logout,getProfile} from '../controllers/auth.controller.js'
import { protectRoute } from "../middleware/auth.js";

const router =  Router();

router.post("/auth/signup",signup);
router.post("/auth/login",login);
router.post("/auth/logout",logout);
router.get("/auth/me",protectRoute,getProfile); 


export default router; 
