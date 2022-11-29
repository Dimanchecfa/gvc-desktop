import { Card } from "@mui/material";
import React from "react";
export const PrintSales = React.forwardRef((props, ref) => {
    const { data, state } = props;
    return (
        <>
            <section className="invoice" ref={ref}>
                {/* title row */}
                <div className="row py-2">
                    <div className="col-9 offset-1">
                        <h2 className="page-header">
                            <i className="fas fa-globe" /> AdminLTE, Inc.
                            <small className="float-right">
                                Date: 2/10/2014
                            </small>
                        </h2>
                    </div>
                    {/* /.col */}
                </div>
                {/* info row */}
                <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col offset-sm-1">
                        From
                        <address>
                            <strong>Admin, Inc.</strong>
                            <br />
                            795 Folsom Ave, Suite 600
                            <br />
                            San Francisco, CA 94107
                            <br />
                            Phone: (804) 123-5432
                            <br />
                            Email: info@almasaeedstudio.com
                        </address>
                    </div>

                    {/* /.col */}
                    <div className="col-sm-4 invoice-col offset-sm-3">
                        <b>Invoice #007612</b>
                        <br />
                        <br />
                        <b>Order ID:</b> 4F3S8J
                        <br />
                        <b>Payment Due:</b> 2/22/2014
                        <br />
                        <b>Account:</b> 968-34567
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
                {/* Table row */}
                {/* /.row */}
                <div className="row">
                    {/* accepted payments column */}
                    <div className="col-6">
                        <p className="lead">Payment Methods:</p>
                        <img src="../../dist/img/credit/visa.png" alt="Visa" />
                        <img
                            src="../../dist/img/credit/mastercard.png"
                            alt="Mastercard"
                        />
                        <img
                            src="../../dist/img/credit/american-express.png"
                            alt="American Express"
                        />
                        <img
                            src="../../dist/img/credit/paypal2.png"
                            alt="Paypal"
                        />
                        <p
                            className="text-muted well well-sm shadow-none"
                            style={{ marginTop: 10 }}
                        >
                            Etsy doostang zoodles disqus groupon greplin oooj
                            voxy zoodles, weebly ning heekya handango imeem
                            plugg dopplr jibjab, movity jajah plickers sifteo
                            edmodo ifttt zimbra.
                        </p>
                    </div>
                    {/* /.col */}
                    <div className="col-6">
                        <p className="lead">Amount Due 2/22/2014</p>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "50%" }}>
                                            Subtotal:
                                        </th>
                                        <td>$250.30</td>
                                    </tr>
                                    <tr>
                                        <th>Tax (9.3%)</th>
                                        <td>$10.34</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping:</th>
                                        <td>$5.80</td>
                                    </tr>
                                    <tr>
                                        <th>Total:</th>
                                        <td>$265.24</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </section>
        </>
    );
});
