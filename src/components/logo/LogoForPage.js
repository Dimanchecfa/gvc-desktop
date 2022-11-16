import React, { Fragment } from 'react';
import logo from '../../assets/images/logo/armoiries.png'
import logoBg from '../../assets/images/logo/armoiries-bg.png'

function LogoForPage({withoutBg}) {
    return (
        <Fragment>
            <img src={withoutBg ? logo : logoBg} className="header-brand-img" alt="" />
        </Fragment>
    );
}

export default LogoForPage;
