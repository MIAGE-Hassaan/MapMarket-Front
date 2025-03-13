import axios from 'axios';


async function loginUser (email, password){
    const reponse = await axios.post("http://mapmarketapi.test/api/login",{ email, password,});
    const token = reponse.data.token;
    localStorage.setItem("token", token);
    console.log("token recu :", token);
    return reponse.data;
}


async function getAllUsers(){
    const token = localStorage.getItem("token");
    console.log("token récupéré: ", token);
    try{
        const rep = axios.get('http://mapmarketapi.test/api/users_basics');
        const users = rep.data;
        const usersArray = users.map(user => ({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom
        }));

        console.log(usersArray);
        return usersArray;
    }catch (e){
        console.log(e)
    }
}

loginUser();
getAllUsers();

// Fonction pour supprimer un utilisateur
async function deleteUser(nom, prenom, id){
    try{
        const rep = await axios.delete(`http://mapmarketapi.test/api/users_basics/${id}`);
        const users = rep.data;
        const usersArray = users.map(user => ({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom
        }));

        console.log(usersArray);
        return usersArray;
    }catch (e){
        console.log(e)
    }
}

export default { getAllUsers, deleteUser};