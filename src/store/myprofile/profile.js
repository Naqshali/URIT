import {create} from "zustand";
import axiosInstance from "@/axios/axios.config";

const profileStore = create(()=>({
    saveProfileDetails: async (data) => {
        const res = await axiosInstance.post("/api/v1/users",data);
        console.log("res",res)
    },
    saveSkills: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/skills",data);
        console.log("res",res)
    }
}))

export default profileStore