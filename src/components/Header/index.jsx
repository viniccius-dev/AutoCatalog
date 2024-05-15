import { Container } from './styles.js';
import Logo from '../../assets/logo.png'

import { Button } from '../Button';

export function Header() {
    {/* 
        <img
            src={Logo}
            alt="Logo"
        />
        
    */}
    return (
        <Container>
            <h1>AutoCatalog</h1>

            <div>
                <Button title="Cadastrar" />
                <Button $border="true" title="Login" />
            </div>
        </Container>
    );
}