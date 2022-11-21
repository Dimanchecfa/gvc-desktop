import { Avatar } from "@mui/material";
import moment from "moment";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const tableColums = (onClickBtn) => [
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
        name: "MODEL",
        selector: (row) => row?.sales?.moto?.marque,

        sortable: true,
    },
   
    {
        name: "COULEUR",
        selector: (row) => row?.sales?.moto?.couleur,
        sortable: true,
    },
    {
        name: "COMMERCIALE",
        selector: (row) => row?.sales?.commerciale?.pseudo,
        sortable: true,
    },
    // {
    //     name: "STATUT",
    //     selector: (row) => (
    //         <>
    //             {
    //                 row?.statut === "en_stock" ? (
    //                     <Badge  bg="success" size="lg">
    //                         {row?.sales?.statut}
    //                 </Badge>
    //                 ) : (
    //                     <Badge  bg="danger" size="lg">
    //                         {row?.sales?.statut}
    //                 </Badge>
    //                 )
    //             }
            
    //         </>
    //     ),
    //     sortable: true,
    // },
];

export default tableColums;