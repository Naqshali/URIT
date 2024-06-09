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
    },
    saveEducation: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/user-education",data);
        console.log("res",res)
    },
    saveWorkExperiance: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/work-experiences",data);
        console.log("res",res)
    },
    saveAwards: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/awards",data);
        console.log("res",res)
    },
    changePassword: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/awards",data);
        console.log("res",res)
    },
    deactivateAccount: async (data)=>{
        const res = await axiosInstance.post("/api/v1/users/awards",data);
        console.log("res",res)
    }
}))

export default profileStore