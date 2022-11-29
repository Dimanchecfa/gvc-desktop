import {
    AvailableIcon,
    CertificateIcon,
    CommercialIcon,
    DashboardIcon,
    DepositIcon,
    IconHome,
    MotorsIcon,
    RedevabilityIcon,
    SalesIcon,
    StorageIcon,
} from "../../components/icones";

export const menuAdmin = [
    {
        id: 0,
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/admins/users",
    },
    {
        id: 1,
        header: "Gestions",
        navItems: [
            {
                id: 2,
                title: "Gestion des stocks",
                icon: (
                    <StorageIcon
                        width={18}
                        height={18}
                        className="mr-2 mb-1"
                        fill="#fff"
                    />
                ),
                link: "/stock",
            },
            {
                id: 3,
                title: "Gestion de vente",
                icon: (
                    <SalesIcon
                        width={22}
                        height={22}
                        className="mr-2 mb-2"
                        fill="#fff"
                    />
                ),
                link: "/sales",
            },
        ],
    },

    {
        id: 3,
        header: "Immatriculation",
        navItems: [
            {
                id: 10,
                title: "disponibilité",
                icon: (
                    <AvailableIcon
                        width={24}
                        height={24}
                        fill="#fff"
                        className="mr-2 mb-1"
                    />
                ),
                link: "/available",
            },
            {
                id: 11,
                title: "depot",
                icon: (
                    <DepositIcon
                        width={22}
                        height={22}
                        fill="#fff"
                        className="mr-2"
                    />
                ),
                link: "/lot",
            },
            {
                id: 12,
                title: "Certificat",
                icon: (
                    <CertificateIcon
                        width={22}
                        height={22}
                        fill="#fff"
                        className="mr-2"
                    />
                ),
                link: "/certificate",
            },
        ],
    },
    {
        id: 3,
        header: "Inventaires",
        navItems: [
            {
                id: 13,
                title: "ventes",
                icon: (
                    <SalesIcon
                        width={22}
                        height={22}
                        fill="#fff"
                        className="mr-2 mb-1"
                    />
                ),
                link: "/commercial",
            },
            {
                id: 14,
                title: "motos en stock",
                icon: (
                    <MotorsIcon
                        width={22}
                        height={22}
                        fill="#fff"
                        className="mr-2"
                    />
                ),
                link: "/motors/stocked",
            },
            {
                id: 15,
                title: "redevabilites",
                icon: (
                    <RedevabilityIcon
                        width={22}
                        height={22}
                        fill="#fff"
                        className="mr-2"
                    />
                ),
                link: "/redevabilities",
            },
        ],
    },
    {
        id: 2,
        header: "Parametres",
        navItems: [
            {
                id: 16,
                title: "commerciaux",
                icon: <CommercialIcon width={22} height={22} fill="#fff" />,
                link: "/commercial",
            },
            {
                id: 17,
                title: "emgins",
                icon: "fas fa-tachometer-alt",
                link: "/admin/dashboardh",
            },
        ],
    },
];
