import { Router } from "express";
import {protectRoute} from '../middleware/auth.js'
import { uploadResume ,searchResume} from "../controllers/resume.controller.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"backend/uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})
const upload = multer({ storage });
const router = Router(); 
router.post('/resume/upload',protectRoute, upload.single('resume'),uploadResume); 
router.get('/resume/search',protectRoute,searchResume); 
export default router; 