import { Container } from './styles';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export function DisplayMessage({ $type = "success", message, ...rest }) {
    return (
        <Container $type={$type} {...rest}>
            {
                $type === "error"

                ?

                <FiXCircle />

                :

                <FiCheckCircle />
            }
            <p>{message}</p>
        </Container>
    );
}