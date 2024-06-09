import { createContext, useContext, useState, useEffect } from "react";

import { API } from '../helpers/api';
import storage from "../helpers/storage";
import Logout from '../utils/logout';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    async function signIn(formData) {
        try {
            const response = await API.login(formData);

            if(response.status === 'success'){
                const {token, ...profile} = response;
                storage.save("token", token);
                storage.save("profile", profile);
                
                location.reload();
                return;
            }

            setType(response.status);
            setMessage(response.message);
            
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            setType('error');
            setMessage('Erro ao tentar logar. Por favor, tente novamente.');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }

    function signOut() {
        Logout();

        setData({});
    }

    async function updateProfile(formData) {
        try {
            const response = await API.updateaccount(formData);

            setType(response.status);
            setMessage(response.message);
    
            
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
    
            if(response.status === 'error') {
                return;
            }
    
            storage.removeItem("profile");
            storage.save("profile", response);
        } catch (error) {
            console.error('Erro ao editar os dados:', error);
            setType('error');
            setMessage('Erro ao tentar editar os dados.');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("profile");

        if(token && user) {
            setData({
                token,
                user: JSON.parse(user)
            })
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            type,
            message,
            showMessage,
            signIn,
            signOut,
            updateProfile,
            user: data.user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };