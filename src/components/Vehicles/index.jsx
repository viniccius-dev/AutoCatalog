import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

import { Background, Container, Content } from './styles';
import { Card } from '../../components/Card';

import { ApiImages } from '../../helpers/api';

export function Vehicles({ closeModal, cars }) {

    const navigate = useNavigate();

    const handleNavigateInfo = (id) => {
        navigate(`/info/${id}`);
    }

    return (
        <Background>
            <Container>
                
                <header>
                    <h3>{cars.length > 0 && cars[0].Brand}</h3>
                    <FiX onClick={closeModal} />
                </header>

                <Content>
                    {cars.map(car => (
                        <Card 
                            key={car.id} 
                            title={car.VehName} 
                            img={`${ApiImages}/media/vehicle/${car.VehImg}`} 
                            alt="vehicle" 
                            onClick={() => handleNavigateInfo(car.id)}
                        />
                    ))}
                </Content>

            </Container>
        </Background>
    );
}