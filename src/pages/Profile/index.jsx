import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { Container, Form, Avatar, NoAvatar } from './styles';

import storage from '../../helpers/storage';
import UpdateAccount from '../../helpers/Listeners/updateProfile';
import Loggout from '../../utils/loggout';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Profile() {
    const profile = storage.get("profile");
    const { register, handleSubmit, setValue } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(profile.user.avatar || "");
    const [avatarFile, setAvatarFile] = useState(null); // Estado para armazenar o arquivo de avatar

    const imagePath = "http://localhost/projeto/backend/public/media/user/"; // Defina o caminho da pasta de imagens no backend

    useEffect(() => {
        if (profile.user.avatar) {
            setAvatarPreview(`${imagePath}${profile.user.avatar}`);
        }
    }, [profile.user.avatar]);

    const onSubmit = (data) => {
        const formData = new FormData();
        delete data.avatar;
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        UpdateAccount(formData);
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

                <Button type="submit" $border="true" title="Salvar" />
                <Button type="button" $border="true" title="Loggout" onClick={Loggout} />
            </Form>
        </Container>
    );
}