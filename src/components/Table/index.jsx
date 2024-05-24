import { Container } from './styles';

export function Table() {
    return(
        <Container>
            <caption>Ficha Técnica</caption>
            <tbody>
                <tr>
                    <th scope="row">Marca</th>
                    <td>Chevrolet</td>
                </tr>
                <tr>
                    <th scope="row">Ano</th>
                    <td>2011</td>
                </tr>
                <tr>
                    <th scope="row">Preço</th>
                    <td>R$27.260</td>
                </tr>
                <tr>
                    <th scope="row">Ace 0-100</th>
                    <td>13,6 segundos</td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio</th>
                    <td>12,6 km/l</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do tanque</th>
                    <td>44 Litros</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do porta malas</th>
                    <td>Porta malas</td>
                </tr>
                <tr>
                    <th scope="row">Peso</th>
                    <td>1.029 Kg</td>
                </tr>
            </tbody>
        </Container>
    );
}