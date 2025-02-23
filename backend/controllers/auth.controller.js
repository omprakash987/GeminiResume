import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'


const signToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'7d',
    })

    return token; 

}
export const signup = async(req , res)=>{
    try {
        const {name,email,password} = req.body; 
        if(!name||!email||!password){
            return res.status(404).json({
                message:"all filed are required"
            })
        }; 
        const alreadyExist = await User.findOne({
            email
        }); 
        if(alreadyExist){
            return res.status(401).json({
                message:"user already exist",
                secure:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password,10); 

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
        }); 
       
        const token = signToken(newUser._id); 

        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production"
        })
        res.status(200).json({
            success:true,
            user:newUser,
        })

    } catch (error) {
        console.log("error from signup", error); 
        console.log("error from signup controller", error); 
        res.status(500).json({
            message:"internal server error "
        })
    }
}
export const login = async(req , res)=>{
   try {
    const {email,password} = req.body; 
    if(!email || !password){
        return res.status(404).json({
            message:"email and passwrod required"
        })
    }
    
    const user = await User.findOne({email}).select("+password"); 
    if(!user){
        return res.status(401).json({
            success:false,
            message:"invalid email or password"
        })
    }

    const token = signToken(user._id); 

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production",
    })

    res.status(200).json({
        message:"login successfull",
        success:true,
        user
    })
    
   } catch (error) {
    console.log("login error  : ", error); 
    res.status(200).json({
        message:"internal server error",
        success:false,
    })
   }
}
export const logout = async(req , res)=>{
res.clearCookie('jwt'); 
res.status(200).jsonn({
    success:true,
    message:"logout successfull"
})
}
export const getProfile = async(req , res)=>{
  try {
    res.status(200).json(req.user); 
    
  } catch (error) {
    console.log("error from getprofile : ", error); 
    res.status(500).json({
        message:"internal server error"
    })
  }
}