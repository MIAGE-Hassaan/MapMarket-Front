const mysql = require('mysql2');

// Configuration de la connexion
const connection = mysql.createConnection({
    host: 'localhost:3306', // ou 127.0.0.1
    user: 'root', // Nom d'utilisateur par défaut sous Laragon
    password: '',
    database: 'MapMarket'
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion : ' + err.stack);
        return;
    }
    console.log('Connecté à MySQL avec l’ID ' + connection.threadId);
});

// Exporter la connexion pour l'utiliser ailleurs
module.exports = connection;
