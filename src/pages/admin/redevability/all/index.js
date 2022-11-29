import React, { useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../layouts/components/page-header";
import tableColums from "./data";
import NotDataBox from "../../../../components/no-data";
import { errorNotif } from "../../../../components/notification";
import Searcher from "../../../../components/data-table-search";
import ReactTooltip from "react-tooltip";
import { fetchRedevability } from "../../../../api/request";
import { BackButton } from "../../../../components/back-button";
import PaymentModal from "../components/payment-modal";

const Stock = () => {
    const navigate = useNavigate();
    const data = useRef([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [redevability, setRedevability] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        (async () => await fetchRedevabilityData())();
    }, [search, show]);

    const fetchRedevabilityData = async (page) => {
        try {
            setRedevability([]);
            setIsLoading(true);
            const response = await fetchRedevability();
            const dataReceive = response?.data ?? null;
            const _redevability = dataReceive?.data ?? [];
            console.log(_redevability);
            const filterdCommercial = _redevability?.filter((data) => {
                return data?.nom_client
                    ?.toLowerCase()
                    .match(search?.toLowerCase());
            });
            if (_redevability?.length > 0) {
                setRedevability(filterdCommercial);
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
    const onClickBtn = (row) => {
        setShow(true);
        data.current = row;
    };

    return (
        <>
            <PageHeader title="Listes des Ventes inachevées">
                <div className="offset-sm-10 col-sm-9">
                    <Button variant="dark" onClick={() => navigate(-1)}>
                        <i className="fa fa-arrow-left"></i> Retour
                    </Button>
                </div>
            </PageHeader>
            <PaymentModal
                show={show}
                handleClose={() => setShow(false)}
                data={data.current}
            />
            <Card body>
                <>
                    <DataTable
                        columns={tableColums(onClickBtn)}
                        data={redevability}
                        title={
                            <Searcher
                                placeholder={"Entrer le nom du commercial"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        }
                        onRowClicked={onClickRow}
                        progressComponent={<Spinner />}
                        pagination
                        noDataComponent={
                            isLoading ? (
                                <Spinner />
                            ) : (
                                <NotDataBox
                                    message={"Aucun commercial n'a été trouvé"}
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

export default Stock;
