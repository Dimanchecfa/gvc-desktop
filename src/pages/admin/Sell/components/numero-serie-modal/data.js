
const tableColums = (onClickBtn) => [
    {
        name: "NUMERO_SERIE",
        selector: (row) => row?.numero_serie,
        sortable: true,
    },
    {
        name: "MARQUE",
        selector: (row) => row?.marque,
        sortable: true,
    },
    {
        name: "MODELE",
        selector: (row) => row?.modele,
        sortable: true,
    },
    {
        name: "COULEUR",
        selector: (row) => row?.couleur,
        sortable: true,
    },
];
export default tableColums;