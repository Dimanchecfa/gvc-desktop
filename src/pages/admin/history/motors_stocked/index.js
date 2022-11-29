import React, { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { fetchMotorsStocked } from "../../../../api/request";
import Searcher from "../../../../components/data-table-search";
import NotDataBox from "../../../../components/no-data";
import { errorNotif } from "../../../../components/notification";
import PageHeader from "../../../../layouts/components/page-header";
import tableColums from "./data";

const MotorsStocked = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [motorsStocked, setMotorsStocked] = React.useState([]);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    (async () => await fetchMotorsStockedData())();
  }, [search]);

  const fetchMotorsStockedData = async () => {
    try {
      setMotorsStocked([]);
      setIsLoading(true);
      const response = await fetchMotorsStocked();
      const dataReceive = response?.data ?? null;
      const _lots = dataReceive?.data ?? [];
      console.log(_lots);
      const filterdLot = _lots?.filter((data) => {
        return data?.numero_serie?.toLowerCase().match(search?.toLowerCase());
      });
      if (_lots?.length > 0) {
        setMotorsStocked(filterdLot);
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
    navigate(`/lot/details`, {
      state: { uuid: row.uuid, registrations: row.registrations },
    });
  };
  return (
    <>
      <PageHeader title="Listes des motos en stock"></PageHeader>
      <Card body>
        <>
          <DataTable
            columns={tableColums(onClickRow)}
            data={motorsStocked}
            title={
              <Searcher
                placeholder={"Entrer le numéro du journal"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            }
            progressComponent={<Spinner />}
            highlightOnHover
            pagination
            pointerOnHover
            noDataComponent={
              isLoading ? (
                <Spinner />
              ) : (
                <NotDataBox message={"Aucune vente n'a été trouvée"} />
              )
            }
          />
        </>

        <ReactTooltip id="tooltip" />
      </Card>
    </>
  );
};

export default MotorsStocked;
