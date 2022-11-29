import React, { useRef } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PageHeader from "../../../../layouts/components/page-header";

const Print = React.forwardRef((props, ref) => {
    const { data, state } = props;
    return (
        <>
            <Row>
                <Col md={10} className="offset-md-1">
                    <Card body ref={ref} style={{ padding: "30px" }}>
                        <Row style={{ height: "150px" }}>
                            <Col md={6}>
                                <h5>
                                    Nom du depositaire :{" "}
                                    <strong>{state?.nom_depositaire}</strong>
                                </h5>
                                <h5>
                                    Numero du depositaire :{" "}
                                    <strong>{state?.numero_depositaire}</strong>
                                </h5>
                            </Col>
                            <Col md={6}>
                                <h5>
                                    Numero du lot :{" "}
                                    <strong>{state?.numero_lot}</strong>
                                </h5>
                                <h5>
                                    Nombre d'immatriculation :{" "}
                                    <strong>{data.length}</strong>
                                </h5>
                                <h5>
                                    Date du depot :{" "}
                                    <strong>{state?.date_depot}</strong>
                                </h5>
                            </Col>
                        </Row>
                        <Table striped bordered hover body>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom du client</th>
                                    <th>Numero du client</th>
                                    <th>Numero CNIB</th>
                                    <th>Numero de serie</th>
                                    <th>Marque</th>
                                    <th>Modele</th>
                                    <th>Couleur</th>
                                    {/* <th>Commerciale</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row?.sales?.nom_client}</td>
                                        <td>{row?.sales?.numero_client}</td>
                                        <td>
                                            {row?.sales?.identifiant_client}
                                        </td>
                                        <td>
                                            {row?.sales?.moto?.numero_serie}
                                        </td>
                                        <td>{row?.sales?.moto?.marque}</td>
                                        <td>{row?.sales?.moto?.modele}</td>
                                        <td>{row?.sales?.moto?.couleur}</td>
                                        {/* <td>
                                            {row?.sales?.commerciale?.pseudo}
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Row style={{ marginTop: "50px" }}>
                            <Col md={6} className="offset-md-6">
                                <h5>
                                    Signature du depositaire :{" "}
                                    <strong>____________________</strong>
                                </h5>
                            </Col>
                        </Row>
                    </Card>{" "}
                </Col>
            </Row>
        </>
    );
});

export default Print;
