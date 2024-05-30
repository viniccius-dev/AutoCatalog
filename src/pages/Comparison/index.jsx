import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { Container, Content, Background, Layer } from './styles';

import { API, ApiBase } from '../../helpers/api';

import { Header } from '../../components/Header';
import { Table } from '../../components/Table';

export function Comparison() {
    const options = [
        {id: 1, name: 'Celta'},
        {id: 2, name: 'Corsa'}
    ];

    const car = {
        Brand: "Chevrolet-RM",
        BrandImg: "1a05d9ad7bed423ea811ce397557e53e.png",
        VehImg: "49b96350a56bb96caa0e3f97a7b9dca8.png",
        VehName: "Celta",
        consumption: "10.10",
        id: "13",
        price: "32755.00",
        tankCapacity: "55",
        trunkCapacity: "285",
        velocity: "10.10",
        weight: "1055.00",
        year: "2022"
    }

    const cars = [
        {
            Brand: "Chevrolet-RM",
            BrandImg: "1a05d9ad7bed423ea811ce397557e53e.png",
            VehImg: "49b96350a56bb96caa0e3f97a7b9dca8.png",
            VehName: "Celta",
            consumption: "10.10",
            id: "13",
            price: "32755.00",
            tankCapacity: "55",
            trunkCapacity: "285",
            velocity: "10.10",
            weight: "1055.00",
            year: "2022"
        },
        {
            Brand: "Chevrolet-RM",
            BrandImg: "1a05d9ad7bed423ea811ce397557e53e.png",
            VehImg: "6cc005a8299b893eab8a42471cd55300.png",
            VehName: "Corsa",
            consumption: "12.60",
            id: "14",
            price: "27260.00",
            tankCapacity: "44",
            trunkCapacity: "260",
            velocity: "13.60",
            weight: "1029.00",
            year: "2011"
        }
    ]

    return (
        <Container>
            <Header />

            <Background>
                <Layer>
                    <Content>
                        <div>
                            <h2>Comparação</h2>
                            <FaRegHeart />
                        </div>

                        <main>
                            <Table title={car.VehName} img={`${ApiBase}/media/vehicles/${car.VehImg}`} />
                        </main>
                    </Content>
                </Layer>
            </Background>
        </Container>
    )
}