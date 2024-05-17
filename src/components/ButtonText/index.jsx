import { Container } from './styles';

export function ButtonText({ title, loading = false, border = false, ...rest}) {
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