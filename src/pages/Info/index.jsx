import { FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Content, Background, Layer } from './styles';

import { Header } from '../../components/Header';
import { Table } from '../../components/Table';
import { InputSelect } from '../../components/InputSelect';

import { API, ApiImages } from '../../helpers/api';

export function Info() {
    const [vehicle, setVehicle] = useState(null);
    const [listVehicle, setListVehicle] = useState([]);
    const [optionSelected, setOptionSelected] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const handleNewInfo = (option) => {
        navigate(`/info/${option.id}`);
        setOptionSelected(option.id);
    }

    const handleCardClick = (vehicle) => {
        const params = new URLSearchParams();
        params.append('car1', vehicle.id);
        navigate(`/comparison?${params.toString()}`);
    }
    
    useEffect(() => {
        async function fetchVehicle() {
            const responseCar = await API.renderVehicle(params.id);
            const responseListCar = await API.renderCars();
            setVehicle(responseCar.vehicle);
            setListVehicle(responseListCar.cars);
        }
        
        fetchVehicle();
    }, [optionSelected]);

    return(
        <Container>
            <Header />

            <Background>
                <Layer>
                    <Content>

                        <Table title="Ficha Técnica" data={vehicle}/>
                        <div>
                            <InputSelect 
                                title={vehicle && vehicle.VehName} 
                                group="vehicle" 
                                options={listVehicle} 
                                onSelect={handleNewInfo}
                            />

                            {vehicle && <img src={`${ApiImages}/media/vehicle/${vehicle.VehImg}`} />}

                            <button onClick={() => handleCardClick(vehicle)}>
                                Realizar comparação
                                <FiArrowRight />
                            </button>
                        </div>
                        
                    </Content>
                </Layer>
            </Background>
        </Container>
    );
}