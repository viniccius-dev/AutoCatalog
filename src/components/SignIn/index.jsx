import { FiX, FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Container, Background, Form } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { DisplayMessage } from '../DisplayMessage';

import API from '../../helpers/api';
import storage from '../../helpers/storage';
import closeModal from '../../utils/toggleModal';

export function SignIn() {

    const { register, handleSubmit } = useForm();
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const onSubmit = async (e) => {
        const data = await API.login(e);

        if(data.status === 'success'){
            const {token, ...profile} = data;
            storage.save("token", token);
            storage.save("profile", profile);
            
            closeModal();
            location.reload();
            return;
        }

        setType(data.status);
        setMessage(data.message);
        
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
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
                        <Button title="Esqueci minha senha" />
                        <Button title="Login" $border="true" />
                    </div>
                    
                    <p>Ainda não possui uma conta?<ButtonText title="Cadastre-se aqui." to="/register"/></p>

                </Form>

            </Container>
        </Background>
    );
}