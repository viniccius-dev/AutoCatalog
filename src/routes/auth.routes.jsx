import { Routes, Route, Navigate } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Info } from '../pages/Info';
import { Search } from '../pages/Search';
import { Comparison } from '../pages/Comparison';
import { About } from '../pages/About';

export function AuthRoutes() {
    const user = localStorage.getItem("@rocketnotes:user");

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/info/:id" element={<Info />} />
            <Route path="/search" element={<Search />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/about" element={<About />} />

            {!user && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
    );
}