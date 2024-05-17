import { Container, Wrapper } from './styles.js';

import { Button } from '../Button';
import { SignIn } from '../SignIn';

import closeModal from '../../utils/closeModal.js';

export function Header() {
    {/* 
        <img
            src={Logo}
            alt="Logo"
        />
        
    */}
    return (
        <Container>
            <Wrapper>
                <h1>AutoCatalog</h1>

                <div>
                    <Button title="Cadastrar" to="/register" />
                    <Button $border="true" title="Login" id="loginHeaderButton" onClick={closeModal} />
                </div>

                <SignIn />
            </Wrapper>
        </Container>
    );
}