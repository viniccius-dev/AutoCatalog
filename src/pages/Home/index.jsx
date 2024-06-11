import { useState, useEffect } from 'react';

import { Container } from './styles';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Vehicles } from '../../components/Vehicles';

import { API, ApiImages } from '../../helpers/api';

export function Home() {
    const [isOpen, setIsOpen] = useState(false);

    const [brands, setBrands] = useState([]);
    const [cars, setCars] = useState([]);

    const [selectedBrandId, setSelectedBrandId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataBrands = await API.renderBrands();
                const dataCars = await API.renderCars();
                setBrands(dataBrands.brands);
                setCars(dataCars.cars);
            } catch(error) {
                console.error('Erro ao buscar dados das marcas:', error);
            }
        };

        fetchData();
    }, []);

    const openModal = (brandName) => {
        setSelectedBrandId(brandName);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedBrandId(null);
    };

    const filteredCars = cars.filter(car => car.Brand === selectedBrandId);

    return (
        <Container>
            <Header />
                <main>
                    {brands.map(brand => (
                        <Card 
                            key={brand.id} 
                            onClick={() => openModal(brand.name)} 
                            title={brand.name} 
                            img={`${ApiImages}/media/brand/${brand.img}`} 
                            alt="Marca" 
                        />
                    ))}
                </main>

                {isOpen && <Vehicles cars={filteredCars} closeModal={closeModal} />}
        </Container>
    );
}