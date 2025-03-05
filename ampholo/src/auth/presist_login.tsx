import { useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const PersistLogin = () => {
    const { accessToken, setAccessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const storedToken = localStorage.getItem('token');

            if (!storedToken) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/validate`, { token: accessToken });
                if (response.data.valid) {
                    setAccessToken(accessToken);
                    navigate('/home')
                } else {
                    navigate("/login");
                    
                }
            } catch (error: any) {
                console.error("Token validation failed:", error.message);
                navigate("/login");
            }
        };
        if (!accessToken) {
            validateToken();
        }
    }, [ accessToken, setAccessToken]);
    
    return <Outlet />;
};

export default PersistLogin;
