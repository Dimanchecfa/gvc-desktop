import React, { useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../layouts/components/page-header";
import tableColums from "./data";
import NotDataBox from "../../../../components/no-data";
import PaginationPage from "../../../../components/paginate";
import { errorNotif } from "../../../../components/notification";
import Searcher from "../../../../components/data-table-search";
import ReactTooltip from "react-tooltip";
import { fetchSales, fetchStock } from "../../../../api/request";
import ShowSell from "../components/info-modal";

const Stock = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [sales, setSales] = React.useState([]);
    const rowData = useRef({});
    const [search, setSearch] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        (async () => await fetchSalesData())();
    }, [search]);

    const fetchSalesData = async () => {
        try {
            setSales([]);
            setIsLoading(true);
            const response = await fetchSales();
            const dataReceive = response?.data ?? null;
            const _sales = dataReceive?.data ?? [];
            console.log(_sales);
            const filterdSell = _sales?.filter((sale) => {
                return (
                    sale?.numero_facture
                        ?.toLowerCase()
                        .match(search?.toLowerCase()) ||
                    sale?.moto.modele
                        ?.toLowerCase()
                        .match(search?.toLowerCase()) ||
                    sale?.nom_client?.toLowerCase().match(search?.toLowerCase())
                );
            });
            if (_sales?.length > 0) {
                setSales(filterdSell);
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

    const onClickRow = (row, action = null) => {
        setShowModal(true);
        rowData.current = row;
    };
    const onClickBtn2 = (row, action = null) => {
        console.log(row);
    };

    return (
        <>
            <PageHeader title="Listes des ventes">
                <div className="offset-sm-10 col-sm-9">
                    <Button
                        className="mr-2"
                        variant="primary"
                        size="md"
                        onClick={() => navigate("/sales/add")}
                    >
                        vendre
                    </Button>
                </div>
            </PageHeader>
            <ShowSell
                show={showModal}
                handleClose={handleClose}
                data={rowData.current}
            />
            <Card body>
                <>
                    <DataTable
                        columns={tableColums(onClickRow, onClickBtn2)}
                        data={sales}
                        title={
                            <Searcher
                                placeholder={"Entrer le num??ro de serie"}
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
                                    message={"Aucune vente n'a ??t?? trouv??e"}
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
