import HTTP_CLIENT, { handlingErrors } from "./client";

export const signoutUsers = () =>
    new Promise((resolve, reject) => {
        HTTP_CLIENT.get("signout")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                const message = handlingErrors(error);
                reject(message);
            });
    });
export const fetchStock = async () => {
       try{
              const response = await HTTP_CLIENT.get("stock");
              return response;
       }
         catch(error){
                const message = handlingErrors(error);
                throw message;
             }
}


export const fetchSales = async () => {
    try {
        const response = await HTTP_CLIENT.get("sales");
        return response;
    }
    catch (error) {
        const message = handlingErrors(error);
        throw message;
    }
}
export const fetchCommercials = async () => {
    try {
        const response = await HTTP_CLIENT.get("commercial");
        return response;
    }
    catch (error) {
        const message = handlingErrors(error);
        throw message;
    }
}
export const fetchMotors = async () => {
    try {
        const response = await HTTP_CLIENT.get("moto");
        return response;
    }
    catch (error) {
        const message = handlingErrors(error);
        throw message;
    }
}

