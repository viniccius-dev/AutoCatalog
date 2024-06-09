import { FiX, FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/auth';

import { Container, Background, Form } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { DisplayMessage } from '../DisplayMessage';

import closeModal from '../../utils/toggleModal';

export function SignIn() {

    const { register, handleSubmit } = useForm();

    const { signIn, showMessage, type, message } = useAuth();

    const onSubmit = (data) => {
        signIn(data);
        if(type === 'success') closeModal();
    }
    
    return (
        <Background id="loginModal" className="hidden">
            <Container id="loginForm">
                <FiX onClick={closeModal} className="closeButton"/>

                <Form onSubmit={handleSubmit(onSubmit)} >

                    <h3>Bem-vindo!</h3>
                    <p>Faça seu login</p>

                    <Input 
                        placeholder="E-mail"
                        type="email"
                        icon={FiMail}
                        {...register("email")}
                    />

                    <Input 
                        placeholder="Senha"
                        type="password"
                        icon={FiLock}
                        {...register("password")}
                    />

                    {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}

                    <div>
                        <Button title="Login" $border="true" />
                    </div>
                    
                    <p>Ainda não possui uma conta?<ButtonText title="Cadastre-se aqui." to="/register"/></p>

                </Form>

            </Container>
        </Background>
    );
}