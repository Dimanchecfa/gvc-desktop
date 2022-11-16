import React, { useEffect } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../layouts/components/page-header";
import { errorNotif } from "../../../../../components/notification";
import { fetchCommercials } from "../../../../../api/request";
import Searcher from "../../../../../components/data-table-search";
import tableColums from "./data";
import NotDataBox from "../../../../../components/no-data";

const CommercialModal = ({ show, handleClose, handleSelected }) => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [commercial, setCommercial] = React.useState([]);
  const [search, setSearch] = React.useState("");
  useEffect(() => {
    (async () => await fetchCommercialData())();
  }, [search]);

  const fetchCommercialData = async (page) => {
    try {
      setCommercial([]);
      setIsLoading(true);
      const response = await fetchCommercials();
      const dataReceive = response?.data ?? null;
      const _commercial = dataReceive?.data ?? [];
      console.log(_commercial);
      const filterdCommercial = _commercial?.filter((data) => {
        return data?.pseudo?.toLowerCase().match(search?.toLowerCase());
      });
      if (_commercial?.length > 0) {
        setCommercial(filterdCommercial);
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
    console.log(row);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            columns={tableColums(onClickRow)}
            data={commercial}
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
            selectableRows
            onSelectedRowsChange={(state) => handleSelected(state)}
            selectableRowsSingle
            selectableRowsHighlight
            pointerOnHover
            noDataComponent={
              isLoading ? (
                <Spinner />
              ) : (
                <NotDataBox message={"Aucun commercial n'a été trouvé"} />
              )
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommercialModal;
