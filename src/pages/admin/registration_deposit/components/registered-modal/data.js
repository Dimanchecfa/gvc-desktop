import { Avatar } from "@mui/material";
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
        name: "N° DU CLIENT",
        selector: (row) => row?.numero_client,
        sortable: true,
    },
    {
        name: "N° DE SERIE",
        selector: (row) => row?.moto?.numero_serie,

        sortable: true,
    },
    {
        name: "MODEL",
        selector: (row) => row?.moto?.modele,

        sortable: true,
    },
   
    {
        name: "COULEUR",
        selector: (row) => row?.moto?.couleur,
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