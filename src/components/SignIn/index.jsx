import { FiX, FiMail, FiLock } from 'react-icons/fi'

import { Container, Background, Form } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import closeModal from '../../helpers/closeModal';

export function SignIn() {
    return (
        <Background id="loginModal" className="hidden">
            <Container id="loginForm">
                <FiX onClick={closeModal} className="closeButton"/>

                <Form>

                    <h3>Bem-vindo!</h3>
                    <p>Faça seu login</p>

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

                    <div>
                        <Button title="Esqueci minha senha" />
                        <Button title="Login" $border="true" />
                    </div>
                    
                    <p>Ainda não possui uma conta?<Button title="Cadastre-se aqui." /></p>

                </Form>

            </Container>
        </Background>
    );
}