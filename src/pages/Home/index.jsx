import { Container } from './styles';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

import VwImg from '../../assets/Volkswagen.png'
import GmImg from '../../assets/Chevrolet.png'

export function Home() {
    return (
        <Container>
            <Header />
                <main>
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                    <Card title="Volkswagen" img={VwImg} alt="Marca" />
                    <Card title="Chevrolet-GM" img={GmImg} alt="Marca" />
                </main> 
        </Container>
    );
}