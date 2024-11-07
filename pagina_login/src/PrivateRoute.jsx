import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // controle da autenticação
    const token = localStorage.getItem("authToken"); // pega o token no ls

    useEffect(() => {
        if(token){ // se ele acha o token ele tentra entrar
            fetch("http://localhost:8000/api/visao_geral", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if(response.ok){
                    setIsAuthenticated(true);
                }
                else{ // se o response nao for ok, pode ser que o token é inválido ou expirou
                    localStorage.removeItem("authToken"); // remove o token guardado
                    setIsAuthenticated(false);
                }
            })
            // cobre problemas de rede (problema na url ou API)
            .catch(() => setIsAuthenticated(false));
        }
        // o useEffect é executado toda vez que o token muda
    }, [token]);

    // se nao tiver autenticado, vai pro login
    if(!isAuthenticated){
        return <Navigate to="/" replace />
    }

    return children;
};

export default PrivateRoute;