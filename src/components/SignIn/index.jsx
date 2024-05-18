import { FiX, FiMail, FiLock } from 'react-icons/fi'
import { useForm } from 'react-hook-form';
import API from '../../helpers/api';

import { Container, Background, Form } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import closeModal from '../../utils/toggleModal';

export function SignIn() {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (e) => {
        console.log(e);
        await API.createaccount(e);
    }
    
    return (
        <Background onSubmit={handleSubmit(onSubmit)} id="loginModal" className="hidden">
            <Container id="loginForm">
                <FiX onClick={closeModal} className="closeButton"/>

                <Form>

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

                    <div>
                        <Button title="Esqueci minha senha" />
                        <Button title="Login" $border="true" />
                    </div>
                    
                    <p>Ainda não possui uma conta?<ButtonText title="Cadastre-se aqui." to="/register"/></p>

                </Form>

            </Container>
        </Background>
    );
}