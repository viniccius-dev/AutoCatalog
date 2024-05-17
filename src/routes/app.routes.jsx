import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}