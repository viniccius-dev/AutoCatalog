import { FiTrash2 } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import { Container } from './styles';
import { InputSelect } from '../InputSelect';

import { ApiImages } from '../../helpers/api';

export function Table({ title, list, img, data, onSelect, onRemove, comparison, index }) {
    const [selectVehicle, setSelectVehicle] = useState(data || null);

    const handleSelectVehicle = (option) => {
        setSelectVehicle(option);
        if (onSelect) {
            onSelect(option);
        }
    };

    const renderComparisonIcon = (attribute) => {
        if (!comparison || !data) return null;
        const comparisonResults = comparison(attribute);
        return comparisonResults && comparisonResults[index] ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const renderValue = (value, attribute) => {
        if (value == "0" || value == "0.00") return "N/A";
        let formattedValue = value;
        switch (attribute) {
            case 'price':
                formattedValue = formatCurrency(value);
                break;
            case 'velocity':
                formattedValue = `${Number(value).toFixed(1).replace('.', ',')} segundos`;
                break;
            case 'trunkCapacity':
                formattedValue = `${Number(value).toFixed().replace('.', ',')} Litros`;
                break;
            case 'weight':
                formattedValue = `${Number(value).toFixed().replace('.', ',')} Kg`;
                break;
            case 'tankCapacity':
                formattedValue = `${value} Litros`;
                break;
            case 'consumptionAlcohol':
            case 'consumptionGasoline':
                formattedValue = `${Number(value).toFixed(1).replace('.', ',')} km/l`;
                break;
            case 'autonomyAlcohol':
            case 'autonomyGasoline':
            case 'autonomyEletric':
                formattedValue = `${value} km`;
                break;
            default:
                break;
        }
        return formattedValue;
    };

    useEffect(() => {
        setSelectVehicle(data);
    }, [data]);

    return (
        <Container>
            {list ? 
                <thead>
                    <tr>
                        <td colSpan="2">
                            <div>
                                <div>
                                    <InputSelect 
                                        title={title} 
                                        group="vehicle" 
                                        options={list} 
                                        onSelect={handleSelectVehicle} 
                                        selected={selectVehicle}
                                    />
                                </div>
                                <FiTrash2 onClick={onRemove} />
                            </div>
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
                        {selectVehicle && <img src={`${ApiImages}/media/vehicle/${selectVehicle.VehImg}`} alt={selectVehicle.VehName} />}
                    </td>
                </tr>
                }            
                <tr>
                    <th scope="row">Marca</th>
                    <td>{selectVehicle && selectVehicle.Brand}</td>
                </tr>
                <tr>
                    <th scope="row">Ano</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.year, 'year')}
                            {selectVehicle && selectVehicle.year != "0" && selectVehicle.year != "0.00" && renderComparisonIcon('year')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Preço</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.price, 'price')}
                            {selectVehicle && selectVehicle.price != "0" && selectVehicle.price != "0.00" && renderComparisonIcon('price')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Aceleração 0-100</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.velocity, 'velocity')}
                            {selectVehicle && selectVehicle.velocity != "0" && selectVehicle.velocity != "0.00" && renderComparisonIcon('velocity')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Cap. do porta malas</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.trunkCapacity, 'trunkCapacity')}
                            {selectVehicle && selectVehicle.trunkCapacity != "0" && selectVehicle.trunkCapacity != "0.00" && renderComparisonIcon('trunkCapacity')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Peso</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.weight, 'weight')}
                            {selectVehicle && selectVehicle.weight != "0" && selectVehicle.weight != "0.00" && renderComparisonIcon('weight')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Cap. do tanque</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.tankCapacity, 'tankCapacity')}
                            {selectVehicle && selectVehicle.tankCapacity != "0" && selectVehicle.tankCapacity != "0.00" && renderComparisonIcon('tankCapacity')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (A)</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.consumptionAlcohol, 'consumptionAlcohol')}
                            {selectVehicle && selectVehicle.consumptionAlcohol != "0" && selectVehicle.consumptionAlcohol != "0.00" && renderComparisonIcon('consumptionAlcohol')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Consumo médio (G)</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.consumptionGasoline, 'consumptionGasoline')}
                            {selectVehicle && selectVehicle.consumptionGasoline != "0" && selectVehicle.consumptionGasoline != "0.00" && renderComparisonIcon('consumptionGasoline')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Álcool)</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.autonomyAlcohol, 'autonomyAlcohol')}
                            {selectVehicle && selectVehicle.autonomyAlcohol != "0" && selectVehicle.autonomyAlcohol != "0.00" && renderComparisonIcon('autonomyAlcohol')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Gasolina)</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.autonomyGasoline, 'autonomyGasoline')}
                            {selectVehicle && selectVehicle.autonomyGasoline != "0" && selectVehicle.autonomyGasoline != "0.00" && renderComparisonIcon('autonomyGasoline')}
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Autonomia (Motor Elétrico)</th>
                    <td>
                        <div>
                            {selectVehicle && renderValue(selectVehicle.autonomyEletric, 'autonomyEletric')}
                            {selectVehicle && selectVehicle.autonomyEletric != "0" && selectVehicle.autonomyEletric != "0.00" && renderComparisonIcon('autonomyEletric')}
                        </div>
                    </td>
                </tr>
            </tbody>
        </Container>
    );
}