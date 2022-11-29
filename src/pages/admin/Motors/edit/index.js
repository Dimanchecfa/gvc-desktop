import { TextField } from "@mui/material";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteMotors, updateMotorData } from "../../../../api/request";
import { BackButton } from "../../../../components/back-button";
import { successNotif } from "../../../../components/notification";
import {
  alertClosed,
  alertConfirmation,
  alertPending,
} from "../../../../components/sweet-alert";
import PageHeader from "../../../../layouts/components/page-header";

const EditMotors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    numero_serie: state?.numero_serie,
    marque: state?.marque,
    modele: state?.modele,
    couleur: state?.couleur,
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
  const [errorForm, setErrorForm] = React.useState({});
  const onSubmit = async () => {
    if (!form.numero_serie || !form.marque || !form.modele || !form.couleur) {
      setErrorForm({
        numero_serie: !form.numero_serie ? "ce champ est obligatoire" : "",
        marque: !form.marque ? "ce champ est obligatoire" : "",
        modele: !form.modele ? "ce champ est obligatoire" : "",
        couleur: !form.couleur ? "ce champ est obligatoire" : "",
      });
      return;
    }
    setIsLoading(true);
    alertPending();
    try {
      const response = await updateMotorData(state?.uuid, form);
      if (response.status === 200) {
        console.log(response.data);
        const dataReceived = response.data?.data;
        navigate(-1);
      }
      alertClosed();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      alertClosed();
    }
  };
  const handleDelete = () => {
    alertConfirmation(
      "Etes vous sur de vouloir supprimer ces données ?",
      ({ isConfirmed }) => {
        if (isConfirmed) {
          DeleteMotors(state?.uuid);
          successNotif("Moto supprime avec succes");
        }
        navigate(-1);
      }
    );
  };
  return (
    <>
      <PageHeader title="Modification d'une moto">
        <div className="offset-sm-10 col-sm-9">
          <BackButton />
        </div>
      </PageHeader>
      <Row>
        <Col md={8} sm={12} xs={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Modifification</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label={"Numero de serie"}
                    variant="outlined"
                    type="text"
                    name="numero_serie"
                    value={form.numero_serie}
                    placeholder="Nom du moteur"
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Marque"
                    variant="outlined"
                    type="text"
                    name="marque"
                    value={form.marque}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Modele"
                    variant="outlined"
                    type="text"
                    name="modele"
                    value={form.modele}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Couleur"
                    variant="outlined"
                    type="text"
                    name="couleur"
                    value={form.couleur}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card body>
              <Row>
                <Col md={2} sm={12} xs={12}>
                  <Button variant="primary" type="submit">
                    Enregistrer
                  </Button>
                </Col>
                <Col md={2} sm={12} xs={12} className="offset-md-8">
                  <Button variant="danger" onClick={handleDelete}>
                    Supprimer
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditMotors;
