export const menuAdmin = [
    {
        id : 0,
        title : 'Dashboard',
        icon : () => <i class="fa-solid fa-gauge"></i>,
        link : '/admins/users',
    },
    {
        id : 1,
        header : 'Gestions',
        navItems : [
           
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
        ]
    },
   
    {
        id: 3,
        header : 'Immatriculation',
        navItems : [
            {
                id: 10,
                title : 'disponibilité',
                icon : 'fas fa-tachometer-alt',
                link : '/commercial',
            },
            {
                id: 11,
                title :  'depot',
                icon : 'fas fa-tachometer-alt',
                link : '/lot',
            },
            {
                id: 12,
                title :  'CMC',
                icon : 'fas fa-tachometer-alt',
                link : '/certificat',
            },
        ]
    },
    {
        id: 3,
        header : 'Inventaires',
        navItems : [
            {
                id: 12,
                title : 'ventes',
                icon : 'fas fa-tachometer-alt',
                link : '/commercial',
            },
            {
                id: 12,
                title :  'motos en stock',
                icon : 'fas fa-tachometer-alt',
                link : '/admin/dashboard',
            },
            {
                id: 10,
                title: 'redevabilites',
                icon : 'fas fa-tachometer-alt',
                link : '/redevabilities',

            }
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