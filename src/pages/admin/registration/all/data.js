import moment from "moment";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn) => [
    {
        name: "NOM DU CLIENT",
        selector: (row) => row?.nom_client,
        sortable: true,
    },
    {
        name: "NUMERO DU CLIENT",
        selector: (row) => row?.numero_client,

        sortable: true,
    },
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
        selector: (row) => row?.numero_client,
        sortable: true,
    },
    {
        name: "DATE DE VENTE",
        selector: (row) => row?.numero_client,
        sortable: true,
    },
    {
        name: "STATUT",
        selector: (row) => (
            <>
                {
                    row?.statut === "en_cours" ? (
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
                    )}
            </>
        ),
        sortable: true,
    },
    {
        name: "MODEL DE LA MOTO",
        selector: (row) => row?.moto?.modele,
        sortable: true,
    },
    {
        name: "COMMERCIAL",
        selector: (row) => row?.commerciale?.nom,
        sortable: true,
    },
    {
        name: "DATA DE VENTE",
        selector: (row) => moment(row?.created_at).format("DD/MM/YYYY"),
        sortable: true,
    },
];

export default tableColums;