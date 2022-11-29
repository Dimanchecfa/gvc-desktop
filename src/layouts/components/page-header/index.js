import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import HANDLER_STORAGE from "../../../data";
import { USER_SESSION } from "../../../utilities/constant/app.constant";
import formatItemName from "./formatItemName";

const PageHeader = ({ children, title }) => {
  const location = useLocation();
  const user = HANDLER_STORAGE.GET(USER_SESSION, "object")?.data ?? null;

  const [urlPaths, setUrlPaths] = useState([]);

  useEffect(() => {
    if (location?.pathname) {
      let paths = location.pathname.split("/");
      paths = paths
        ? paths?.filter((path) => path !== "" && path !== "handlers") ?? []
        : [];
      setUrlPaths(paths);
    }
  }, [location?.pathname]);
  return (
    <Fragment>
      {/* <div className="page-header">
                <div>
                    <h1 className="page-title">{title}</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link
                                to={`${
                                    user?.role === "user" ? "/users" : "/admins"
                                }`}
                            >
                                <i className="zmdi zmdi-home zmdi-hc-lg"></i>
                            </Link>
                        </li>
                        {routes?.length > 0 ? (
                            routes.map((route, index) => (
                                <li key={index} className="breadcrumb-item">
                                    <Link
                                        to={route?.path}
                                        className={route?.className}
                                    >
                                        {route?.name}
                                    </Link>
                                </li>
                            ))
                        ) : (urlPaths[urlPaths.length - 1] !== "users" ||
                              urlPaths[urlPaths.length - 1] !== "admins") &&
                          urlPaths.length >= 1 ? (
                            <>
                                {(urlPaths?.length > 1 ? urlPaths : [])?.map(
                                    (urlPath, index) =>
                                        index !== urlPaths.length - 1 ? (
                                            <li
                                                key={index}
                                                className="breadcrumb-item"
                                            >
                                                <Link to={`#`}>
                                                    {formatItemName(
                                                        urlPath?.trim()
                                                    )}
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )
                                )}
                                {(urlPaths?.length > 0 ? true : null) ? (
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        {formatItemName(
                                            urlPaths[
                                                urlPaths.length - 1
                                            ]?.trim()
                                        )}
                                    </li>
                                ) : null}
                            </>
                        ) : null}
                    </ol>
                </div>
                <div className="ml-auto pageheader-btn">{children}</div>
            </div> */}
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-4">
              <h1>{title}</h1>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to={"/"}>
                    <li class="">Home</li>
                  </Link>
                </li>
                {(urlPaths?.length > 1 ? urlPaths : [])?.map((urlPath, index) =>
                  index !== urlPaths.length - 1 ? (
                    <li key={index} className="breadcrumb-item">
                      <Link to={`#`}>{formatItemName(urlPath?.trim())}</Link>
                    </li>
                  ) : (
                    ""
                  )
                )}
                {(urlPaths?.length > 0 ? true : null) ? (
                  <li className="breadcrumb-item active" aria-current="page">
                    {formatItemName(urlPaths[urlPaths.length - 1]?.trim())}
                  </li>
                ) : null}
              </ol>
            </div>
            <div class="col-sm-8">{children}</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PageHeader;
