import { FaHistory } from "react-icons/fa";
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, NoAvatar, DropDownList } from './styles';
import Logout from '../../utils/logout';

import { ApiBase } from '../../helpers/api';

import storage from '../../helpers/storage';

export function LoggedUser() {
    const profile = storage.get("profile");
    const [isOpen, setIsOpen] = useState(false);

    const handleDropDownList = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <div>
                <span>Bem-vindo</span>
                <strong>{profile.user.name}</strong>
            </div>

            <a>
                {
                    profile.user.avatar === "" 
                    
                    ?

                    <NoAvatar>
                        <FiUser />
                    </NoAvatar>

                    :

                    <img
                        onClick={handleDropDownList}
                        src={`${ApiBase}/media/user/${profile.user.avatar}`}
                        alt="Foto do usuário"
                    />
                }
            </a>

            {
                isOpen &&
                <DropDownList>
                    <Link to="/profile"><FiUser /> Editar Perfil</Link>
                    <Link to="/history"><FaHistory /> Histórico</Link>
                    <Link onClick={Logout}><FiLogOut /> Logout</Link>
                </DropDownList>
            }
        </Container>
    );
}