import { create } from "zustand";
import axiosInstance from "@/axios/axios.config";
import { transformMetaData } from "@/utils/global";

const globalStore = create((set) => ({
  meta: {
    skills: [],
    countries: [],
    services: [],
    languages: [],
    degrees: [],
  },
  getMetaData: async () => {
    try {
      const skills = await axiosInstance.get("/api/v1/commons/skills");
      const countries = await axiosInstance.get("/api/v1/commons/countries");
      const services = await axiosInstance.get("/api/v1/commons/services");
      const languages = await axiosInstance.get("/api/v1/commons/languages");
      const degrees = await axiosInstance.get("/api/v1/commons/degrees");

      const allMeta = {};

      if (skills.data) {
        allMeta.skills = transformMetaData(skills.data, "name");
      }
      if (countries.data) {
        allMeta.countries = transformMetaData(countries.data, "countryCode");
      }
      if (services.data) {
        allMeta.services = transformMetaData(services.data, "serviceName");
      }
      if (languages.data) {
        allMeta.languages = transformMetaData(languages.data, "languageName");
      }
      if (degrees.data) {
        allMeta.degrees = transformMetaData(degrees.data, "name");
      }

      set({ meta: allMeta });
    } catch (error) {
      return null;
    }
  },
}));

export default globalStore;
