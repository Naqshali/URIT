import { decode } from 'jwt-js-decode';

export const decodeJWT = (token)=>{
    try {
        token = token.split(" ")[1]
        const decodedToken = decode(token);
        const userData = {
            name:decodedToken.payload.name,
            userType:decodedToken.payload.resource_access["urit-service-provider"].roles[0]
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
};