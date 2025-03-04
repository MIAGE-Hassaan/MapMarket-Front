const mysql = require('mysql');

// Connexion à la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'testtest',
    database: 'mapmarket'
};

// Fonction pour récupérer les utilisateurs
async function getAllUsers() {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users_basics');
    await connection.end();
    return rows;
}

// Fonction pour supprimer un utilisateur
async function deleteUser(id) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('DELETE FROM users_basics WHERE user_id = id');
    await connection.end();
    return rows;
}

// Fonction pour ajouter un utilisateur
async function addUser(nom, prenom, email, pwd) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('INSERT INTO users_basics (nom, prenom, email, password) values(nom, prenom, email, pwd;)');
    await connection.end();
    return rows;
}

module.exports = { getAllUsers, deleteUser, addUser };