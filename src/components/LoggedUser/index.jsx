import { Container } from './styles';

export function LoggedUser() {
    return (
        <Container>
            <div>
                <span>Bem-vindo</span>
                <strong>Marcos Vinícius</strong>
            </div>

            <img
                src="https://github.com/viniccius-dev.png"
                alt="Foto do usuário"
            />
        </Container>
    );
}