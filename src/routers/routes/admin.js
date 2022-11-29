import { lazy } from "react";
import { AuthGuard } from "../components/AuthGuard";

export const AdminRoutes = [
    {
        path: "/stock",
        component: lazy(() => import("../../pages/admin/Stock/all")),
        exact: true,
        layout: "Admin",
        isIndex: true,
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/stock/add",
        component: lazy(() => import("../../pages/admin/Stock/add")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/stock/details",
        component: lazy(() => import("../../pages/admin/Stock/show")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/stock/edit",
        component: lazy(() => import("../../pages/admin/Stock/edit")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/motors/add",
        component: lazy(() => import("../../pages/admin/Motors/add")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/motors/edit",
        component: lazy(() => import("../../pages/admin/Motors/edit")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/sales",
        component: lazy(() => import("../../pages/admin/Sell/all")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/sales/add",
        component: lazy(() => import("../../pages/admin/Sell/add")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/commercial",
        component: lazy(() => import("../../pages/admin/commercial/all")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/commercial/add",
        component: lazy(() => import("../../pages/admin/commercial/add")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/lot",
        component: lazy(() =>
            import("../../pages/admin/registration_deposit/all")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/lot/add",
        component: lazy(() =>
            import("../../pages/admin/registration_deposit/add")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/lot/details",
        component: lazy(() =>
            import("../../pages/admin/registration_deposit/show")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/lot/details",
        component: lazy(() =>
            import("../../pages/admin/registration_deposit/show")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/lot/edit",
        component: lazy(() =>
            import("../../pages/admin/registration_deposit/edit")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/redevabilities",
        component: lazy(() => import("../../pages/admin/redevability/all")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/sales/edit",
        component: lazy(() => import("../../pages/admin/Sell/edit")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/motors/stocked",
        component: lazy(() =>
            import("../../pages/admin/history/motors_stocked")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/available",
        component: lazy(() =>
            import("../../pages/admin/registration/available")
        ),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "/certificate",
        component: lazy(() => import("../../pages/admin/certificat/all")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
    {
        path: "*",
        component: lazy(() => import("../../pages/admin/404")),
        exact: true,
        layout: "Admin",
        permissions: ["admin"],
        guard: AuthGuard,
    },
];
