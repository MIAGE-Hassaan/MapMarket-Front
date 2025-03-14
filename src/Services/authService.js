export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
    const token = getToken();
    return !!token; // Retourne true si un token est présent
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirige vers la page de connexion
};