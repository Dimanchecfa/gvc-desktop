import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AdminLayout from '../../layouts/admin';
import BlankLayout from '../../layouts/blank';
import useAuth from '../../utilities/hook/useAuth';
import { useAuthorized } from '../hooks/useAuthorized';

const Layouts = {
    Admin: AdminLayout,
};
function Render({roles, layout, page}) {
    const auth = useAuth();
    const location = useLocation();
    const authorized = useAuthorized(roles ?? [], auth?.user ?? {});

    const RouteLayout = layout ? Layouts[`${layout}`] : BlankLayout;
    const ComponentPage = page;

    if (auth?.user?.token && !authorized) {
        return <Navigate to={"/unauthorize"} state={{ from: location }} replace />;
    }
    return (
        <RouteLayout>
            <ComponentPage />
        </RouteLayout>
    );
}

export default Render;