import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { transformData } from "@/utils/global";

const profileStore = create((set) => ({
  profileDetails: null,
  education: [],
  workExperiance: [],
  allSkills: [],
  awards: [],

  getProfileDetails: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/user-profile");
      if (res.data) {
        localStorage.setItem("user_profile_id", res.data.id);
        set({ profileDetails: transformData(res.data) });
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  },

  updateProfileDetails: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users", data);
      return res.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return null;
    }
  },

  updateProfilPhoto: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users/profile-photo", data);
      return res.data;
    } catch (error) {
      console.error("Error updating profile photo:", error);
      return null;
    }
  },

  getSkills: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/users/skills");
      if (res.data) {
        set({ allSkills: res.data || [] });
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      set({ allSkills: [] });
    }
  },

  updateSkills: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users/skills", data);
      return res.data;
    } catch (error) {
      console.error("Error updating skills:", error);
      return null;
    }
  },

  getEducation: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/users/education");
      set({ education: res?.data || [] });
    } catch (error) {
      console.error("Error fetching education:", error);
      set({ education: [] });
    }
  },

  saveEducation: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/users/education", data);
      return res.data;
    } catch (error) {
      console.error("Error saving education:", error);
      return null;
    }
  },

  updateEducation: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users/education", data);
      return res.data;
    } catch (error) {
      console.error("Error updating education:", error);
      return null;
    }
  },

  deleteEducation: async (id) => {
    try {
      await axiosInstance.delete("/api/v1/users/education/" + id);
      return { description: "Education deleted successfully" };
    } catch (error) {
      console.error("Error deleting education:", error);
      return null;
    }
  },

  getWorkExperiance: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/users/work-experiences");
      set({ workExperiance: res?.data || [] });
    } catch (error) {
      console.error("Error fetching work experience:", error);
      set({ workExperiance: [] });
    }
  },

  saveWorkExperiance: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/users/work-experiences", data);
      return res.data;
    } catch (error) {
      console.error("Error saving work experience:", error);
      return null;
    }
  },

  updateWorkExperiance: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users/work-experiences", data);
      return res.data;
    } catch (error) {
      console.error("Error updating work experience:", error);
      return null;
    }
  },

  deleteWorkExperiance: async (id) => {
    try {
      await axiosInstance.delete("/api/v1/users/work-experiences/" + id);
      return { description: "Work experience deleted successfully" };
    } catch (error) {
      console.error("Error deleting work experience:", error);
      return null;
    }
  },

  getAwards: async () => {
    try {
      const res = await axiosInstance.get("/api/v1/users/awards");
      set({ awards: res?.data || [] });
    } catch (error) {
      console.error("Error fetching awards:", error);
      set({ awards: [] });
    }
  },

  saveAwards: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/users/awards", data);
      return res.data;
    } catch (error) {
      console.error("Error saving award:", error);
      return null;
    }
  },

  updateAwards: async (data) => {
    try {
      const res = await axiosInstance.put("/api/v1/users/awards", data);
      return res.data;
    } catch (error) {
      console.error("Error updating award:", error);
      return null;
    }
  },

  deleteAwards: async (id) => {
    try {
      await axiosInstance.delete("/api/v1/users/awards/" + id);
      return { description: "Award deleted successfully" };
    } catch (error) {
      console.error("Error deleting award:", error);
      return null;
    }
  },

  changePassword: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/users/change-password", data);
      return res.data;
    } catch (error) {
      console.error("Error changing password:", error);
      return null;
    }
  },

  deactivateAccount: async (data) => {
    try {
      const res = await axiosInstance.post("/api/v1/users/deactivate", data);
      return res.data;
    } catch (error) {
      console.error("Error deactivating account:", error);
      return null;
    }
  },
}));

export default profileStore;