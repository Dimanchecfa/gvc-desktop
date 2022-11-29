import moment from "moment";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn, handleWithdraw) => [
  {
    name: "NOM DU CLIENT",
    selector: (row) => row?.sales?.nom_client,
    sortable: true,
  },
  {
    name: "NUMERO DU CLIENT",
    selector: (row) => row?.sales?.numero_client,

    sortable: true,
  },
  {
    name: "NUMERO DE SERIE",
    selector: (row) => row?.sales?.moto?.numero_serie,
    sortable: true,
  },
  {
    name: "MARQUE",
    selector: (row) => row?.sales?.moto?.marque,
    sortable: true,
  },
  {
    name: "MODELE",
    selector: (row) => row?.sales?.moto?.modele,
    sortable: true,
  },
  {
    name: "COULEUR",
    selector: (row) => row?.sales?.moto?.couleur,
    sortable: true,
  },
  {
    name: "COMMERCIAL",
    selector: (row) => row?.sales?.commerciale?.nom,
    sortable: true,
  },
  {
    name: "DATE D'ENREGISTREMENT",
    selector: (row) => moment(row?.created_at).format("DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "ACTIONS",
    selector: (row) => (
      <>
        <Button variant="primary" onClick={() => handleWithdraw(row)}>
          Retirer
        </Button>
      </>
    ),
  },
];

export default tableColums;
