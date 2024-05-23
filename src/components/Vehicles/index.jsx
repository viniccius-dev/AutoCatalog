import { FiX } from 'react-icons/fi';

import { Background, Container, Content } from './styles';
import { Card } from '../../components/Card';

import imgVec from '../../assets/corsa.png'

export function Vehicles({ closeModal }) {
    return (
        <Background>
            <Container>
                
                <header>
                    <h3>Chevrolet-RM</h3>
                    <FiX onClick={closeModal} />
                </header>

                <Content>
                    <Card title="Corsa" img={imgVec} alt="vehicle" />
                    <Card title="Corsa" img={imgVec} alt="vehicle" />
                    <Card title="Corsa" img={imgVec} alt="vehicle" />
                    <Card title="Corsa" img={imgVec} alt="vehicle" />
                    <Card title="Corsa" img={imgVec} alt="vehicle" />
                </Content>

            </Container>
        </Background>
    );
}