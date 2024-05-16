import { Container, Wrapper } from './styles.js';
import Logo from '../../assets/logo.png'

import { Button } from '../Button';
import { SignIn } from '../SignIn';

import closeModal from '../../helpers/closeModal';

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
                    <Button title="Cadastrar" />
                    <Button $border="true" title="Login" id="loginHeaderButton" onClick={closeModal} />
                </div>

                <SignIn />
            </Wrapper>
        </Container>
    );
}