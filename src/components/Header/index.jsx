import { Container, Wrapper } from './styles.js';

import storage from '../../helpers/storage.js';

import { LoggedOutUser } from '../LoggedOutUser';
import { LoggedUser } from '../LoggedUser';
import { SignIn } from '../SignIn';

export function Header() {
    const profile = storage.get("profile");

    return (
        <Container>
            <Wrapper>
                <h1>AutoCatalog</h1>

                {profile ? <LoggedUser /> : <LoggedOutUser />}

                <SignIn />
            </Wrapper>
        </Container>
    );
}