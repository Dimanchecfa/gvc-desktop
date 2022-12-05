import React, { useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { fetchFinishedRegistration } from "../../../../api/request";
import Searcher from "../../../../components/data-table-search";
import NotDataBox from "../../../../components/no-data";
import { errorNotif } from "../../../../components/notification";
import PageHeader from "../../../../layouts/components/page-header";
import WithdrawModal from "../components/withdraw-modal";
import tableColums from "./data";

const Finishedregistration = () => {
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [registrations, setRegistrations] = React.useState([]);
    const registration_id = React.useRef(null);
    useEffect(() => {
        (async () => await fetchFinishedRegistrationData())();
    }, [search, show]);

    const fetchFinishedRegistrationData = async () => {
        try {
            const response = await fetchFinishedRegistration();
            const dataReceive = response?.data ?? null;
            const _registrations = dataReceive?.data ?? [];
            const filterdRegistration = _registrations?.filter((data) => {
                return (
                    data?.sales.nom_client
                        ?.toLowerCase()
                        .match(search?.toLowerCase()) ||
                    data?.sales.moto?.numero_serial
                        ?.toLowerCase()
                        .match(search?.toLowerCase())
                );
            });
            if (_registrations?.length > 0) {
                setRegistrations(filterdRegistration);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (typeof error === "object") {
            } else {
                errorNotif("Avertissement", error);
            }
        }
    };

    const onClickRow = (row, action = null) => {};
    const handleWithdraw = (row) => {
        console.log(row);
        registration_id.current = row?.id;
        setShow(true);
    };

    return (
        <>
            <PageHeader title="Listes des immatricuélations disponibles">
                <div className="col-md-2 offset-md-9">
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        Disponibiliser
                    </Button>
                </div>
            </PageHeader>
            <WithdrawModal
                show={show}
                handleClose={() => setShow(false)}
                registration_id={registration_id.current}
            />
            <Card body>
                <>
                    <DataTable
                        columns={tableColums(onClickRow, handleWithdraw)}
                        data={registrations}
                        title={
                            <Searcher
                                placeholder={"Entrer le numéro du journal"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        }
                        onRowClicked={onClickRow}
                        progressComponent={<Spinner />}
                        highlightOnHover
                        pagination
                        pointerOnHover
                        noDataComponent={
                            isLoading ? (
                                <Spinner />
                            ) : (
                                <NotDataBox
                                    message={
                                        "Aucune immatriculation n'a été trouvée"
                                    }
                                />
                            )
                        }
                    />
                </>

                <ReactTooltip id="tooltip" />
            </Card>
        </>
    );
};

export default Finishedregistration;
