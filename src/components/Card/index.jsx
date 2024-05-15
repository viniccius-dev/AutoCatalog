import { Container } from './styles';

export function Card({ title, img, ...rest }) {
    return (
        <Container>
            <h3>{title}</h3>
            <img src={img} {...rest}/>
        </Container>
    );
}