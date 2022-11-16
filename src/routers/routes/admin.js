import { lazy } from "react";
import { AuthGuard } from "../components/AuthGuard";

export const AdminRoutes = [
    {
        path: '/stock',
        component: lazy(() => import('../../pages/admin/Stock/all')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    {
        path: '/stock/details',
        component: lazy(() => import('../../pages/admin/Stock/show')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    {
        path: '/sales',
        component: lazy(() => import('../../pages/admin/Sell/all')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    {
        path: '/sales/add',
        component: lazy(() => import('../../pages/admin/Sell/add')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    {
        path: '/commercial',
        component: lazy(() => import('../../pages/admin/commercial/all')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    {
        path: '/commercial/add',
        component: lazy(() => import('../../pages/admin/commercial/add')),
        exact : true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard
    },
    
]