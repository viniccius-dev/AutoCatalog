import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { Container, Form, Avatar, NoAvatar } from './styles';

import storage from '../../helpers/storage';
import API from '../../helpers/api';
import Logout from '../../utils/logout';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DisplayMessage } from '../../components/DisplayMessage';

export function Profile() {
    const profile = storage.get("profile");
    
    const { register, handleSubmit, setValue } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(profile.user.avatar || "");
    const [avatarFile, setAvatarFile] = useState(null); // Estado para armazenar o arquivo de avatar

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const imagePath = "http://localhost/projeto/backend/public/media/user/"; // Defina o caminho da pasta de imagens no backend

    useEffect(() => {
        if (profile.user.avatar) {
            setAvatarPreview(`${imagePath}${profile.user.avatar}`);
        }
    }, [profile.user.avatar]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        delete data.avatar;
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const response = await API.updateaccount(formData);

            setType(response.status);
            setMessage(response.message);
    
            
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
    
            if(response.status === 'error') {
                return;
            }
    
            storage.removeItem("profile");
            storage.save("profile", response);
        } catch (error) {
            console.error('Erro ao editar os dados:', error);
        }
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
                <Link to="/">
                    <FiArrowLeft />
                </Link>
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
                <Button type="button" $border="true" title="Logout" onClick={Logout} />
            </Form>
        </Container>
    );
}