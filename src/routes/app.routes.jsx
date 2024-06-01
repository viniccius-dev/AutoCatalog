import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { New } from '../pages/New';
import { Info } from '../pages/Info';
import { UpdateVec } from '../pages/UpdateVec';
import { Search } from '../pages/Search';
import { Comparison } from '../pages/Comparison';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/new" element={<New />} />
                <Route path="/update" element={<UpdateVec />} />
                <Route path="/info/:id" element={<Info />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}