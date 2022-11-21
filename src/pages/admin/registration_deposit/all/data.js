import moment from "moment";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

const tableColums = (onClickBtn) => [
    {
        name: "NUMERO DU LOT",
        selector: (row) => row?.numero_lot,
        sortable: true,
    },
    {
        name: "NOM DU DEPOSANT",
        selector: (row) => row?.nom_depositeur,
        sortable: true,
    },
    {
        name: "NUMERO DU DEPOSANT",
        selector: (row) => row?.numero_depositeur,

        sortable: true,
    },
    {
        name: "NOMBRE DE DEPOT",
        selector: (row) => row?.nombre_registrations,
        sortable: true,
    },
    {
        name: "DATE DE DEPOT",
        selector: (row) => moment(row?.date_depot).format("DD/MM/YYYY"),
        sortable: true,
    },
];

export default tableColums;