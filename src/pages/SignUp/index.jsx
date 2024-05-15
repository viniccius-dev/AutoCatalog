import { FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Container } from './styles';

import { Input } from '../../components/Input';

export function SignUp() {
    return(
        <Container>
            <Input 
                placeholder="Nome Completo"
                type="text"
                icon={FiUser}
            />
        </Container>
    );
}