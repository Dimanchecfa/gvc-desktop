import moment from "moment";
import { Badge } from "react-bootstrap";

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
    name: "STATUT",
    selector: (row) => (
      <>
        {row?.statut === "en_stock" ? (
          <Badge bg="success" size="lg">
            {row?.statut}
          </Badge>
        ) : (
          <Badge bg="danger" size="lg">
            {row?.statut}
          </Badge>
        )}
      </>
    ),
    sortable: true,
  },
  {
    name: "DATE D'ARRIVEE",
    selector: (row) => moment(row?.updated_at).format("DD/MM/YYYY"),
    sortable: true,
  }
];
export default tableColums;
