import { TextField } from "@mui/material";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateStockData } from "../../../../api/request";
import { BackButton } from "../../../../components/back-button";
import { successNotif } from "../../../../components/notification";
import { alertClosed, alertPending } from "../../../../components/sweet-alert";
import PageHeader from "../../../../layouts/components/page-header";

const EditStock = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  console.log(state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    nom_fournisseur: state?.nom_fournisseur,
    numero_fournisseur: state?.numero_fournisseur,
    numero: state?.numero,
  });
  const handlerInput = (e) => {
    const target = e?.target;
    const name = target?.name;
    const value = target?.value;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async () => {
    if (!form.nom_fournisseur || !form.numero_fournisseur || !form.numero) {
      setErrorForm({
        nom_fournisseur: !form.nom_fournisseur
          ? "ce champ est obligatoire"
          : "",
        numero_fournisseur: !form.numero_fournisseur
          ? "ce champ est obligatoire"
          : "",
        numero: !form.numero ? "ce champ est obligatoire" : "",
      });
      return;
    }
    setIsLoading(true);
    alertPending();
    try {
      const response = await UpdateStockData(state?.uuid, form);
      if (response.status === 200) {
        alertClosed();
        successNotif("Stock modifié avec succès");
        console.log(response.data);
        const dataReceived = response.data?.data;
        navigate("/stock/details", { state: dataReceived });
      }
      alertClosed();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  const [errorForm, setErrorForm] = React.useState({});
  return (
    <>
      <PageHeader title="Modification d'un stock">
        <div className="offset-sm-10 col-sm-9">
          <BackButton />
        </div>
      </PageHeader>
      <Row>
        <Col md={8} sm={12} xs={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Modifier un stock</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Nom du fournisseur"
                    variant="outlined"
                    type="text"
                    name="nom_fournisseur"
                    value={form.nom_fournisseur}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={!!errorForm.nom_fournisseur}
                    helperText={errorForm.nom_fournisseur}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Numero du fournisseur"
                    variant="outlined"
                    type="text"
                    name="numero_fournisseur"
                    value={form.numero_fournisseur}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={!!errorForm.numero_fournisseur}
                    helperText={errorForm.numero_fournisseur}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Numero de lot"
                    variant="outlined"
                    type="text"
                    name="numero"
                    value={form.numero}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={!!errorForm.numero}
                    helperText={errorForm.numero}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card body>
              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditStock;
