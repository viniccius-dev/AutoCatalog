import { FiUser, FiPhoneCall, FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { API } from '../../helpers/api';
import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { DisplayMessage } from '../../components/DisplayMessage';

export function SignUp() {

    const { register, handleSubmit } = useForm();
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    

    const onSubmit = async (e) => {
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;

        if(password !== confirmPassword) {
            setType("error");
            setMessage("As senhas inseridas não são iguais");

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            return;
        }

        try {

            const data = await API.createaccount(e);

            setType(data.status);
            setMessage(data.message);
                
            setShowMessage(true);
            setTimeout(() => {
                if(data.status === 'success') {
                    window.location.href ="/"
                }
                
                setShowMessage(false);
            }, 5000);

        } catch (error) {
            console.error('Erro ao tentar cadastrar usuário:', error);
        }
    }

    return(
        <Container>
            <Background />

            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>AutoCatalog</h1>
                <h2>Cadastre sua conta</h2>

                <Input 
                    placeholder="Nome Completo"
                    type="text"
                    icon={FiUser}
                    {...register("name")}
                />

                <Input 
                    placeholder="Telefone"
                    type="number"
                    icon={FiPhoneCall}
                    {...register("phone")}

                />

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    {...register("email")}

                />

                <Input
                    placeholder="Senha"
                    type="password"
                    id="password"
                    icon={FiLock}
                />

                <Input 
                    placeholder="Confirme sua senha"
                    type="password"
                    id="confirm-password"
                    icon={FiLock}
                    {...register("password")}

                />

                {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}

                <Button type="submit" $border="true" title="Cadastrar" />

                <ButtonText title="Login" to="/"/>
            </Form>
        </Container>
    );
}