const bd = require('./BD');

// Exemple : Sélectionner des données
bd.query('SELECT * FROM users_basics', (err, results) => {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
    }
    bd.end(); // Fermer la connexion après usage
});