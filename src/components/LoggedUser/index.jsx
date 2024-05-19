import { FiUser } from 'react-icons/fi';
import { Container, NoAvatar } from './styles';

import storage from '../../helpers/storage';

export function LoggedUser() {
    const profile = storage.get("profile");

    return (
        <Container>
            <div>
                <span>Bem-vindo</span>
                <strong>{profile.user.name}</strong>
            </div>

            {
                profile.user.name !== "" 
                
                ?

                <NoAvatar>
                    <FiUser />
                </NoAvatar>

                :

                <img
                    src={profile.user.avatar}
                    alt="Foto do usuário"
                />
            }
        </Container>
    );
}