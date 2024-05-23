import { Container } from './styles';

export function Card({ title, img, onClick, ...rest }) {
    return (
        <Container onClick={onClick}>
            <h3>{title}</h3>
            <img src={img} {...rest}/>
        </Container>
    );
}