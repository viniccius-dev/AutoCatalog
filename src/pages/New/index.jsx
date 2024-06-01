import { Container, Form, Section } from './styles';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect,  useCallback } from 'react';

import { API, ApiBase } from '../../helpers/api'; // Importe a API

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';
import { DisplayMessage } from '../../components/DisplayMessage';

export function New() {

    const optionsFuel = [
        {id: 1, name: 'Combustão'},
        {id: 2, name: 'Elétrico'},
        {id: 3, name: 'Híbrido'}
    ]

    const navigate = useNavigate();
    
    const imgBrandRef = useRef(null);
    const newBrandRef = useRef(null);
    const tankCapacityRef = useRef(null);
    const consumptionAlcoholRef = useRef(null);
    const consumptionGasolineRef = useRef(null);
    const autonomyAlcoholRef = useRef(null);
    const autonomyGasolineRef = useRef(null);
    const autonomyEletricRef = useRef(null);

    const [optionsBrands, setOptionsBrands] = useState([]);
    const [selectedOptionBrand, setSelectedOptionBrand] = useState(null);
    const [imgBrandPreview, setImgBrandPreview] = useState(null);
    const [imgVehiclePreview, setImgVehiclePreview] = useState(null);
    const [selectedOptionFuel, setSelectedOptionFuel] = useState(null);
    const [autonomyAlcohol, setAutonomyAlcohol] = useState(null);
    const [autonomyGasoline, setAutonomyGasoline] = useState(null);

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

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

        imgBrandRef.current.disabled = true;
        newBrandRef.current.disabled = true;
        newBrandRef.current.value = "";
    }, []);

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
    
    const onSubmit = async (e) => {
        e.preventDefault();

        if(selectedOptionFuel === null || imgVehiclePreview === null) {
            return console.error('Favor inserir todas as informções solicitadas');
        }

        const formData = new FormData();

        if(selectedOptionBrand === null) {
            formData.append('brandImage', imgBrandRef.current.files[0]);
        }
        formData.append('vehicleImage', document.querySelector('#vehicle').files[0]);
        formData.append('brand', selectedOptionBrand ? selectedOptionBrand.name : newBrandRef.current.value);
        formData.append('vehicleName', e.target.vehicleName.value);
        formData.append('year', e.target.year.value);
        formData.append('price', e.target.price.value);
        formData.append('velocity', e.target.velocity.value.replace(',', '.'));
        formData.append('trunkCapacity', e.target.trunkCapacity.value);
        formData.append('weight', e.target.weight.value);
        formData.append('fuelType', selectedOptionFuel);
        formData.append('tankCapacity', tankCapacityRef.current.disabled ? 'N/A' : tankCapacityRef.current.value);
        formData.append('autonomyAlcohol', autonomyAlcoholRef.current.value);
        formData.append('autonomyGasoline', autonomyGasolineRef.current.value);
        formData.append('autonomyEletric', autonomyEletricRef.current.disabled ? 'N/A' : autonomyEletricRef.current.value);
        formData.append('consumptionAlcohol', consumptionAlcoholRef.current.disabled ? 'N/A' : consumptionAlcoholRef.current.value.replace(',', '.'));
        formData.append('consumptionGasoline', consumptionGasolineRef.current.disabled ? 'N/A' : consumptionGasolineRef.current.value.replace(',', '.'));

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        // return;

        try {
            const response = await API.createVehicle(formData);

            setType(response.status);
            setMessage(response.message);
    
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if(response.status === 'error') {
                    return;
                }
                location.reload();
            }, 2000);

        } catch (error) {

            setType('error');

            if(error.message) {
                setMessage(error.message);
            } else {
                setMessage('Erro ao criar veículo.')
            }
    
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await API.renderBrands();
                setOptionsBrands(data.brands);
            } catch (error) {
                console.error('Erro ao buscar dados das marcas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Header />

            <main>
                <Form onSubmit={onSubmit}>
                    <header>
                        <h1>Adicionar veículo</h1>
                        <button onClick={handleBack}>Voltar</button>
                    </header>

                    <Section>

                        <label 
                            htmlFor="brand" 
                            className={
                                imgBrandRef.current && imgBrandRef.current.disabled ? 'disabled' : ''
                            }
                        >
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

                        <InputSelect title="Selecione uma marca" group="brands" options={optionsBrands} onSelect={handleSelectBrand} />

                        <Input ref={newBrandRef} id="new-brand" placeholder="Adicione uma nova marca" />

                        <label htmlFor="vehicle">
                            {imgVehiclePreview ? (
                                <img src={imgVehiclePreview} alt="Imagem do veículo" />
                            ) : (
                                <span>Imagem do veículo</span>
                            )}

                            <input
                                id="vehicle" 
                                type="file"
                                onChange={(e) => handleImageChange(e, setImgVehiclePreview)}
                            />
                        </label>

                        <Input name="vehicleName" placeholder="Nome do veículo" required />
                        <Input type="number" name="year" placeholder="Ano" required />
                        <Input type="number" name="price" placeholder="Preço" required />
                        <Input type="number" step="0.01" name="velocity" placeholder="Tempo de 0 a 100 km/h" required />
                        <Input type="number" name="trunkCapacity" placeholder="Cap. do porta malas (L)" required />
                        <Input type="number" name="weight" placeholder="Peso (Kg)" required />

                        <InputSelect title="Selecione o tipo de propulsão" group="fuel" options={optionsFuel} onSelect={handleSelectFuel} required />
                        <Input type="number" ref={tankCapacityRef} name="tankCapacity" placeholder="Cap. do tanque de combustível (L)" required disabled />
                        <Input type="number" step="0.01" ref={consumptionAlcoholRef} name="consumption-a" placeholder="Consumo médio - Km/l (A)" disabled />
                        <Input type="number" step="0.01" ref={consumptionGasolineRef} name="consumption-g" placeholder="Consumo médio - Km/l (G)" disabled />
                        <Input type="number" ref={autonomyAlcoholRef} name="autonomyAlcohol" placeholder="Autonomia - Km (Álcool)" disabled />
                        <Input type="number" ref={autonomyGasolineRef} name="autonomyGasoline" placeholder="Autonomia - Km (Gasolina)" disabled />
                        <Input type="number" ref={autonomyEletricRef} name="autonomyEletric" placeholder="Autonomia - Km (Elétrico)" required disabled />

                    </Section>

                    {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}

                    <Button title="Cadastrar" $border="true" />
                    
                </Form>
            </main>
        </Container>
    );
}