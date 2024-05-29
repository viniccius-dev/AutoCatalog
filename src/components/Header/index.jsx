import { Link, useLocation } from 'react-router-dom';

import { Container, Wrapper } from './styles.js';

import storage from '../../helpers/storage.js';

import { LoggedOutUser } from '../LoggedOutUser';
import { LoggedUser } from '../LoggedUser';
import { SignIn } from '../SignIn';

export function Header() {
    const profile = storage.get("profile");
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

                {profile ? <LoggedUser /> : <LoggedOutUser />}

                <SignIn />
            </Wrapper>
        </Container>
    );
}