import { Container } from './styles';

import { ApiBase } from '../../helpers/api';

import { InputSelect } from '../InputSelect';

export function Table({ title, list, img, data }) {
    return(
        <Container>
            {
                list ? 
                    <thead>
                        <tr>
                            <td colSpan={2}>
                                <InputSelect title="Celta" group="vehicle" options={list} />
                            </td>
                        </tr> 
                    </thead>
                    
                : 
                <caption>{title}</caption>

            }
            
            <tbody>
                {
                    img &&
                    <tr>
                        <td colSpan="2" className="td-img">
                            {data && <img src={`${ApiBase}/media/vehicle/${data.VehImg}`} alt={data.VehName} />}
                        </td>
                    </tr>
                }            
                <tr>
                    <th scope="row">Marca</th>
                    <td>{data && data.Brand}</td>
                </tr>
                <tr>
                    <th scope="row">Ano</th>
                    <td>{data && data.year}</td>
                </tr>
                <tr>
                    <th scope="row">Preço</th>
                    <td>{data && `R$ ${data.price}`}</td>
                </tr>
                <tr>
                    <th scope="row">Aceleração 0-100</th>
                    <td>{data && `${data.velocity} segundos`}</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do porta malas</th>
                    <td>{data && `${data.trunkCapacity} Litros`}</td>
                </tr>
                <tr>
                    <th scope="row">Peso</th>
                    <td>{data && `${data.weight} Kg`}</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do tanque</th>
                    <td>{data && `${data.tankCapacity} Litros`}</td>
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