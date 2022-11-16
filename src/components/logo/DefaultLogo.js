import React, { Fragment } from 'react';
import logo from '../../assets/images/logo/logo-3.png'

function DefaultLogo() {
    return (
        <Fragment>
            <img src={logo} className="header-brand-img" alt="" />
        </Fragment>
    );
}

export default DefaultLogo;
