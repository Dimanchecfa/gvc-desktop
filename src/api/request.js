import { errorNotif } from "../components/notification";
import HTTP_CLIENT from "./client";

export const fetchStock = () => {
    try {
        const response = HTTP_CLIENT.get("/stock");
        return response;
    } catch (error) {
        return error;
    }
};

export const signoutUsers = () => {
    try {
        const response = HTTP_CLIENT.post("/signout");
        return response;
    } catch (error) {
        return error;
    }
};

export const AddMotorData = (id, data) => {
    try {
        const response = HTTP_CLIENT.post(`motors/add/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const updateMotorData = async (uuid, data) => {
    try {
        const response = HTTP_CLIENT.put(`moto/${uuid}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchSales = () => {
    try {
        const response = HTTP_CLIENT.get("/sales");
        return response;
    } catch (error) {
        return error;
    }
};

export const addSales = (data) => {
    try {
        const response = HTTP_CLIENT.post("/sales", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchRedevability = () => {
    try {
        const response = HTTP_CLIENT.get("/inprogress/sales");
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchCommercials = () => {
    try {
        const response = HTTP_CLIENT.get("/commercial");
        return response;
    } catch (error) {
        errorNotif("Avertissement", error);
        return error;
    }
};

export const fetchMotorsStocked = () => {
    try {
        const response = HTTP_CLIENT.get("/motors/stocked");
        return response;
    } catch (error) {
        return error;
    }
};

export const AddStockData = (data) => {
    try {
        const response = HTTP_CLIENT.post("/stock", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const UpdateStockData = (id, data) => {
    try {
        const response = HTTP_CLIENT.put(`/stock/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const DeleteMotors = (id) => {
    try {
        const response = HTTP_CLIENT.delete(`moto/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const getMotorsByStockId = (id) => {
    try {
        const response = HTTP_CLIENT.get(`motors/stock/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchMotorsCertified = () => {
    try {
        const response = HTTP_CLIENT.get("/motors/certified");
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchMotorsUncertified = () => {
    try {
        const response = HTTP_CLIENT.get("/motors/uncertified");
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchLots = () => {
    try {
        const response = HTTP_CLIENT.get("/lot");
        return response;
    } catch (error) {
        return error;
    }
};
export const fetchFinishedSalesAndNotRegisteredAndMotorsCertified = () => {
    try {
        const response = HTTP_CLIENT.get("/finished/sales");
        return response;
    } catch (error) {
        return error;
    }
};

export const addRegistration = (data, id) => {
    try {
        const response = HTTP_CLIENT.post(`registered/add/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const certifiedMotors = (data) => {
    try {
        const response = HTTP_CLIENT.post("/certified/motors", data);
        return response;
    } catch (error) {
        return error;
    }
};
export const generateLotPdf = (id) => {
    try {
        const response = HTTP_CLIENT.get(`generate/lot/pdf/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchRegistrationByLot = (id) => {
    try {
        const response = HTTP_CLIENT.get(`registration/lot/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchFinishedRegistration = () => {
    try {
        const response = HTTP_CLIENT.get("registered/finished");
        return response;
    } catch (error) {
        return error;
    }
};

export const registeredWithdraw = (id, data) => {
    try {
        const response = HTTP_CLIENT.post(`registered/withdraw/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchRegistredRegistration = () => {
    try {
        const response = HTTP_CLIENT.get("registered/registration");
        return response;
    } catch (error) {
        return error;
    }
};

export const addLot = (data) => {
    try {
        const response = HTTP_CLIENT.post("lot", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const editLot = (uuid, data) => {
    try {
        const response = HTTP_CLIENT.put(`lot/${uuid}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export const addCommercial = (data) => {
    try {
        const response = HTTP_CLIENT.post("commercial", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const updatePayment = (id, data) => {
    try {
        const response = HTTP_CLIENT.post(`update/payment/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
};
