import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconPdf } from "../icones";
import { truncate } from "lodash";
const PdfDiv = ({ texte, index }) => {
    const [more, setMore] = React.useState(false);
    return (
        <>
            <div className="d-flex flex-row shadow p-3 mb-5 bg-white rounded">
                <IconPdf width="5em" height="5em" fill="red" />
                <div
                    className="w-75"
                    onClick={() => {
                        setMore(!more);
                    }}
                >
                    <strong>
                        {more
                            ? texte?.libelle
                            : truncate(texte?.libelle, {
                                  length: 30,
                              })}
                        {"  "}
                    </strong>
                    <div className="mt-2">
                        {texte?.categories?.map((category) => (
                            <span className="badge badge-pill badge-light">
                                {category?.libelle}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <OverlayTrigger
                        placement="right"
                        delay={{
                            show: 250,
                            hide: 400,
                        }}
                        overlay={
                            <Tooltip id={`button-tooltip-${index}`}>
                                Télecharger
                            </Tooltip>
                        }
                    >
                        <Link
                            to={`/storage/${texte?.url_doc}`}
                            className="btn btn-outline-danger"
                        >
                            <i
                                className="fa fa-download fa-xl"
                                aria-hidden="true"
                            ></i>
                        </Link>
                    </OverlayTrigger>
                </div>
            </div>
        </>
    );
};

export default PdfDiv;
