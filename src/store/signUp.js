import {create} from "zustand";
import axiosInstance from "@/axios/axios.config";

const signUpStore = create((set)=>({
    signUpUser:null,
    loggedInUser:null,
    signUp: async (data) => {
        const res = await axiosInstance.post("/api/v1/signup",data);
        set({signUpUser:res.data})
    },
    login:async()=>{
        const res = await axiosInstance.get('/api/v1/login')
        set({loggedInUser:res.data})
    }
}))

export default signUpStore