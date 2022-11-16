// AppContext
import React, { createContext, useState } from "react";
import HANDLER_STORAGE from "../../data";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [mode, setMode] = useState('light');
    const [sidenavToggled, setSidenavToggled] = useState(false)

    const value = {
        mode,
        sidenavToggled,
        setMode,
        setSidenavToggled,
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}

export { AppProvider, AppContext };
