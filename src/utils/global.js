import { decode } from 'jwt-js-decode';
import moment from "moment";

export const decodeJWT = (token)=>{
    try {
        token = token.split(" ")[1]
        const decodedToken = decode(token);
        const type = decodedToken.payload.resource_access["urit-service-provider"] || decodedToken.payload.resource_access["urit-client"]
        const userData = {
            name:decodedToken.payload.name,
            userType:type.roles[0]
        }
        return userData
    } catch (error) {
        return null
    }

}

export const transformData = (data) => {
    const transformedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
        transformedData[key] = data[key] === null ? "" : data[key];
        }
    }
    return transformedData;
}

export const dateFormat = (date) =>{
    if(!date) return
    return moment(date).format('D MMMM YYYY');
}

export const transformMetaData = (array, valueKey) => {
    return array.map(item => ({
        option: item.id,
        value: item[valueKey]
    }));
};