import React, { useRef } from "react";
import { Badge, Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PageHeader from "../../../../../layouts/components/page-header";
import EditModal from "../../edit";
import { PrintSales } from "../print_views";

const ShowSell = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const handleEditData = () => {
        navigate("/sales/edit", { state: data });
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Detail de la vente</Modal.Title>
                </Modal.Header>
                <div style={{ display: "none" }}>
                    <PrintSales ref={componentRef} />
                </div>
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
                                    <div class="text-center">
                                        <img
                                            class="profile-user-img img-fluid"
                                            src="/dist/img/motors/download (1).jpeg"
                                            alt="User profile picture"
                                            style={{
                                                width: "250px",
                                                height: "220px",
                                            }}
                                        />
                                    </div>

                                    <ul class="list-group list-group-bordered mt-4">
                                        <li class="list-group-item">
                                            <b>Numero de serie</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.moto?.numero_serie}
                                            </a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Marque</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.moto?.marque}
                                            </a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Modele</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.moto?.modele}
                                            </a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Couleur</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.moto?.couleur}
                                            </a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Prix</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.prix_vente}
                                            </a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>CMC</b>{" "}
                                            <a class="text-muted float-right text-bold">
                                                {data?.is_certificat ? (
                                                    <Badge variant="success">
                                                        Oui
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="danger">
                                                        Non
                                                    </Badge>
                                                )}
                                            </a>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={8} sm={12} xs={12}>
                            <Row>
                                <Col md={12} sm={12} xs={12}>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title as="h5">
                                                Informations de la vente
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <ul class="list-group list-group-bordered">
                                                <li class="list-group-item">
                                                    <b>Numero de facture</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.numero_facture}
                                                    </a>
                                                </li>
                                                <li class="list-group-item ">
                                                    <b>Nom du client</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.nom_client}
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Numero du client</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.numero_client}
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Adresse du client</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.adresse_client}
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Numero de CNIB</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {
                                                            data?.identifiant_client
                                                        }
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>
                                                        Statut immatriculation
                                                    </b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.registration_statut ==
                                                        "pas_enregistre" ? (
                                                            <Badge variant="success">
                                                                non enregistré
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="danger">
                                                                {
                                                                    data?.registration_statut
                                                                }
                                                            </Badge>
                                                        )}
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Statut</b>{" "}
                                                    <a
                                                        class="text-muted float-right text-bold"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    >
                                                        <Badge variant="danger">
                                                            {
                                                                data?.statut_payement
                                                            }
                                                        </Badge>
                                                    </a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Montant versee</b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {data?.montant_verse}
                                                    </a>
                                                </li>
                                                {data?.statut ===
                                                    "en_cours" && (
                                                    <>
                                                        <li class="list-group-item">
                                                            <b>
                                                                Montant restant
                                                            </b>{" "}
                                                            <a class="text-muted float-right text-bold">
                                                                {
                                                                    data?.montant_restant
                                                                }
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <b>
                                                                Limite de
                                                                paiement
                                                            </b>{" "}
                                                            <a class="text-muted float-right text-bold">
                                                                {
                                                                    data?.date_versement
                                                                }
                                                            </a>
                                                        </li>
                                                    </>
                                                )}
                                                <li class="list-group-item">
                                                    <b>
                                                        Commercial responsable
                                                    </b>{" "}
                                                    <a class="text-muted float-right text-bold">
                                                        {
                                                            data?.commerciale
                                                                ?.pseudo
                                                        }
                                                    </a>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleEditData}>
                        Modifier
                    </Button>
                    <Button variant="danger" onClick={handlePrint}>
                        Imprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowSell;
