import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registeredWithdraw } from "../../../../../api/request";
import {
    errorNotif,
    successNotif,
} from "../../../../../components/notification";

const WithdrawModal = ({ show, handleClose, registration_id, cb }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [form, setForm] = React.useState({
        withdrawal_authorName: "",
        withdrawal_authorNumber: "",
        withdrawal_authorId: "",
    });
    const [errorForm, setErrorForm] = React.useState({});

    const handlerInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async () => {
        if (
            !form.withdrawal_authorName ||
            !form.withdrawal_authorNumber ||
            !form.withdrawal_authorId
        ) {
            setErrorForm({
                withdrawal_authorName: !form.withdrawal_authorName
                    ? "Ce champ est obligatoire"
                    : "",
                withdrawal_authorNumber: !form.withdrawal_authorNumber
                    ? "Ce champ est obligatoire"
                    : "",
                withdrawal_authorId: !form.withdrawal_authorId
                    ? "Ce champ est obligatoire"
                    : "",
            });
            return;
        }

        try {
            const response = await registeredWithdraw(registration_id, form);
            if (response?.data?.success) {
                cb();
                successNotif("Immatriculation retirée avec succès");
                setForm({
                    withdrawal_authorName: "",
                    withdrawal_authorNumber: "",
                    withdrawal_authorId: "",
                });
            }
        } catch (error) {
            console.log(error);
            errorNotif("Avertissement", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Nom"
                                type="text"
                                name="withdrawal_authorName"
                                onChange={handlerInput}
                                value={form.withdrawal_authorName}
                                size="small"
                                fullWidth
                                aria-readonly={false}
                                error={!!errorForm?.withdrawal_authorName}
                                helperText={errorForm?.withdrawal_authorName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Numero de telephone"
                                type="text"
                                name="withdrawal_authorNumber"
                                onChange={handlerInput}
                                value={form.withdrawal_authorNumber}
                                size="small"
                                fullWidth
                                aria-readonly={false}
                                error={!!errorForm?.withdrawal_authorNumber}
                                helperText={errorForm?.withdrawal_authorNumber}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Numero de CNI"
                                type="text"
                                name="withdrawal_authorId"
                                onChange={handlerInput}
                                value={form.withdrawal_authorId}
                                size="small"
                                fullWidth
                                aria-readonly={false}
                                error={!!errorForm?.withdrawal_authorId}
                                helperText={errorForm?.withdrawal_authorId}
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

export default WithdrawModal;
