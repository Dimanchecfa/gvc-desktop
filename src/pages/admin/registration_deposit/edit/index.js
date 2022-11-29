import { TextField } from "@mui/material";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editLot } from "../../../../api/request";
import { BackButton } from "../../../../components/back-button";
import { successNotif } from "../../../../components/notification";
import PageHeader from "../../../../layouts/components/page-header";

const EditLot = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { state } = useLocation();
    console.log(state);
    const [form, setForm] = React.useState({
        numero_lot: state?.numero_lot,
        nom_depositaire: state?.nom_depositaire,
        numero_depositaire: state?.numero_depositaire,
    });
    const [errorForm, setErrorForm] = React.useState({});
    const handlerInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target?.value;
        const name = target?.name;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const onSubmit = async () => {
        if (!form.nom_depositaire || !form.numero_depositaire) {
            setErrorForm({
                numero_lot: !form.numero_lot ? "ce champ est obligatoire" : "",
                nom_depositaire: !form.nom_depositaire
                    ? "ce champ est obligatoire"
                    : "",
                numero_depositaire: !form.numero_depositaire
                    ? "ce champ est obligatoire"
                    : "",
            });
            return;
        }
        try {
            const response = await editLot(state?.uuid, form);
            const dataReceive = response?.data?.data;
            if (response?.status === 200) {
                successNotif("Modification effectuée avec succès");
                navigate("/lot/details", { state: dataReceive });
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <PageHeader title="Ajouter un lot">
                <div className="col-md-12">
                    <BackButton />
                </div>
            </PageHeader>
            <Row>
                <Col md={8} sm={12} xs={12}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Ajouter un stock
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numéro du lot"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero_lot}
                                        name="numero_lot"
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        onFocus={() =>
                                            setErrorForm({
                                                ...errorForm,
                                                numero_lot: "",
                                            })
                                        }
                                        error={!!errorForm.nom_fournisseur}
                                        helperText={errorForm.nom_fournisseur}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Nom du depositaire"
                                        variant="outlined"
                                        type="text"
                                        value={form.nom_depositaire}
                                        name="nom_depositaire"
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        onFocus={() =>
                                            setErrorForm({
                                                ...errorForm,
                                                nom_depositaire: "",
                                            })
                                        }
                                        error={!!errorForm.nom_fournisseur}
                                        helperText={errorForm.nom_fournisseur}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero du depositaire"
                                        variant="outlined"
                                        type="text"
                                        value={form.numero_depositaire}
                                        name="numero_fournisseur"
                                        onChange={handlerInput}
                                        size="small"
                                        fullWidth
                                        onFocus={() =>
                                            setErrorForm({
                                                ...errorForm,
                                                numero_depositaire: "",
                                            })
                                        }
                                        error={!!errorForm.numero_depositaire}
                                        helperText={
                                            errorForm.numero_depositaire
                                        }
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

export default EditLot;
