import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";

import { Container, Content, Background, Layer } from './styles';

import { API } from '../../helpers/api';

import { Header } from '../../components/Header';
import { Table } from '../../components/Table';

export function Comparison() {
    const [listCars, setListCars] = useState([]);

    const [selectedCars, setSelectedCars] = useState([null, null]); // Two vehicles for comparison

    const car = {
        Brand: "Chevrolet-RM",
        BrandImg: "1a05d9ad7bed423ea811ce397557e53e.png",
        VehImg: "49b96350a56bb96caa0e3f97a7b9dca8.png",
        VehName: "Celta",
        autonomyAlcohol: "450",
        autonomyEletric: "35",
        autonomyGasoline: "620",
        consumptionAlcohol: "10.10",
        consumptionGasoline: "11.70",
        fuelType: "Híbrido",
        id: "13",
        price: "32755.00",
        tankCapacity: "55",
        trunkCapacity: "285",
        velocity: "10.10",
        weight: "1055.00",
        year: "2022"
    }

    useEffect(() => {
        async function fetchVehicles() {
            const response = await API.renderCars();
            setListCars(response.cars);
        }

        fetchVehicles();
    }, []);

    const handleSelectVehicle = (index, vehicle) => {
        const updatedSelectedCars = [...selectedCars];
        updatedSelectedCars[index] = vehicle;
        if(index === selectedCars.length - 1 && selectedCars.length < 4) {
            updatedSelectedCars.push(null);
        }
        setSelectedCars(updatedSelectedCars);
        console.log(updatedSelectedCars);
    }

    const handleRemoveVehicle = (index) => {
        const updatedSelectedCars = selectedCars.slice();
        updatedSelectedCars[index] = null;

        // Ensure at least two tables are always present
        const nonEmptyCars = updatedSelectedCars.filter(car => car !== null);
        if (nonEmptyCars.length < 3) {
            while (nonEmptyCars.length < 3) {
                nonEmptyCars.push(null);
            }
            setSelectedCars(nonEmptyCars);
        } else {
            setSelectedCars(updatedSelectedCars);
        }
        console.log(updatedSelectedCars);
    }

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
                            {/* <Table title={car.VehName} data={car} img /> */}
                            {selectedCars.map((car, index) => (
                                <Table 
                                    key={index}
                                    title={car?.VehName || "Selecionar"}
                                    data={car}
                                    list={listCars}
                                    onSelect={(vehicle) => handleSelectVehicle(index, vehicle)}
                                    onRemove={() => handleRemoveVehicle(index)}
                                    img
                                />
                            ))}
                        </main>
                    </Content>
                </Layer>
            </Background>
        </Container>
    )
}