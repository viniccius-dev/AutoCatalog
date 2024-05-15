import { FiUser, FiPhoneCall, FiMail, FiLock } from 'react-icons/fi';

import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp() {
    return(
        <Container>
            <Background />

            <Form>
                <h1>AutoCatalog</h1>
                <h2>Cadastre sua conta</h2>

                <Input 
                    placeholder="Nome Completo"
                    type="text"
                    icon={FiUser}
                />

                <Input 
                    placeholder="Telefone"
                    type="number"
                    icon={FiPhoneCall}
                />

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                />

                <Input 
                    placeholder="Confirme sua senha"
                    type="password"
                    icon={FiLock}
                />

                <Button $border="true" title="Cadastrar"/>

                <a href="#">
                    Login
                </a>
            </Form>
        </Container>
    );
}