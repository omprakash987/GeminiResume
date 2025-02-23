import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';


export const protectRoute = async(req , res , next)=>{
    try {
        const token = req.cookies.jwt; 
        if(!token){
            return res.status(404).json({
                message:"not authorized"
            })
        }; 
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 

        if(!decoded){
            return res.status(401).json({
                message:"not authorized"
            })
        }

        const currentUser = await User.findById(decoded.id).select("-password"); 
        if(!currentUser){
            return res.status(400).json({
                message:"user not found in middlware "
            })
        }

        req.user = currentUser; 

        next(); 
        
    } catch (error) {
        console.log("error from protect route", error); 
    return res.status(401).json({
        message:"internal server error",
    })
    }
}

