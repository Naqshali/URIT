import { decode } from "jwt-js-decode";
import moment from "moment";
import globalStore from "@/store/global";

export const decodeJWT = (token) => {
  try {
    token = token.split(" ")[1];
    const decodedToken = decode(token);
    const type =
      decodedToken.payload.resource_access["urit-service-provider"] ||
      decodedToken.payload.resource_access["urit-client"];
    const userData = {
      name: decodedToken.payload.name,
      userType: type.roles[0],
    };
    return userData;
  } catch (error) {
    return null;
  }
};

export const queryString = (obj) => {
  let queryString = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString.length > 0) {
        queryString += "&";
      }
      queryString += `${key}=${obj[key]}`;
    }
  }
  return queryString;
};

export const transformData = (data) => {
  const transformedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      transformedData[key] = data[key] === null ? "" : data[key];
    }
  }
  return transformedData;
};

export const dateFormat = (date) => {
  if (!date) return;
  return moment(date).format("D MMMM YYYY");
};

export const dateInStringFormat = (date) => {
  if (!date) return;
  return moment(date).fromNow();
};

export const transformMetaData = (array, valueKey) => {
  return array.map((item) => ({
    key: item.id.toString(),
    value: item.id.toString(),
    label: item[valueKey],
  }));
};

const meta = (data) => {
  const { meta } = globalStore();
  return meta;
};

export const getService = (id) => {
  const itemFound = meta().services.find((service) => {
    return service.value === id;
  });

  if (itemFound) {
    return itemFound.label;
  }
};

export const getSkill = (id) => {
  const itemFound = meta().skills.find((skill) => {
    return skill.value === id;
  });

  if (itemFound) {
    return itemFound.label;
  }
};

export const getCountry = (id) => {
  const itemFound = meta().countries.find((country) => {
    return country.value === id;
  });

  if (itemFound) {
    return itemFound.label;
  }
};

export const getDegree = (id) => {
  const itemFound = meta().degrees.find((degree) => {
    return degree.value === id;
  });

  if (itemFound) {
    return itemFound.label;
  }
};

export const getLanguage = (id) => {
  const itemFound = meta().languages.find((language) => {
    return language.value === id;
  });

  if (itemFound) {
    return itemFound.label;
  }
};
