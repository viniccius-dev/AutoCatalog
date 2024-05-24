import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, NoAvatar } from './styles';

import storage from '../../helpers/storage';

export function LoggedUser() {
    const profile = storage.get("profile");
    const imagePath = "http://localhost/projeto/backend/public/media/user/";

    return (
        <Container>
            <div>
                <span>Bem-vindo</span>
                <strong>{profile.user.name}</strong>
            </div>

            <Link to="/profile">
                {
                    profile.user.avatar === "" 
                    
                    ?

                    <NoAvatar>
                        <FiUser />
                    </NoAvatar>

                    :

                    <img
                        src={`${imagePath}${profile.user.avatar}`}
                        alt="Foto do usuário"
                    />
                }
            </Link>
        </Container>
    );
}