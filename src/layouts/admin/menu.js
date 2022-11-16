export const menuAdmin = [
    {
        id : 1,
        header : 'Gestions',
        navItems : [
            {
                id : 1,
                title : 'Dashboard',
                icon : () => <i class="fa-solid fa-gauge"></i>,
                link : '/admins/users',
            },
            {
                id: 2,
                title : 'Gestion des stocks',
                icon : () => <i class="fa-solid fa-boxes"></i>,
                link : '/stock',
            },
            {
                id: 3,
                title : 'Gestion de vente',
                icon : 'fas fa-tachometer-alt',
                link : '/sales',
            },
            {
                id: 4,
                title : 'Gestion d\'immatriulation',
                icon : 'fas fa-tachometer-alt',
                link : '/registration',
            },
            {
                id: 5,
                title : 'Gestion des cycles',
                icon : 'fas fa-tachometer-alt',
                link : '/admin/dashboard',
        
            },
            {
                id: 6,
                title : 'Redevabilites',
                icon : 'fas fa-tachometer-alt',
                link : '/admin/dashboard',
            },
            {
                id: 7,
                title : 'Inventaites',
                icon : 'fas fa-tachometer-alt',
                link : '/admin/dashboard',
            },
        ]
    },
    {
        id: 2,
        header : 'Parametres',
        navItems : [
            {
                id: 8,
                title : 'commerciaux',
                icon : 'fas fa-tachometer-alt',
                link : '/commercial',
            },
            {
                id: 9,
                title :  'marques',
                icon : 'fas fa-tachometer-alt',
                link : '/admin/dashboard',
            },
        ]
    },

]