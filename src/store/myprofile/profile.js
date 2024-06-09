import {create} from "zustand";
import axiosInstance from "@/axios/axios.config";
import {transformData} from "@/utils/global"

const profileStore = create((set)=>({
    
    profileDetails:null,
    education:null,
    workExperiance:null,
    skills:null,
    awards:null,

    getProfileDetails:async () =>{
        const res = await axiosInstance.get("/api/v1/user-profile");
        if(res.data){
            console.log("res.data", res.data.tagline === null)
            set({profileDetails: transformData(res.data)})
        }
    },
    updateProfileDetails: async (data) => {
        try { 
            const res = await axiosInstance.put("/api/v1/users",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    getSkills:async () =>{
        const res = await axiosInstance.get("/api/v1/users/skills");
        if(res.data){
            set({skills:{...res.data}})
        }
    },
    updateSkills: async (data)=>{
        try { 
            const res = await axiosInstance.put("/api/v1/users/skills",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    getEducation:async () =>{
        const res = await axiosInstance.get("/api/v1/users/education");
        if(res.data){
            set({education:res.data})
        }
    },
    saveEducation: async (data)=>{
        try { 
            const res = await axiosInstance.post("/api/v1/users/education",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    updateEducation: async (data)=>{
        try { 
            const res = await axiosInstance.put("/api/v1/users/education",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    getWorkExperiance:async () =>{
        const res = await axiosInstance.get("/api/v1/users/work-experiences");
       if(res.data){
           set({workExperiance:res.data})
       }
    },
    saveWorkExperiance: async (data)=>{
        try { 
            const res = await axiosInstance.post("/api/v1/users/work-experiences",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    updateWorkExperiance: async (data)=>{
        try { 
            const res = await axiosInstance.put("/api/v1/users/work-experiences",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    getAwards:async () =>{
        const res = await axiosInstance.get("/api/v1/users/awards");
        if(res.data){
            set({awards:res.data})
        }
    },
    saveAwards: async (data)=>{
        try { 
            const res = await axiosInstance.post("/api/v1/users/awards",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    updateAwards: async (data)=>{
        try { 
            const res = await axiosInstance.put("/api/v1/users/awards",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    changePassword: async (data)=>{
        try { 
            const res = await axiosInstance.post("/api/v1/users/awards",data);
            return res.data
        } catch (error) {
            return null
        }
    },
    deactivateAccount: async (data)=>{
        try { 
            const res = await axiosInstance.post("/api/v1/users/awards",data);
            return res.data
        } catch (error) {
            return null
        }
    }
}))

export default profileStore