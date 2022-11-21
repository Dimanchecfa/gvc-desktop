import React, { useEffect } from "react";
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
import { fetchCommercials, fetchRedevability, fetchStock } from "../../../../api/request";

const Stock = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [redevability, setRedevability] = React.useState([]);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    (async () => await fetchRedevabilityData())();
  }, [search]);

  const fetchRedevabilityData = async (page) => {
    try {
      setRedevability([]);
      setIsLoading(true);
      const response = await fetchRedevability();
      const dataReceive = response?.data ?? null;
      const _redevability = dataReceive?.data ?? [];
      console.log(_redevability);
      const filterdCommercial = _redevability?.filter((data) => {
        return data?.nom_client?.toLowerCase().match(search?.toLowerCase());
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

  const onClickRow = (row, action = null) => {
    navigate(`/stock/details`, { state: { uuid: row.uuid, motors: row.moto } });
  };

  return (
    <>
      <PageHeader title="Stock">
        <div className="offset-sm-10 col-sm-9">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("/commercial/add")}
          >
            Ajouter un commerciale
          </Button>
        </div>
      </PageHeader>
      <Card body>
        <>
          <DataTable
            columns={tableColums(onClickRow)}
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
            highlightOnHover
            pagination
            pointerOnHover
            noDataComponent={
              isLoading ? (
                <Spinner />
              ) : (
                <NotDataBox message={"Aucun commercial n'a été trouvé"} />
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
