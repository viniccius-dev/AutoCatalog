import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Container } from './styles';
import { ApiBase } from '../../helpers/api';
import { InputSelect } from '../InputSelect';

export function Table({ title, list, img, data, onSelect, onRemove }) {
    const [selectVehicle, setSelectVehicle] = useState(data || null);

    useEffect(() => {
        setSelectVehicle(data);
    }, [data]);

    const handleSelectVehicle = (option) => {
        setSelectVehicle(option);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <Container>
            {list ? 
                <thead>
                    <tr>
                        <td>
                            <InputSelect 
                                title={title} 
                                group="vehicle" 
                                options={list} 
                                onSelect={handleSelectVehicle} 
                                selected={selectVehicle}
                            />
                        </td>
                        <td>
                            <FiTrash2 onClick={onRemove} />
                        </td>
                    </tr> 
                </thead>
            : 
            <caption>{title}</caption>
            }
            <tbody>
                {img && 
                <tr>
                    <td colSpan="2" className="td-img">
                        {selectVehicle && <img src={`${ApiBase}/media/vehicle/${selectVehicle.VehImg}`} alt={selectVehicle.VehName} />}
                    </td>
                </tr>
                }            
                <tr>
                    <th scope="row">Marca</th>
                    <td>{selectVehicle && selectVehicle.Brand}</td>
                </tr>
                <tr>
                    <th scope="row">Ano</th>
                    <td>{selectVehicle && selectVehicle.year}</td>
                </tr>
                <tr>
                    <th scope="row">Preço</th>
                    <td>{selectVehicle && `R$ ${selectVehicle.price}`}</td>
                </tr>
                <tr>
                    <th scope="row">Aceleração 0-100</th>
                    <td>{selectVehicle && `${selectVehicle.velocity} segundos`}</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do porta malas</th>
                    <td>{selectVehicle && `${selectVehicle.trunkCapacity} Litros`}</td>
                </tr>
                <tr>
                    <th scope="row">Peso</th>
                    <td>{selectVehicle && `${selectVehicle.weight} Kg`}</td>
                </tr>
                <tr>
                    <th scope="row">Cap. do tanque</th>
                    <td>{selectVehicle && `${selectVehicle.tankCapacity} Litros`}</td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (A)</th>
                    <td>{selectVehicle && `${selectVehicle.consumptionAlcohol} km/l`}</td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (G)</th>
                    <td>{selectVehicle && `${selectVehicle.consumptionGasoline} km/l`}</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Álcool)</th>
                    <td>{selectVehicle && `${selectVehicle.autonomyAlcohol} km`}</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Gasolina)</th>
                    <td>{selectVehicle && `${selectVehicle.autonomyGasoline} km`}</td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Motor Elétrico)</th>
                    <td>{selectVehicle && `${selectVehicle.autonomyEletric} km`}</td>
                </tr>
            </tbody>
        </Container>
    );
}
