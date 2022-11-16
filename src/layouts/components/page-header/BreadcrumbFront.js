import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HANDLER_STORAGE from "../../../data";
import { USER_SESSION } from "../../../utilities/constant/app.constant";
import formatItemName from "./formatItemName";

const BreadcrumbFront = ({children, title}) => {
    const location = useLocation();
    const user = HANDLER_STORAGE.GET(USER_SESSION, 'object')?.data ?? null;

    const [urlPaths, setUrlPaths] = useState([]);


    useEffect(() => {
        if(location?.pathname) {
            let paths = location.pathname.split('/');
            paths = paths ?
                paths?.filter(path => path !== '' && path !== 'accounts' && path !== 'handlers') ?? []
                : [];
            setUrlPaths(paths);
        }
    }, [location?.pathname])
    return (
        <Fragment>
            <div className="page-header">
                <div>
                    <h1 className="page-title">{title}</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={'/'}><i className="zmdi zmdi-home zmdi-hc-lg"></i></Link>
                        </li>
                        {(urlPaths?.length > 1 ? urlPaths : [])?.map((urlPath, index) =>
                            index !== urlPaths.length-1 ? (
                                <li key={index} className="breadcrumb-item">
                                    <Link to={`#`}>{formatItemName(urlPath?.trim())}</Link>
                                </li>
                            ) : ''
                        )}
                        {(urlPaths?.length > 0 ? true : null) ? (
                            <li className="breadcrumb-item active" aria-current="page">
                                {formatItemName(urlPaths[urlPaths.length-1]?.trim())}
                            </li>
                        ) : null}
                    </ol>
                </div>
            </div>
        </Fragment>
    );
};

export default BreadcrumbFront;
