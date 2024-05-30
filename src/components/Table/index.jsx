import { Container } from './styles';

export function Table({ img }) {
    return(
        <Container>
            <caption>Ficha Técnica</caption>
            <tbody>
                {
                    img &&
                    <tr>
                        <td colSpan="2">
                            <img src={img.VehImg} alt={img.VehName} />
                        </td>
                    </tr>
                }            
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
                    <th scope="row">Aceleração 0-100</th>
                    <td>13,6 segundos</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do porta malas</th>
                    <td>250 Litros</td>
                </tr>
                <tr>
                    <th scope="row">Peso</th>
                    <td>1.029 Kg</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do tanque</th>
                    <td>44 Litros</td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (A)</th>
                    <td>N/A</td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (G)</th>
                    <td>12,6 km/l</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Álcool)</th>
                    <td>N/A</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Gasolina)</th>
                    <td>450 km</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Motor Elétrico)</th>
                    <td>N/A</td>
                </tr>
            </tbody>
        </Container>
    );
}