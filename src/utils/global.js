import { decode } from "jwt-js-decode";
import moment from "moment-timezone";

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

  // Convert the date from UTC to the user's local timezone and format it
  return moment.utc(date).tz(moment.tz.guess()).format("D MMMM YYYY");
};

export const dateInStringFormat = (date) => {
  if (!date) return;

  // Convert the date from UTC to the user's local timezone and return the relative time
  return moment.utc(date).tz(moment.tz.guess()).fromNow();
};

export const chatMsgDateFormat = (date) => {
  if (!date) return;

  // Convert UTC to local timezone and format as "MMM DD"
  return moment.utc(date).tz(moment.tz.guess()).format("MMM DD");
};

// Chat message item date format: "HH:mm | MMMM D"
export const chatMsgItemDateFormat = (date) => {
  if (!date) return;

  // Convert UTC to local timezone and format as "HH:mm | MMMM D"
  return moment.utc(date).tz(moment.tz.guess()).format("HH:mm | MMMM D");
};

// Year only format: "YYYY"
export const dateInYearFormatOnly = (date) => {
  if (!date) return;

  // Convert UTC to local timezone and format as "YYYY"
  return moment.utc(date).tz(moment.tz.guess()).format("YYYY");
};

export const transformMetaData = (array, valueKey) => {
  return array.map((item) => ({
    key: item.id.toString(),
    value: item.id.toString(),
    label: item[valueKey],
  }));
};
