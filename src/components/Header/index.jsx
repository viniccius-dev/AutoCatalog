import { Container, Wrapper } from './styles.js';


import { LoggedOutUser } from '../LoggedOutUser';
import { LoggedUser } from '../LoggedUser';
import { SignIn } from '../SignIn';

export function Header() {
    return (
        <Container>
            <Wrapper>
                <h1>AutoCatalog</h1>

                <LoggedUser />

                <SignIn />
            </Wrapper>
        </Container>
    );
}