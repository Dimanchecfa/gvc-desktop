import { TextField } from "@mui/material";
import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AddMotorData } from "../../../../api/request";
import { setMoto } from "../../../../app/slices/stock.slices";
import { BackButton } from "../../../../components/back-button";
import { successNotif } from "../../../../components/notification";
import PageHeader from "../../../../layouts/components/page-header";

const AddMotors = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const Id = useRef(state?.id);
    console.log(Id.current);
    const [isLoading, setIsLoading] = React.useState(false);
    const [form, setForm] = React.useState({
        numero_serie: "",
        marque: "",
        modele: "",
        couleur: "",
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
        setErrorForm({});
        setIsLoading(true);

        if (
            !form.numero_serie ||
            !form.marque ||
            !form.modele ||
            !form.couleur
        ) {
            setErrorForm({
                numero_serie: !form.numero_serie
                    ? "ce champ est obligatoire"
                    : "",
                marque: !form.marque ? "ce champ est obligatoire" : "",
                modele: !form.modele ? "ce champ est obligatoire" : "",
                couleur: !form.couleur ? "ce champ est obligatoire" : "",
            });
            setIsLoading(false);
            return;
        }
        try {
            const response = await AddMotorData(Id.current, form);
            if (response.status === 200) {
                successNotif("Moteur ajouté avec succès");
                setForm({
                    numero_serie: "",
                    marque: "",
                    modele: "",
                    couleur: "",
                });
                dispatch(setMoto(response.data?.data?.moto));
                console.log(response.data);
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };
    return (
        <>
            <PageHeader title="Ajouter une moto">
                <div className="offset-sm-10 col-sm-9">
                    <Button
                        variant="dark"
                        onClick={() =>
                            navigate("/stock/details", { state: state })
                        }
                    >
                        <i className="fa fa-arrow-left"></i> Retour
                    </Button>
                </div>
            </PageHeader>
            <Row>
                <Col md={8} sm={12} xs={12}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">
                                    Ajouter un moteur
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <TextField
                                        id="outlined-basic"
                                        label="Numero de serie"
                                        variant="outlined"
                                        type="text"
                                        name="numero_serie"
                                        disabled={isLoading}
                                        value={form.numero_serie}
                                        placeholder="Nom du moteur"
                                        onChange={handlerInput}
                                        error={errorForm.numero_serie}
                                        helperText={errorForm.numero_serie}
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
                                        disabled={isLoading}
                                        error={errorForm.marque}
                                        helperText={errorForm.marque}
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
                                        disabled={isLoading}
                                        error={errorForm.modele}
                                        helperText={errorForm.modele}
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
                                        disabled={isLoading}
                                        error={errorForm.couleur}
                                        helperText={errorForm.couleur}
                                        size="small"
                                        fullWidth
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

export default AddMotors;
