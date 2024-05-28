import { useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';

import { Container, Form, UpdateBrand, UpdateVehicle } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';

import { API, ApiBase } from '../../helpers/api';

export function UpdateVec() {
    const optionsFuel = [
        {id: 1, name: 'Combustão'},
        {id: 2, name: 'Elétrico'},
        {id: 3, name: 'Híbrido'}
    ]
    
    const navigate = useNavigate();
    
    const imgBrandRef = useRef(null);
    const imgVehicleRef = useRef(null);
    const tankCapacityRef = useRef(null);
    const consumptionAlcoholRef = useRef(null);
    const consumptionGasolineRef = useRef(null);
    const autonomyAlcoholRef = useRef(null);
    const autonomyGasolineRef = useRef(null);
    const autonomyEletricRef = useRef(null);

    const [imgBrandPreview, setImgBrandPreview] = useState(null);
    const [selectedOptionBrand, setSelectedOptionBrand] = useState(null);
    const [imgVehiclePreview, setImgVehiclePreview] = useState(null);
    const [selectedOptionVehicle, setSelectedOptionVehicle] = useState(null);
    const [selectedOptionFuel, setSelectedOptionFuel] = useState(null);
    const [autonomyAlcohol, setAutonomyAlcohol] = useState(null);
    const [autonomyGasoline, setAutonomyGasoline] = useState(null);

    const [optionsBrands, setOptionsBrands] = useState([]);
    const [optionsVehicles, setOptionsVehicles] = useState([]);
    const [originalOptionsVehicles, setOriginalOptionsVehicles] = useState([]); // Para manter as opções originais

    const handleBack = () => {
        navigate(-1);
    }

    const handleImageChange = useCallback((e, setImagePreview) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    }, []);

    const handleSelectBrand = useCallback((option) => {
        setSelectedOptionBrand(option);
        setImgBrandPreview(`${ApiBase}/media/brand/${option.img}`);
    }, []);

    const handleSelectVehicle = useCallback((option) => {
        setSelectedOptionVehicle(option);
        setImgVehiclePreview(`${ApiBase}/media/vehicle/${option.VehImg}`);
    }, []);

    const handleFilterVehicles = useCallback((option) => {
        const filteredVehicles = originalOptionsVehicles.filter(vehicle => vehicle.Brand === option.name);
        setOptionsVehicles(filteredVehicles);
    }, [originalOptionsVehicles]);

    const handleSelectFuel = useCallback((option) => {
        const optionValue = option.name;
        setSelectedOptionFuel(optionValue);

        if (optionValue === 'Combustão') {
            autonomyEletricRef.current.disabled = true;
            autonomyEletricRef.current.value = "";
            tankCapacityRef.current.disabled = false;
            consumptionAlcoholRef.current.disabled = false;
            consumptionGasolineRef.current.disabled = false;
        } else if (optionValue === 'Elétrico') {
            tankCapacityRef.current.disabled = true;
            consumptionAlcoholRef.current.disabled = true;
            consumptionGasolineRef.current.disabled = true;
            tankCapacityRef.current.value = "";
            consumptionAlcoholRef.current.value = "";
            consumptionGasolineRef.current.value = "";
            autonomyEletricRef.current.disabled = false;
        } else {
            tankCapacityRef.current.disabled = false;
            consumptionAlcoholRef.current.disabled = false;
            consumptionGasolineRef.current.disabled = false;
            autonomyEletricRef.current.disabled = false;
            tankCapacityRef.current.value = "";
            consumptionAlcoholRef.current.value = "";
            consumptionGasolineRef.current.value = "";
            autonomyEletricRef.current.value = "";
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataBrands = await API.renderBrands();
                setOptionsBrands(dataBrands.brands);
            } catch (error) {
                console.error('Erro ao buscar dados das marcas:', error);
            }

            try {
                const dataVehicles = await API.renderCars();
                setOptionsVehicles(dataVehicles.cars);
                setOriginalOptionsVehicles(dataVehicles.cars); // Guardar as opções originais
            } catch (error) {
                console.error('Erro ao buscar dados dos veículos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateAutonomy = () => {
            const tankCapacity = parseFloat(tankCapacityRef.current.value.replace(',','.')) || 0;
            const consumptionAlcohol = parseFloat(consumptionAlcoholRef.current.value.replace(',','.')) || 0;
            const consumptionGasoline = parseFloat(consumptionGasolineRef.current.value.replace(',','.')) || 0;

            if(tankCapacity > 0 && consumptionAlcohol > 0) {
                setAutonomyAlcohol((tankCapacity * consumptionAlcohol).toFixed());
            } else {
                setAutonomyAlcohol(null);
            }

            if(tankCapacity > 0 && consumptionGasoline > 0) {
                setAutonomyGasoline((tankCapacity * consumptionGasoline).toFixed());
            } else {
                setAutonomyGasoline(null);
            }
        };

        const inputs = [
            tankCapacityRef.current,
            consumptionAlcoholRef.current,
            consumptionGasolineRef.current,
        ];

        inputs.forEach(input => {
            input.addEventListener('input', updateAutonomy);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('input', updateAutonomy)
            })
        };
    }, []);

    useEffect(() => {
        if(autonomyAlcoholRef.current) {
            autonomyAlcoholRef.current.value = autonomyAlcohol || "";
        }

        if(autonomyGasolineRef.current) {
            autonomyGasolineRef.current.value = autonomyGasoline || "";
        }
    }, [autonomyAlcohol, autonomyGasoline]);

    return(
        <Container>
            <Header />


            <main>
                <Form>
                    <header>
                        <h1>Atualizar Marca</h1>
                        <button onClick={handleBack}>Voltar</button>
                    </header>

                    <UpdateBrand>
                        <label htmlFor="brand">
                            {imgBrandPreview ? (
                                <img src={imgBrandPreview} alt="Imagem da marca" />
                            ) : (
                                <span>Imagem da marca</span>
                            )}

                            <input
                                ref={imgBrandRef}
                                id="brand"
                                type="file"
                                onChange={(e) => handleImageChange(e, setImgBrandPreview)}
                            />
                        </label>

                        <InputSelect title="Selecione uma marca" group="marcas" options={optionsBrands} onSelect={handleSelectBrand} />

                        <Input name="nameBrand" placeholder="Atualizar o nome da marca" />

                        <Button title="Atualizar" $border="true" />
                        <Button title="Deletar" $border="true" />
                    </UpdateBrand>
                </Form>

                <Form>
                    <header>
                        <h1>Atualizar Veículo</h1>
                    </header>

                    <UpdateVehicle>
                        <label htmlFor="vehicle">
                            {imgVehiclePreview ? (
                                <img src={imgVehiclePreview} alt="Imagem do veículo" />
                            ) : (
                                <span>Imagem do veículo</span>
                            )}

                            <input
                                ref={imgVehicleRef}
                                id="vehicle"
                                type="file"
                                onChange={(e) => handleImageChange(e, setImgVehiclePreview)}
                            />
                        </label>

                        <InputSelect title="Selecione uma marca" group="brands" options={optionsBrands} onSelect={handleFilterVehicles} />
                        <InputSelect title="Selecione uma veículo" group="vehicle" options={optionsVehicles} onSelect={handleSelectVehicle} />

                        <Input name="vehicleName" placeholder="Atualizar nome" />
                        <Input name="year" placeholder="Atualizar ano" />
                        <Input name="price" placeholder="Atualizar preço" />
                        <Input name="velocity" placeholder="Atualizar tempo de 0 a 100 km/h" />
                        <Input name="trunkCapacity" placeholder="Atualizar cap. do porta malas (L)" />
                        <Input name="weight" placeholder="Atualizar peso (Kg)" />

                        <InputSelect title="Atualize o tipo de propulsão" group="fuel" options={optionsFuel} onSelect={handleSelectFuel} />
                        <Input ref={tankCapacityRef} name="tankCapacity" placeholder="Cap. do tanque de combustível (L)" required disabled />
                        <Input ref={consumptionAlcoholRef} name="consumption-a" placeholder="Consumo médio - Km/l (A)" required disabled />
                        <Input ref={consumptionGasolineRef} name="consumption-g" placeholder="Consumo médio - Km/l (G)" required disabled />
                        <Input ref={autonomyAlcoholRef} name="autonomyAlcohol" placeholder="Autonomia - Km (Álcool)" disabled />
                        <Input ref={autonomyGasolineRef} name="autonomyGasoline" placeholder="Autonomia - Km (Gasolina)" disabled />
                        <Input ref={autonomyEletricRef} name="autonomyEletric" placeholder="Autonomia - Km (Elétrico)" required disabled />

                        <Button title="Atualizar" $border="true" />
                        <Button title="Deletar" $border="true" />
                    </UpdateVehicle>
                </Form>
            </main>
        </Container>
    );
}