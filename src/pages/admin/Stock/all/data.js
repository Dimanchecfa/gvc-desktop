import moment from "moment";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn) => [
    {
        name: "NUMERO DE LOT",
        selector: (row) => row?.numero,
        sortable: true,
    },
    {
        name: "NOM DU FOURNISSEUR",
        selector: (row) => row?.nom_fournisseur,
        sortable: true,
    },
    {
        name: "NUMERO DU FOURNISSEUR",
        selector: (row) => row?.numero_fournisseur,

        sortable: true,
    },
    {
        name: "NOMBRE D'ENGINS",
        selector: (row) => row?.nombre_moto,

        sortable: true,
    },
    {
        name: "DATA D'ARRIVEE",
        selector: (row) => moment(row?.created_at).format("DD/MM/YYYY"),
        sortable: true,
    },
];

export default tableColums;