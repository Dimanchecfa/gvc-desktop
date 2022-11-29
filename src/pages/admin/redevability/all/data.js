import moment from "moment";
import { Button } from "react-bootstrap";
import { SalesIcon } from "../../../../components/icones";

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
        name: "MODELE",
        selector: (row) => row?.moto?.modele,
        sortable: true,
    },
    {
        name: "COULEUR",
        selector: (row) => row?.moto?.couleur,
        sortable: true,
    },
    {
        name: "PRIX",
        selector: (row) => row?.prix_vente,
        sortable: true,
    },
    {
        name: "MONTANT VERSE",
        selector: (row) => row?.montant_verse,
        sortable: true,
    },
    {
        name: "MONTANT RESTANT",
        selector: (row) => row?.montant_restant,
        sortable: true,
    },
    {
        name: "DELAI DE PAIEMENT",
        selector: (row) => days(new Date(row?.date_versement)),
    },
    {
        name: "ACTIONS",
        selector: (row) => (
            <>
                <Button variant="info" onClick={() => onClickBtn(row)}>
                    <SalesIcon fill="#fff" /> Solder
                </Button>
            </>
        ),
    },
];

export default tableColums;

const days = (date) => {
    const today = new Date();
    const diff = today.getTime() - date.getTime();
    return "il reste " + Math.ceil(diff / (1000 * 3600 * 24)) + " jours";
};
