
export const roleToShow = (role) => {
    switch (role) {
        case "editor":
            return "Editeur";
        case "accounting":
            return "comptable";
        case "observer":
            return "consultant";
        case "admin":
            return "administrateur";
        default:
            return "utilisateur";
    }
};



export const getNumberPage = (tables = [], perPage = 10) => {
    const numberPage = tables.length / perPage;
    return Number(Math.ceil(numberPage).toFixed(0));
};

export const quillModules = {
    toolbar: {
        container: "#toolbar",
    },
};
