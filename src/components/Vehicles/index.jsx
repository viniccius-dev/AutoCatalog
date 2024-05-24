import { FiX } from 'react-icons/fi';

import { Background, Container, Content } from './styles';
import { Card } from '../../components/Card';

export function Vehicles({ closeModal, cars }) {

    const imagePathCar = "http://localhost/projeto/backend/public/media/vehicle/";

    return (
        <Background>
            <Container>
                
                <header>
                    <h3>{cars[0].Brand}</h3>
                    <FiX onClick={closeModal} />
                </header>

                <Content>
                    {cars.map(car => (
                        <Card key={car.id} title={car.VehName} img={`${imagePathCar}${car.VehImg}`} alt="vehicle" />
                    ))}
                </Content>

            </Container>
        </Background>
    );
}