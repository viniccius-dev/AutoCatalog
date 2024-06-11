import { FaHistory } from "react-icons/fa";
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from "../../hooks/auth";

import { Container, NoAvatar, DropDownList } from './styles';

import { ApiImages } from '../../helpers/api';

export function LoggedUser() {
    const [isOpen, setIsOpen] = useState(false);

    const { signOut, user } = useAuth();

    const handleDropDownList = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <div>
                <span>Bem-vindo</span>
                <strong>{user.user.name}</strong>
            </div>

            <a>
                {
                    !user.user.avatar
                    
                    ?

                    <NoAvatar onClick={handleDropDownList}>
                        <FiUser />
                    </NoAvatar>

                    :

                    <img
                        onClick={handleDropDownList}
                        src={`${ApiImages}/media/user/${user.user.avatar}`}
                        alt="Foto do usuário"
                    />
                }
            </a>

            {
                isOpen &&
                <DropDownList>
                    <Link to="/profile"><FiUser /> Editar Perfil</Link>
                    <Link to="/history"><FaHistory /> Histórico</Link>
                    <Link onClick={signOut}><FiLogOut /> Logout</Link>
                </DropDownList>
            }
        </Container>
    );
}