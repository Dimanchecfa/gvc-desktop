import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DropFileImage from "../../../../components/drop-file-image";
import PageHeader from "../../../../layouts/components/page-header";

const AddCommercial = () => {
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [dataValue, setDataValue] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const onUpdateInput = (e) => {
        const target = e?.target;
        setIsUpdate(true);
        setDataValue(target?.value);
    };
    const handlerInput = (e) => {
        e.preventDefault();
        const target = e?.target;
        const name = target?.name;
        const value = target?.value;
        setForm({ ...form, [name]: value });
    };

    const [form, setForm] = useState({
        nom: state?.nom,
        prenom: state?.prenom,
        pseudo: state?.pseudo,
        numero: state?.numero,
        numero2: state?.numero2,
        logo: "",
    });
    const [errorForm, setErrorForm] = useState({});

    return (
        <>
            <PageHeader title="Modifier un commercial"></PageHeader>
            <Row>
                <Col md={5} sm={12} xs={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">
                                Informations du commerciale
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="form theme-form">
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Nom"
                                        variant="outlined"
                                        type="text"
                                        value={form.nom}
                                        name="nom"
                                        onChange={handlerInput}
                                        placeholder="Nom"
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Prenom"
                                        variant="outlined"
                                        type="text"
                                        value={form.prenom}
                                        placeholder="Prenom"
                                        onChange={handlerInput}
                                        name="prenom"
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero de telephone"
                                        variant="outlined"
                                        type="text"
                                        value={form.telephone}
                                        placeholder="Numero de telephone"
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Deuxieme numero de telephone"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero2}
                                        placeholder="Deuxieme numero de telephone"
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero CNIB"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero_cnib}
                                        placeholder="Nom"
                                        onChange=""
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero IFU"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero_ifu}
                                        placeholder="Numero IFU"
                                        onChange=""
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                            </Form>
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
                            <Form className="form theme-form">
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Pseudo"
                                        variant="outlined"
                                        type="text"
                                        value=""
                                        placeholder="Pseudo"
                                        onChange=""
                                        size="small"
                                        fullWidth
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Adresse"
                                        variant="outlined"
                                        type="text"
                                        value=""
                                        placeholder="Prenom"
                                        onChange=""
                                        size="small"
                                        fullWidth
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
                                            console.log(
                                                files[files?.length - 1 ?? 0]
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Form>
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
        </>
    );
};

export default AddCommercial;
