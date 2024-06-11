import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { Container, Form, Avatar, NoAvatar } from './styles';

import { useAuth } from '../../hooks/auth';
import { ApiImages } from '../../helpers/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DisplayMessage } from '../../components/DisplayMessage';

export function Profile() {
    const { user, signOut, updateProfile, type, message, showMessage } = useAuth();
    
    const { register, handleSubmit, setValue } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(user.user.avatar || "");
    const [avatarFile, setAvatarFile] = useState(null); // Estado para armazenar o arquivo de avatar

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (user.user.avatar) {
            setAvatarPreview(`${ApiImages}/media/user/${user.user.avatar}`);
        }
    }, [user.user.avatar]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        delete data.avatar;
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        await updateProfile(formData)
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setAvatarFile(file);
            setValue("avatar", file);
        }
    }

    return (
        <Container>
            <header> 
                <button onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>

            <Form onSubmit={handleSubmit(onSubmit)} >
                <Avatar>
                    {
                        avatarPreview === "" 
                        
                        ?

                        <NoAvatar>
                            <FiUser />
                        </NoAvatar>

                        :

                        <img
                            src={avatarPreview}
                            alt="Foto do usuário"
                        />
                    }

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input
                            id="avatar"
                            type="file"
                            {...register("avatar")}
                            onChange={handleAvatarChange}
                        />
                    </label>
                </Avatar>
                <Input 
                    placeholder="Atualizar nome"
                    type="text"
                    icon={FiUser}
                    {...register("name")}
                />
                <Input 
                    placeholder="Atualizar e-mail"
                    type="text"
                    icon={FiMail}
                    {...register("email")}
                />
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    {...register("old_password")}
                />
                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    {...register("password")}
                />

                {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}

                <Button type="submit" $border="true" title="Salvar" />
                <Button type="button" $border="true" title="Logout" onClick={signOut} />
            </Form>
        </Container>
    );
}