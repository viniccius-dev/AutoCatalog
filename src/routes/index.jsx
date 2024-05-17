import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';

export function appRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}s