import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { New } from '../pages/New';
import { Info } from '../pages/Info';
import { UpdateVec } from '../pages/UpdateVec';
import { Search } from '../pages/Search';
import { Comparison } from '../pages/Comparison';
import { History } from '../pages/History';
import { About } from '../pages/About';

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
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}