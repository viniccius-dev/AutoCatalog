import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { user, loading } = useAuth();

    if (loading) {
        return <BrowserRouter><div></div></BrowserRouter>;
    }

    return (
        <BrowserRouter>
            { user ? <AppRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    );
}