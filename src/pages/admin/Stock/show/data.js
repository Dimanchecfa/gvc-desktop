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
        name: "STATUT",
        selector: (row) => (
            <>
                {
                    row?.statut === "en stock" ? (
                        <Badge className="text-white bg-success" bg="">
                        <small>
                            {row?.statut}
                        </small>
                    </Badge>
                    ) : (
                        <Badge className="text-white bg-danger" bg="">
                        <small>
                            {row?.statut}
                        </small>
                    </Badge>
                    )
                }
            
            </>
        ),
        sortable: true,
    },
];

export default tableColums;