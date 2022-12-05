// axios instance and handler error

import axios from "axios";
import { useLocation } from "react-router-dom";
import { basicNotif } from "../components/notification";
import HANDLER_STORAGE from "../data";
import {
    API_URL,
    TOKEN_TYPE,
    USER_SESSION,
} from "../utilities/constant/app.constant";

const HTTP_CLIENT = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

HTTP_CLIENT.interceptors.request.use(
    (config) => {
        const handlerData = HANDLER_STORAGE.GET(USER_SESSION, "object");
        const user = handlerData?.data ?? null;
        if (user?.token) {
            config.headers.authorization = `${TOKEN_TYPE} ${user?.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

HTTP_CLIENT.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const location = useLocation();
        const { response } = error;
        if (response && response.status === 401) {
            HANDLER_STORAGE.REMOVE(USER_SESSION);
            basicNotif("Session expirée, Veuillez vous reconnecter.");
            location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export default HTTP_CLIENT;
