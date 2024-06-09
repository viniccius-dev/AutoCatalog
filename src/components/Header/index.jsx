import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/auth.jsx';

import { Container, Wrapper } from './styles.js';
import { LoggedOutUser } from '../LoggedOutUser';
import { LoggedUser } from '../LoggedUser';
import { SignIn } from '../SignIn';

export function Header() {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <Container>
            <Wrapper>
                <Link to="/">
                    <h1>AutoCatalog</h1>
                </Link>

                <div>
                    <Link 
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Catálogo
                    </Link>
                    <Link 
                        to="/search"
                        className={location.pathname === '/search' ? 'active' : ''}
                    >
                        Pesquisar
                    </Link>
                    <Link 
                        to="/about"
                        className={location.pathname === '/about' ? 'active' : ''}
                    >
                        Sobre
                    </Link>
                </div>

                {user ? <LoggedUser /> : <LoggedOutUser />}

                <SignIn />
            </Wrapper>
        </Container>
    );
}