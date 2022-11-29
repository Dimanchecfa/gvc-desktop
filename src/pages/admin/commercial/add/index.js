import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCommercial } from "../../../../api/request";
import { BackButton } from "../../../../components/back-button";
import DropFileImage from "../../../../components/drop-file-image";
import { successNotif } from "../../../../components/notification";
import PageHeader from "../../../../layouts/components/page-header";

const AddCommercial = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [dataValue, setDataValue] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        numero: "",
        numero2: "",
        identifiant: "",
        numero_ifu: "",
        pseudo: "",
        adresse: "",
        logo: "",
    });
    const [errorForm, setErrorForm] = useState({});
    const handleInput = (e) => {
        const target = e?.target;
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };
    const navigate = useNavigate();
    const onUpdateInput = (e) => {
        const target = e?.target;
        console.log(e);
        setIsUpdate(true);
        setDataValue(e);
    };

    const onSubmit = async () => {
        if (
            !form.nom ||
            !form.prenom ||
            !form.numero ||
            !form.numero2 ||
            !form.identifiant ||
            !form.numero_ifu ||
            !form.pseudo ||
            !form.adresse
        ) {
            console.log("error");
            setErrorForm({
                nom: !form.nom ? "ce champ est obligatoire" : "",
                prenom: !form.prenom ? "ce champ est obligatoire" : "",
                numero: !form.numero ? "ce champ est obligatoire" : "",
                numero2: !form.numero2 ? "ce champ est obligatoire" : "",
                identifiant: !form.identifiant
                    ? "ce champ est obligatoire"
                    : "",
                numero_ifu: !form.numero_ifu ? "ce champ est obligatoire" : "",
                pseudo: !form.pseudo ? "ce champ est obligatoire" : "",
                adresse: !form.adresse ? "ce champ est obligatoire" : "",
            });

            return;
        }
        console.log(form);
        try {
            const response = await addCommercial(form);
            if (response.status === 200) {
                console.log(response);
                successNotif("Ajout effectué avec succès");
                navigate("/commercial");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <PageHeader title="Ajouter un commercial">
                <div className="offset-sm-10 col-sm-9">
                    <BackButton />
                </div>
            </PageHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={5} sm={12} xs={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Informations du commerciale
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Nom"
                                        variant="outlined"
                                        type="text"
                                        value={form.nom}
                                        name="nom"
                                        placeholder="Nom"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        onFocus={() => {
                                            console.log("focus");
                                        }}
                                        error={!!errorForm.nom}
                                        helperText={errorForm.nom}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Prenom"
                                        variant="outlined"
                                        type="text"
                                        value={form.prenom}
                                        name="prenom"
                                        placeholder="Prenom"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.prenom}
                                        helperText={errorForm.prenom}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero de telephone"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero}
                                        name="numero"
                                        placeholder="Numero de telephone"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.numero}
                                        helperText={errorForm.numero}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Deuxieme numero de telephone"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero2}
                                        name="numero2"
                                        placeholder="Deuxieme numero de telephone"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.numero2}
                                        helperText={errorForm.numero2}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero CNIB"
                                        variant="outlined"
                                        type="text"
                                        value={form.identifiant}
                                        placeholder="Nom"
                                        onChange={handleInput}
                                        name="identifiant"
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.identifiant}
                                        helperText={errorForm.identifiant}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero IFU"
                                        variant="outlined"
                                        type="text"
                                        name="numero_ifu"
                                        value={form.numero_ifu}
                                        placeholder="Numero IFU"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.numero_ifu}
                                        helperText={errorForm.numero_ifu}
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5} sm={12} xs={12} className="offset-md-1">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Informations du commerciale
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Pseudo"
                                        variant="outlined"
                                        type="text"
                                        value={form.pseudo}
                                        name="pseudo"
                                        placeholder="Pseudo"
                                        onChange={handleInput}
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.pseudo}
                                        helperText={errorForm.pseudo}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Adresse"
                                        variant="outlined"
                                        type="text"
                                        value={form.adresse}
                                        placeholder="Prenom"
                                        onChange={handleInput}
                                        name="adresse"
                                        size="small"
                                        fullWidth
                                        error={!!errorForm.adresse}
                                        helperText={errorForm.adresse}
                                    />
                                </Form.Group>
                                <Form.Group className="mt">
                                    <Form.Label>Photo</Form.Label>
                                    <DropFileImage
                                        maxFiles={1}
                                        images={
                                            Object.keys(dataValue ?? {})
                                                .length === 0
                                                ? []
                                                : [dataValue]
                                        }
                                        imageUplaod={(files) => {
                                            onUpdateInput(
                                                files[files?.length - 1 ?? 0]
                                            );
                                            setForm({
                                                ...form,
                                                logo: files[
                                                    files?.length - 1 ?? 0
                                                ],
                                            });
                                        }}
                                        preview={true}
                                    />
                                </Form.Group>
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

export default AddCommercial;
