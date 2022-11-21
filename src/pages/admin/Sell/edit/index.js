import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Page } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../../../layouts/components/page-header";
import CommercialModal from "../components/commerciale-modal";
import MotorsModal from "../components/numero-serie-modal";

const EditSale = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  const [showCommercial, setShowCommercial] = useState(false);
  const [showMotorcycle, setShowMotorcycle] = useState(false);
  const selectCommercial = useRef(null);
  const selectMotor = useRef(null);
  const marque = useRef(null);
  const modele = useRef(null);
  const couleur = useRef(null);
  const numero_serie = useRef(null);
  const commercial = useRef(null);
  const navigate = useNavigate();
  const editData = state;
  const handleShowCommercial = () => setShowCommercial(true);
  const handleCloseCommercial = () => setShowCommercial(false);
  const handleShowMotor = () => setShowMotorcycle(true);
  const handleCloseMotor = () => setShowMotorcycle(false);
  const handleSelectCommercial = (state) => {
    commercial.current = state?.selectedRows[0]?.pseudo;
  };
  const handleSelectMotor = (state) => {
    numero_serie.current = state?.selectedRows[0]?.numero_serie;
    marque.current = state?.selectedRows[0]?.marque;
    modele.current = state?.selectedRows[0]?.modele;
    couleur.current = state?.selectedRows[0]?.couleur;
    console.log(marque.current);
  };
  const [formData, setFormData] = React.useState({
    numero_serie: editData?.moto?.numero_serie,
    prix_vente: editData?.prix_vente,
    is_certificat: editData?.is_certificat,
    is_registred: editData?.is_registred,
    prix_vente: editData?.prix_vente,
    montant_verse: editData?.montant_verse,
    statut: editData?.statut,
    montant_restant:
      editData?.statut === "payé" ? 0 : editData?.montant_restant,
    date_vente: editData?.date_vente,
    date_versement: editData?.date_versement,
    nom_client: editData?.nom_client,
    numero_facture: editData?.numero_facture,
    numero_client: editData?.numero_client,
    identifiant_client: editData?.identifiant_client,
    adresse_client: editData?.adresse_client,
    commerciale_id: editData?.commerciale_id,
  });
  const [errorForm, setErrorForm] = React.useState({});
  const handlerInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <PageHeader title="Modifier une vente">
        <Button variant="primary" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </PageHeader>
      <MotorsModal
        show={showMotorcycle}
        handleClose={handleCloseMotor}
        handleSelected={(state) => handleSelectMotor(state)}
      />
      <CommercialModal
        show={showCommercial}
        handleClose={handleCloseCommercial}
        handleSelected={(state) => handleSelectCommercial(state)}
      />{" "}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {" "}
          <Card.Body>
            <Modal.Body>
              <Row>
                <Col md={4} sm={12} xs={12}>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">
                        Informations de l'engin vendu
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <TextField
                          disabled={!numero_serie.current ? false : true}
                          id="outlined-basic"
                          label={!numero_serie.current ? "Numero de serie" : ""}
                          variant="outlined"
                          name="numero_serie"
                          value={formData.numero_serie}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.numero_serie}
                          helperText={errorForm.numero_serie}
                          onClick={handleShowMotor}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          disabled={!marque.current ? false : true}
                          id="outlined-basic"
                          label={!marque.current ? "Marque" : ""}
                          variant="outlined"
                          name="marque"
                          value={marque?.current}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.marque}
                          helperText={errorForm.marque}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          disabled={!modele.current ? false : true}
                          id="outlined-basic"
                          label={!modele.current ? "Modele" : ""}
                          variant="outlined"
                          name="modele"
                          value={modele.current}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.modele}
                          helperText={errorForm.modele}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          disabled={!couleur.current ? false : true}
                          id="outlined-basic"
                          label={!couleur.current ? "Couleur" : ""}
                          variant="outlined"
                          name="couleur"
                          value={couleur?.current}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.couleur}
                          helperText={errorForm.couleur}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Prix de vente"
                          variant="outlined"
                          name="prix_vente"
                          value={formData.prix_vente}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.prix_vente}
                          helperText={errorForm.prix_vente}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Informations du client</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Nom du client"
                          variant="outlined"
                          name="nom_client"
                          value={formData.nom_client}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.nom_client}
                          helperText={errorForm.nom_client}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Numero de facture"
                          variant="outlined"
                          name="numero_facture"
                          value={formData.numero_facture}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.numero_facture}
                          helperText={errorForm.numero_facture}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Numero de client"
                          variant="outlined"
                          name="numero_client"
                          value={formData.numero_client}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.numero_client}
                          helperText={errorForm.numero_client}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Identifiant client"
                          variant="outlined"
                          name="identifiant_client"
                          value={formData.identifiant_client}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.identifiant_client}
                          helperText={errorForm.identifiant_client}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="Adresse client"
                          variant="outlined"
                          name="adresse_client"
                          value={formData.adresse_client}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.adresse_client}
                          helperText={errorForm.adresse_client}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Informations de la vente</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <TextField
                          disabled={!marque.current ? false : true}
                          id="outlined-basic"
                          label={!commercial.current ? "Marque" : ""}
                          variant="outlined"
                          name="commerciale_id"
                          value={commercial.current}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.commerciale_id}
                          helperText={errorForm.commerciale_id}
                          onClick={handleShowCommercial}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="montant versé"
                          variant="outlined"
                          name="montant_versé"
                          value={formData.montant_verse}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.montant_versé}
                          helperText={errorForm.montant_versé}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="montant restant"
                          variant="outlined"
                          name="montant_restant"
                          value={formData.montant_restant}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.montant_restant}
                          helperText={errorForm.montant_restant}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <TextField
                          label="date de vente"
                          variant="outlined"
                          name="date_vente"
                          value={formData.date_vente}
                          onChange={handlerInput}
                          fullWidth
                          size="small"
                          error={!!errorForm.date_vente}
                          helperText={errorForm.date_vente}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col md={6} sm={12} xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={!!formData.is_registred}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      [e.target.name]: e.target.checked,
                                    })
                                  }
                                  name="is_registred"
                                  color="primary"
                                />
                              }
                              label="Immatricule"
                            />
                          </Col>
                          {formData.is_registred == false && (
                            <>
                              <Col md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={!!formData.is_certificat}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          [e.target.name]: e.target.checked,
                                        })
                                      }
                                      name="is_certificat"
                                      color="primary"
                                    />
                                  }
                                  label="CMC"
                                />
                              </Col>
                            </>
                          )}
                        </Row>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
          </Card.Body>{" "}
        </Card>{" "}
        <Card body>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary"
              >
                Enregistrer
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};

export default EditSale;
