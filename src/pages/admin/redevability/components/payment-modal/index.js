import { TextField } from "@mui/material";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updatePayment } from "../../../../../api/request";
import { successNotif } from "../../../../../components/notification";

const PaymentModal = ({ show, handleClose, data }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [form, setForm] = React.useState({
        montant_a_payer: "",
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
        if (!form.montant_a_payer) {
            setErrorForm({
                montant_a_payer: !form.montant_a_payer
                    ? "ce champ est obligatoire"
                    : "",
            });
            return;
        }
        try {
            const response = await updatePayment(data?.id, form);
            if (response?.status === 200) {
                handleClose();
                successNotif("Succès", "Opération effectuée avec succès");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Solder le paiement de l'engin</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Prix de l'engin (en F CFA)</Form.Label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={data?.prix_vente}
                                disabled
                                fullWidth
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Montant restant à payer (en F CFA)
                            </Form.Label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="text"
                                size="small"
                                disabled
                                value={data?.montant_restant}
                                fullWidth
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Montant a payer"
                                variant="outlined"
                                type="text"
                                name="montant_a_payer"
                                onChange={handlerInput}
                                value={form.montant_a_payer}
                                size="small"
                                fullWidth
                                error={!!errorForm.montant_a_payer}
                                helperText={errorForm.montant_a_payer}
                                onFocus={() =>
                                    setErrorForm({
                                        ...errorForm,
                                        montant_a_payer: "",
                                    })
                                }
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit">
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default PaymentModal;
