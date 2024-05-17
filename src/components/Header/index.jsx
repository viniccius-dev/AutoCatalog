import { Container, Wrapper } from './styles.js';

import { Button } from '../Button';
import { ButtonText } from '../ButtonText';
import { SignIn } from '../SignIn';

import toggleModal from '../../utils/toggleModal.js';

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
                    <ButtonText title="Cadastrar" to="/register" />
                    <Button type="button" $border="true" title="Login" onClick={toggleModal} id="loginHeaderButton"/>
                </div>

                <SignIn />
            </Wrapper>
        </Container>
    );
}