import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { New } from '../pages/New';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/new" element={<New />} />
            </Routes>
        </BrowserRouter>
    );
}