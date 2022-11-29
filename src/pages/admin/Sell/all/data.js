import moment from "moment";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn) => [
    {
        name: "NUMERO DE FACTURE",
        selector: (row) => row?.numero_facture,
        sortable: true,
    },
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
        name: "STATUT",
        selector: (row) => (
            <>
                {row?.statut_payement === "en_cours" ? (
                    <Badge className="text-white bg-success" bg="">
                        {row?.statut_payement}
                    </Badge>
                ) : (
                    <Badge className="text-white bg-danger" bg="">
                        {row?.statut_payement}
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
