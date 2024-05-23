import { useState } from 'react';

import { Container } from './styles';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Vehicles } from '../../components/Vehicles';

import VwImg from '../../assets/Volkswagen.png'
import GmImg from '../../assets/Chevrolet.png'

export function Home() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Container>
            <Header />
                <main>
                    <Card onClick={openModal} title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                </main>

                {isOpen && <Vehicles closeModal={closeModal} />}
        </Container>
    );
}