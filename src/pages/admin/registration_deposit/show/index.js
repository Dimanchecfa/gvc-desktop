import React, { useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Searcher from "../../../../components/data-table-search";
import NotDataBox from "../../../../components/no-data";
import PageHeader from "../../../../layouts/components/page-header";
import RegistredModal from "../components/registered-modal";
import tableColums from "./data";
import { successNotif, errorNotif } from "../../../../components/notification";
import {
    addRegistration,
    fetchRegistrationByLot,
} from "../../../../api/request";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setRegistration } from "../../../../app/slices/stock.slices";
import { useReactToPrint } from "react-to-print";
import Print from "../print_views";
const Stock = () => {
    const { state } = useLocation();
    console.log(state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const selectRows = useRef([]);
    const array_print = useRef([]);
    const [registredId, setRegistredId] = React.useState([]);
    const regis = useSelector((state) => state.stock.registration);
    const [registrations, setRegistrations] = React.useState(
        state?.registrations ?? []
    );
    const [showModal, setShowModal] = React.useState(false);
    const array = useRef([]);

    const onClickRow = (row, action = null) => {
        navigate(`/lot/edit`, { state: row });
    };
    useEffect(() => {
        (async () => await fetchRegistrationData())();
    }, [search]);
    const fetchRegistrationData = async () => {
        const response = await fetchRegistrationByLot(state?.id);
        const dataReceive = response?.data ?? null;
        const _registrations = dataReceive?.data ?? [];
        const filteredRegistration = _registrations?.filter((motor) => {
            return motor?.sales?.nom_client
                ?.toLowerCase()
                .match(search?.toLowerCase());
        });
        console.log(filteredRegistration);
        setRegistrations(filteredRegistration);
    };

    const handleRowSelected = (row) => {
        console.log(row.selectedRows);
        getLastId(row.selectedRows);
        selectRows.current = row.selectedRows;
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getLastId = (selectedRows) => {
        let _registredId = [];
        selectedRows?.map((row) => {
            let IdString = row?.id.toString();
            _registredId.push(IdString);
        });
        array.current = _registredId;
        console.log(array.current);
    };
    const handleSubmit = async () => {
        console.log(state.id);
        try {
            const response = await addRegistration(array.current, state.id);
            console.log(response);
            setShowModal(false);
            fetchRegistrationData();
            successNotif("Immatriculation envoye avec succes");
        } catch (e) {
            errorNotif("Erreur");
            console.log(e);
        }
    };
    const handleDelete = () => {
        console.log("okokokok");
    };

    return (
        <>
            <PageHeader title={`Details du lot ${state?.numero_lot}`}>
                <div className="offset-sm-5 col-sm-10">
                    <Button
                        className="mr-2"
                        variant="dark"
                        size="md"
                        onClick={() => navigate(-1)}
                    >
                        <i className="zmdi zmdi-accounts-list-alt"></i> Retour
                    </Button>

                    <Button
                        className="mr-2"
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        Ajouter une demande
                    </Button>
                    <Button
                        className="mr-2"
                        variant="success"
                        onClick={() => navigate("/lot/edit", { state: state })}
                    >
                        Modifier le lot
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Supprimer le lot
                    </Button>
                </div>
            </PageHeader>
            <div style={{ display: "none" }}>
                <Print ref={componentRef} data={registrations} state={state} />
            </div>
            <RegistredModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSelected={(row) => handleRowSelected(row)}
                handleSubmit={handleSubmit}
            />
            <Card body>
                <>
                    <DataTable
                        columns={tableColums(onClickRow)}
                        data={registrations}
                        title={
                            <Searcher
                                placeholder={"Rechercher"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        }
                        onRowClicked={onClickRow}
                        progressComponent={<Spinner />}
                        pointerOnHover
                        noDataComponent={
                            isLoading ? (
                                <Spinner />
                            ) : (
                                <NotDataBox
                                    message={"Aucun stock n'a été trouvé"}
                                />
                            )
                        }
                        pagination
                        className="table-responsive"
                        actions={
                            <Button variant="success" onClick={handlePrint}>
                                <i className="zmdi zmdi-print"></i> Imprimer
                            </Button>
                        }
                    />
                </>

                <ReactTooltip id="tooltip" />
            </Card>
        </>
    );
};

export default Stock;
