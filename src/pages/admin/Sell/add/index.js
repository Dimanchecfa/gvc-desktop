import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BackButton } from "../../../../components/back-button";
import PageHeader from "../../../../layouts/components/page-header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CommercialModal from "../components/commerciale-modal";
import MotorsModal from "../components/numero-serie-modal";
import moment from "moment";
import { addSales } from "../../../../api/request";
import { alertClosed, alertPending } from "../../../../components/sweet-alert";
import dayjs from "dayjs";
import { errorNotif, successNotif } from "../../../../components/notification";
import { useNavigate } from "react-router-dom";

const AddSales = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [showCommercial, setShowCommercial] = useState(false);
    const [showMotorcycle, setShowMotorcycle] = useState(false);
    const [value, setValue] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const marque = useRef(null);
    const modele = useRef(null);
    const couleur = useRef(null);
    const numero_serie = useRef(null);
    const moto_id = useRef(null);
    const commercial = useRef(null);
    const [saleForm, setSaleForm] = useState({
        moto_id: "",
        numero_serie: "",
        commercial_id: "",
        prix_vente: "",
        montant_verse: "",
        montant_restant: "",
        commercial: "",
        nom_client: "",
        prenom_client: "",
        numero_client: "",
        adresse_client: "",
        identifiant_client: "",
        date_versement: value,
        with_registration: true,
    });
    const [errorForm, setErrorForm] = useState({});

    const handleShowCommercial = () => setShowCommercial(true);
    const handleCloseCommercial = () => setShowCommercial(false);
    const handleShowMotor = () => setShowMotorcycle(true);
    const handleCloseMotor = () => setShowMotorcycle(false);
    const handleSelectCommercial = (state) => {
        saleForm.commercial_id = state?.selectedRows[0]?.id;
        commercial.current = state?.selectedRows[0]?.nom;
    };
    const handleSelectMotor = (state) => {
        saleForm.numero_serie = state?.selectedRows[0]?.numero_serie;
        moto_id.current = state?.selectedRows[0]?.id;
        marque.current = state?.selectedRows[0]?.marque;
        modele.current = state?.selectedRows[0]?.modele;
        couleur.current = state?.selectedRows[0]?.couleur;
        saleForm.moto_id = state?.selectedRows[0]?.id;
    };
    const handleChange = (newValue) => {
        const value = moment(newValue).format("YYYY-MM-DD");
        setValue(value);
        console.log(value);
    };

    const handlerInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target?.value;
        const name = target?.name;
        setSaleForm({
            ...saleForm,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const onSubmit = async () => {
        alertPending();
        if (
            !saleForm.numero_serie ||
            !saleForm.prix_vente ||
            !saleForm.montant_verse ||
            !saleForm.nom_client ||
            !saleForm.numero_client ||
            !saleForm.adresse_client ||
            !saleForm.identifiant_client
        ) {
            alertClosed();
            console.log("pl");
            setErrorForm({
                date_versement: !saleForm.date_versement
                    ? "Date de versement est obligatoire"
                    : "",
                prix_vente: !saleForm.prix_vente
                    ? "Ce champ est obligatoire"
                    : "",
                montant_verse: !saleForm.montant_verse
                    ? "Ce champ est obligatoire"
                    : "",
                nom_client: !saleForm.nom_client
                    ? "Ce champ est obligatoire"
                    : "",
                prenom_client: !saleForm.prenom_client
                    ? "Ce champ est obligatoire"
                    : "",
                numero_client: !saleForm.numero_client
                    ? "Ce champ est obligatoire"
                    : "",
                adresse_client: !saleForm.adresse_client
                    ? "Ce champ est obligatoire"
                    : "",
                identifiant_client: !saleForm.identifiant_client
                    ? "Ce champ est obligatoire"
                    : "",
                commercial: !saleForm.commercial
                    ? "Ce champ est obligatoire"
                    : "",
                numero_serie: !saleForm.numero_serie
                    ? "Ce champ est obligatoire"
                    : "",
            });

            return;
        }
        console.log(saleForm);
        const data = {
            moto_id: saleForm.moto_id,
            commercial_id: saleForm?.commercial_id,
            prix_vente: saleForm.prix_vente,
            montant_verse: saleForm.montant_verse,
            montant_restant: saleForm.prix_vente - saleForm.montant_verse,
            nom_client: saleForm.nom_client,
            prenom_client: saleForm.prenom_client,
            numero_client: saleForm.numero_client,
            adresse_client: saleForm.adresse_client,
            identifiant_client: saleForm.identifiant_client,
            date_versement: saleForm.date_versement,
            statut_payement:
                saleForm.prix_vente == saleForm.montant_verse
                    ? "terminé"
                    : "en_cours",
        };
        console.log(data);
        try {
            const response = await addSales(data);
            const dataResponse = response?.data;
            console.log(dataResponse);
            if (dataResponse?.success) {
                alertClosed();
                successNotif("Vente ajoutée avec succès");
            } else {
                alertClosed();
                errorNotif("Cette moto a déjà été vendue");
            }
        } catch (e) {
            console.log(e);
            alertClosed();

            errorNotif("Une erreur est survenue");
        }
    };
    return (
        <>
            <PageHeader title="Ajouter un commercial">
                <div className="col-sm-4 offset-sm-10">
                    <BackButton />
                </div>
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
            <Form className="form theme-form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={4} sm={12} xs={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Informations de l'engin
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        disabled={
                                            !saleForm.numero_serie
                                                ? true
                                                : false
                                        }
                                        id="outlined-basic"
                                        label={
                                            !saleForm.numero_serie
                                                ? "Numero de serie"
                                                : ""
                                        }
                                        type="text"
                                        name="numero_serie"
                                        onChange={handlerInput}
                                        value={saleForm.numero_serie}
                                        size="small"
                                        fullWidth
                                        aria-readonly={false}
                                        onClick={handleShowMotor}
                                        error={
                                            errorForm?.numero_serie
                                                ? true
                                                : false
                                        }
                                        onFocus={() => {
                                            setErrorForm({
                                                ...errorForm,
                                                numero_serie: "",
                                            });
                                        }}
                                        helperText={
                                            errorForm?.numero_serie
                                                ? errorForm.numero_serie
                                                : ""
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        disabled={
                                            !marque.current ? false : true
                                        }
                                        id="outlined-basic"
                                        label={!marque.current ? "Marque" : ""}
                                        variant="outlined"
                                        type="text"
                                        name="marque"
                                        onChange={handlerInput}
                                        value={marque.current}
                                        size="small"
                                        fullWidth
                                        aria-readonly={false}
                                        error={errorForm?.marque ? true : false}
                                        helperText={
                                            errorForm?.marque
                                                ? errorForm?.marque
                                                : ""
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        disabled={
                                            !modele.current ? false : true
                                        }
                                        id="outlined-basic"
                                        label={!modele.current ? "Modele" : ""}
                                        variant="outlined"
                                        type="text"
                                        name="modele"
                                        onChange={handlerInput}
                                        value={modele.current}
                                        size="small"
                                        fullWidth
                                        aria-readonly={true}
                                        error={errorForm?.modele ? true : false}
                                        helperText={
                                            errorForm?.modele
                                                ? errorForm?.modele
                                                : ""
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        disabled={
                                            !couleur.current ? false : true
                                        }
                                        id="outlined-basic"
                                        label={
                                            !couleur.current ? "Couleur" : ""
                                        }
                                        variant="outlined"
                                        type="text"
                                        value={couleur.current}
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        error={
                                            errorForm?.couleur ? true : false
                                        }
                                        helperText={
                                            errorForm?.couleur
                                                ? errorForm?.couleur
                                                : ""
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Prix de l'engin"
                                        variant="outlined"
                                        type="text"
                                        name="prix_vente"
                                        value={saleForm?.prix_vente}
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        aria-readonly={true}
                                        error={
                                            errorForm?.prix_vente ? true : false
                                        }
                                        helperText={
                                            errorForm?.prix_vente
                                                ? errorForm?.prix_vente
                                                : ""
                                        }
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Informations du client
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form className="form theme-form">
                                    <Form.Group className="mb-3">
                                        <TextField
                                            id="outlined-basic"
                                            label="Nom du client"
                                            variant="outlined"
                                            type="text"
                                            name="nom_client"
                                            value={saleForm?.nom_client}
                                            onChange={handlerInput}
                                            size="small"
                                            fullWidth
                                            onFocus={() => {
                                                setErrorForm({
                                                    ...errorForm,
                                                    nom_client: "",
                                                });
                                            }}
                                            error={
                                                errorForm?.nom_client
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errorForm?.nom_client
                                                    ? errorForm?.nom_client
                                                    : ""
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <TextField
                                            id="outlined-basic"
                                            label="Prenom du client"
                                            variant="outlined"
                                            type="text"
                                            name="prenom_client"
                                            value={saleForm?.prenom_client}
                                            onChange={handlerInput}
                                            size="small"
                                            fullWidth
                                            error={
                                                errorForm?.prenom_client
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errorForm?.prenom_client
                                                    ? errorForm?.prenom_client
                                                    : ""
                                            }
                                            onFocus={() => {
                                                setErrorForm({
                                                    ...errorForm,
                                                    prenom_client: "",
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <TextField
                                            id="outlined-basic"
                                            label="Numero du client"
                                            variant="outlined"
                                            type="text"
                                            name="numero_client"
                                            value={saleForm?.numero_client}
                                            onChange={handlerInput}
                                            size="small"
                                            fullWidth
                                            error={
                                                errorForm?.numero_client
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errorForm?.numero_client
                                                    ? errorForm?.numero_client
                                                    : ""
                                            }
                                            onFocus={() => {
                                                setErrorForm({
                                                    ...errorForm,
                                                    numero_client: "",
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <TextField
                                            id="outlined-basic"
                                            label="Adresse du client"
                                            variant="outlined"
                                            type="text"
                                            name="adresse_client"
                                            value={saleForm?.adresse_client}
                                            onChange={handlerInput}
                                            size="small"
                                            fullWidth
                                            error={
                                                errorForm?.adresse_client
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errorForm?.adresse_client
                                                    ? errorForm?.adresse_client
                                                    : ""
                                            }
                                            onFocus={() => {
                                                setErrorForm({
                                                    ...errorForm,
                                                    adresse_client: "",
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <TextField
                                            id="outlined-basic"
                                            label="Numero de CNIB"
                                            variant="outlined"
                                            type="text"
                                            name="identifiant_client"
                                            value={saleForm?.identifiant_client}
                                            onChange={handlerInput}
                                            size="small"
                                            fullWidth
                                            error={
                                                errorForm?.identifiant_client
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errorForm?.identifiant_client
                                                    ? errorForm?.identifiant_client
                                                    : ""
                                            }
                                            onFocus={() => {
                                                setErrorForm({
                                                    ...errorForm,
                                                    identifiant_client: "",
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Informations de la vente
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        disabled={
                                            !commercial.current ? false : true
                                        }
                                        id="outlined-basic"
                                        label={
                                            !commercial.current
                                                ? "Commercial"
                                                : ""
                                        }
                                        variant="outlined"
                                        type="text"
                                        name="commerciale"
                                        value={commercial.current}
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        onClick={handleShowCommercial}
                                        error={
                                            errorForm?.commercial ? true : false
                                        }
                                        helperText={
                                            errorForm?.commercial
                                                ? errorForm?.commercial_id
                                                : ""
                                        }
                                        onFocus={() => {
                                            setErrorForm({
                                                ...errorForm,
                                                commercial: "",
                                            });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Montant versé"
                                        variant="outlined"
                                        type="text"
                                        name="montant_verse"
                                        value={saleForm?.montant_verse}
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        error={
                                            errorForm?.montant_verse
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errorForm?.montant_verse
                                                ? errorForm?.montant_verse
                                                : ""
                                        }
                                        onFocus={() => {
                                            setErrorForm({
                                                ...errorForm,
                                                montant_verse: "",
                                            });
                                        }}
                                    />
                                </Form.Group>
                                {parseInt(saleForm?.prix_vente) -
                                    parseInt(saleForm?.montant_verse) >
                                    0 && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <TextField
                                                id="outlined-basic"
                                                label="Montant restant"
                                                variant="outlined"
                                                type="text"
                                                name="montant_restant"
                                                value={
                                                    saleForm?.prix_vente -
                                                    saleForm?.montant_verse
                                                }
                                                onChange={handlerInput}
                                                size="small"
                                                fullWidth
                                                error={
                                                    errorForm?.montant_restant
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errorForm?.montant_restant
                                                        ? errorForm?.montant_restant
                                                        : ""
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="Date desktop"
                                                        inputFormat="MM/DD/YYYY"
                                                        value={value}
                                                        onChange={handleChange}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                            />
                                                        )}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </Form.Group>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <Card body>
                            <Button
                                disabled={isLoading}
                                variant="primary"
                                type="submit"
                            >
                                Enregistrer
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddSales;
