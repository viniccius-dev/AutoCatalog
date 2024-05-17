import { Container } from './styles';

export function Button({ title, loading = false, border = false, ...rest}) {
    return (
        <Container
            disabled={loading}
            $border={border.toString()}
            {...rest}
        >
            { loading ? 'Carregando...' : title }
        </Container>
    );
}