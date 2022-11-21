import { TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { fetchMotorsUncertified } from "../../../../../api/request";
import Searcher from "../../../../../components/data-table-search";
import NotDataBox from "../../../../../components/no-data";
import { errorNotif } from "../../../../../components/notification";
import tableColums from "./data";

const MotorsUncertifiedModal = ({ show, handleClose, handleSubmit, handleSelect }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [MotorsUncertified, setMotorsUncertified] = React.useState([]);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    (async () => await fetchMotorsCertifiedData())();
  }, [search]);
  const fetchMotorsCertifiedData = async () => {
    try {
      setMotorsUncertified([]);
      setIsLoading(true);
      const response = await fetchMotorsUncertified();
      const dataReceive = response?.data ?? null;
      const _uncertified = dataReceive?.data ?? [];
      console.log(_uncertified);
      const filterd = _uncertified?.filter((data) => {
        return data?.numero_serie?.toLowerCase().match(search?.toLowerCase());
      });
      if (_uncertified?.length > 0) {
        setMotorsUncertified(filterd);
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
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Choisissez la moto que vous voulez vendre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={tableColums(onClickRow)}
            data={MotorsUncertified}
            title={
              <Searcher
                placeholder={"Entrer le numéro du journal"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            }
            onRowClicked={onClickRow}
            progressComponent={<Spinner />}
            pagination
            contextActions={<>
             <TextField 
            label="Rechercher"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
              </>}
            selectableRows
            onSelectedRowsChange={(state) => handleSelect(state)}
            striped
            noDataComponent={
              isLoading ? (
                <Spinner />
              ) : (
                <NotDataBox message={"Aucun stock n'a été trouvé"} />
              )
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MotorsUncertifiedModal;
