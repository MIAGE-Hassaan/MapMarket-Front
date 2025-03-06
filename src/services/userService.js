const bd = require('./BD');

// Fonction pour récupérer les utilisateurs
/*async function getAllUsers() {
    const connection = await bd.connectbd;
    const [rows] = await connection.execute('SELECT * FROM users_basics');
    await connection.end();
    return rows;
}*/

async function getAllUsers() {
    try {
        const [rows] = await bd.promise().query('SELECT * FROM users_basics'); // Utilisation de .promise() pour avoir une promesse
        console.log(rows);
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
    } finally {
        bd.end(); // Assure-toi de fermer la connexion après usage
    }
}
getAllUsers();

/*
// Fonction pour supprimer un utilisateur
async function deleteUser(id) {
    const connection = connectBD();
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
*/
module.exports = { getAllUsers/*, deleteUser, addUser*/ };