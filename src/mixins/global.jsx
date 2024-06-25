"use client";

import globalStore from "@/store/global";
import { localMetaData } from "@/utils/localMetaData";

export default function globalMixin() {
  const allListSize = 10;
  const { meta } = globalStore();

  const getService = (id) => {
    const itemFound = meta.services.find((service) => {
      return service.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getSkill = (id) => {
    const itemFound = meta.skills.find((skill) => {
      return skill.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getCountry = (id) => {
    const itemFound = meta.countries.find((country) => {
      return country.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getDegree = (id) => {
    const itemFound = meta.degrees.find((degree) => {
      return degree.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getLanguage = (id) => {
    const itemFound = meta.languages.find((language) => {
      return language.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getLanguageLevel = (id) => {
    const itemFound = localMetaData.languageLevels.find((level) => {
      return level.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getGender = (id) => {
    const itemFound = localMetaData.genders.find((gender) => {
      return gender.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  return {
    getService,
    getSkill,
    getCountry,
    getDegree,
    getLanguage,
    getLanguageLevel,
    getGender,
    allListSize,
  };
}
