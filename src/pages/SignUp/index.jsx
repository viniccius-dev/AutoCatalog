import { FiUser, FiPhoneCall, FiMail, FiLock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import API from '../../helpers/api';

import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp() {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (e) => {
        console.log(e);
        await API.createaccount(e);
    }

    return(
        <Container>
            <Background />

            <Form onSubmit={handleSubmit(onSubmit)} id="registrationForm">
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
                    icon={FiLock}
                />

                <Input 
                    placeholder="Confirme sua senha"
                    type="password"
                    icon={FiLock}
                    {...register("password")}

                />

                <Button type="submit" $border="true" title="Cadastrar" />

                <a href="#">
                    Login
                </a>
            </Form>
        </Container>
    );
}