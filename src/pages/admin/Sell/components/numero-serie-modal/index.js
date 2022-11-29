import React, { useEffect } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import tableColums from "./data";
import NotDataBox from "../../../../../components/no-data";
import PaginationPage from "../../../../../components/paginate";
import { errorNotif } from "../../../../../components/notification";
import Searcher from "../../../../../components/data-table-search";
import ReactTooltip from "react-tooltip";
import { fetchMotors, fetchMotorsStocked } from "../../../../../api/request";

const MotorsModal = ({ show, handleClose, handleSelected }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [motors, setMotors] = React.useState([]);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    (async () => await fetchMotorsData())();
  }, [search]);

  const fetchMotorsData = async () => {
    try {
      setMotors([]);
      setIsLoading(true);
      const response = await fetchMotorsStocked();
      const dataReceive = response?.data ?? null;
      const _motors = dataReceive?.data ?? [];
      console.log(_motors);
      const filterdMotors = _motors?.filter((data) => {
        return data?.numero_serie?.toLowerCase().match(search?.toLowerCase());
      });
      if (_motors?.length > 0) {
        setMotors(filterdMotors);
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
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Choisissez la moto que vous voulez vendre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={tableColums(onClickRow)}
            data={motors}
            title={
              <Searcher
                placeholder={"Entrer le numero de serie"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            }
            onRowClicked={onClickRow}
            progressComponent={<Spinner />}
            highlightOnHover
            pagination
            selectableRows
            onSelectedRowsChange={(state) => {
              handleSelected(state);
              console.log(state);
            }}
            selectableRowsSingle
            selectableRowsHighlight
            pointerOnHover
            noDataComponent={
              isLoading ? (
                <Spinner />
              ) : (
                <NotDataBox message={"Aucune moto n'a été trouvé"} />
              )
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MotorsModal;
