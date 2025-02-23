import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from 'react-hot-toast'




export const useResumeStore = create((set)=>({
    loading:false,
    isSubmittingResume:false,
    isSearchingResume:false,
    applicant:null,


    uploadResume:async(file)=>{
        try {
            set({isSubmittingResume:true});
            const formData = new FormData();
            formData.append("resume", file); 
            const res  = await axiosInstance.post(`/resume/upload`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
            }); 
            set({applicant:res.data}); 
            toast.success("resume submited")
            
        } catch (error) {
            console.log("error from upload resume store : ", error); 
        }finally{
            set({isSubmittingResume:false}); 
        }

    },
    SearchResume:async(name)=>{
        try {
            set({isSearchingResume:true}); 
            const res = await axiosInstance.get(`/resume/search`,{
               params: {name}
            }); 
            set({applicant:res.data}); 
            console.log("data of search resume : ", res.data.searchData); 
            toast.success("resume got successfully")
            return res.data.searchData;
            
        } catch (error) {
            set({applicant:null}); 
            set({isSearchingResume:false}); 
            toast.error("something went wrong")
        }finally{
            set({isSearchingResume:false}); 
        }

    }
}))