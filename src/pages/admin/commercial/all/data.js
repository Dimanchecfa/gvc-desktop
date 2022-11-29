const tableColums = (onClickBtn) => [
    {
        name: "PSEUDO",
        selector: (row) => row?.pseudo,
        sortable: true,
    },
    {
        name: "NOM",
        selector: (row) => row?.nom,
        sortable: true,
    },
    {
        name: "PRENOM",
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
