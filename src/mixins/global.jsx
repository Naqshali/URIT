"use client";

import globalStore from "@/store/global";
import { localMetaData } from "@/utils/localMetaData";

export default function globalMixin() {
  const getAllListSize = 10;
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

  const getFreelancerType = (id) => {
    const itemFound = localMetaData.freeLancerType.find((level) => {
      return level.value === id;
    });

    if (itemFound) {
      return itemFound.label;
    }
  };

  const getPriceType = (id) => {
    const itemFound = localMetaData.priceTypes.find((level) => {
      return level.value === id;
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

  const getLevel = (id) => {
    const itemFound = localMetaData.levels.find((level) => {
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

  const getFirstCharacterCapital = (str) => {
    if (!str) {
      return;
    }

    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getfileName = (file) => {
    return file.split(".")[0];
  };

  const getfileType = (file) => {
    return file.split(".")[1]?.toUpperCase();
  };

  return {
    getService,
    getSkill,
    getCountry,
    getDegree,
    getFreelancerType,
    getPriceType,
    getLanguage,
    getLanguageLevel,
    getLevel,
    getGender,
    getAllListSize,
    getFirstCharacterCapital,
    getfileName,
    getfileType,
  };
}
