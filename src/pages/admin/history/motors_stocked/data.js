import moment from "moment";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn) => [
  {
    name: "NUMERO DE SERIE",
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
  {
    name: "NUMERO DU STOCK",
    selector: (row) => row?.stock_id,
    sortable: true,
  },
];

export default tableColums;
