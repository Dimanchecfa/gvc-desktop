const formatItemName = (name) => {
    switch (name) {
        case 'about':
            return 'A propos';
        case 'abouts':
            return 'A propos';
        case 'access':
            return 'identifiants';
        case 'account-users':
            return 'compte usagers';
        case 'account-admins':
            return 'compte administrateurs';
        case 'admin':
            return 'administrateur';
        case 'admins':
            return 'administrateurs';
        case 'add':
            return 'ajout';
        case 'baskets':
            return "Facture d'achat";
        case 'edit':
            return 'édition';
        case 'newspapers':
            return 'journaux';
        case 'show':
            return 'détail';
        case 'subscription':
            return 'abonnements';
        case 'user':
            return 'utilisateur';
        case 'users':
            return 'utilisateurs';
        case 'publishs':
            return 'insertion';
        case 'regulatory-texts':
            return 'textes règlémentaires';
        case 'resources':
            return 'ressources';
        case 'jo-id':
            return 'a propos du journal officiel';
        case 'jo-social':
            return 'réseau social du journal officiel';
        case 'jo-prix':
            return 'prix unitaire du journal officiel';
        case 'jo-means-payment':
            return 'moyen de paiement';
        default:
            return `${name}`;
    }
}

export default formatItemName;
