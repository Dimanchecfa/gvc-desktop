
const tableColums = (onClickBtn) => [
    {
        name: "NOM DE LA MARQUE",
        selector: (row) => row?.nom,
        sortable: true,
    },
    {
        name: "MODELE",
        selector: (row) => row?.nom,
        sortable: true,
    },
    {
        name: "ENTETE",
        selector: (row) => row?.nom,
        sortable: true,
    },
    {
        name: "NUMERO DE TELEPHONE",
        selector: (row) => row?.numero,
        sortable: true,
    },
    
    
];

export default tableColums;