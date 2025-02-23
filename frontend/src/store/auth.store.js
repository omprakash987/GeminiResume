
import {create} from 'zustand'; 
import {axiosInstance} from '../lib/axios.js'

export const authStore = create((set)=>({
    isSignup:false,
    isLogin:false,
    authUser:null , 
    checkingAuth:true,

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get(`/auth/me`); 
            console.log("authuser data : ", res.data)
            set({authUser:res.data})
            
        } catch (error) {
            console.log("error from checkauth : ", error); 
            set({authUser:null}); 
            set({checkingAuth:false})
        }
    },

    signup:async(name,email,password)=>{
        try {
            set({isSignup:true}); 
            const res = await axiosInstance.post("/auth/signup",{
                name,email,password
            }); 
            console.log("signUp user : ", res.data); 
            set({authUser:res.data}); 

        } catch (error) {
            console.log("error : " , error); 
            

        }finally{
            set({isSignup:false});
        }
    },
    login:async(email,password)=>{
        try {
            set({isLogin:true}); 
        const res = await axiosInstance.post(`/auth/login`,{
            email,password
        })
        console.log("login data : ", res.data); 
        set({authUser:res.data}); 
            
        } catch (error) {
            console.log("error : ", error); 
            set({authUser:null})
        }finally{
            set({isLogin:false});
        }
    }

}))