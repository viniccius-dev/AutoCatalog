import { useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Container, Form, UpdateBrand, UpdateVehicle } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';
import { DisplayMessage } from '../../components/DisplayMessage';

import { API, ApiImages } from '../../helpers/api';

export function UpdateVec() {
    const optionsFuel = [
        { id: 1, name: 'Combustão' },
        { id: 2, name: 'Elétrico' },
        { id: 3, name: 'Híbrido' }
    ];

    const navigate = useNavigate();

    // Form hooks for brand and vehicle
    const { register: registerBrand, handleSubmit: handleSubmitBrand, setValue: setValueBrand } = useForm();
    const { register: registerVehicle, handleSubmit: handleSubmitVehicle, setValue: setValueVehicle } = useForm();

    const imgBrandRef = useRef(null);
    const imgVehicleRef = useRef(null);
    const yearRef = useRef(null);
    const priceRef = useRef(null);
    const velocityRef = useRef(null);
    const trunkCapacityRef = useRef(null);
    const weightRef = useRef(null);
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
    const [originalOptionsVehicles, setOriginalOptionsVehicles] = useState([]);

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageChange = useCallback((e, setImagePreview, setValue) => {
        const file = e.target.files[0];
        const value = e.target.id !== 'vehicle' ? 'img' : 'VehImg';
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setValue(value, file);
        }
    }, []);

    const handleSelectBrand = useCallback((option) => {
        setSelectedOptionBrand(option);
        setImgBrandPreview(`${ApiImages}/media/brand/${option.img}`);
    }, []);

    const handleSelectVehicle = useCallback((option) => {
        setSelectedOptionVehicle(option);
        setImgVehiclePreview(`${ApiImages}/media/vehicle/${option.VehImg}`);

        yearRef.current.value = option.year;
        priceRef.current.value = option.price;
        velocityRef.current.value = option.velocity;
        trunkCapacityRef.current.value = option.trunkCapacity;
        weightRef.current.value = option.weight;
        
        handleSelectFuel({ name: option.fuelType });
        
        
        tankCapacityRef.current.value = option.tankCapacity;
        consumptionAlcoholRef.current.value = option.consumptionAlcohol;
        consumptionGasolineRef.current.value = option.consumptionGasoline;
        autonomyAlcoholRef.current.value = option.autonomyAlcohol;
        autonomyGasolineRef.current.value = option.autonomyGasoline;
        autonomyEletricRef.current.value = option.autonomyEletric;
        setSelectedOptionFuel({ name: option.fuelType });
    }, []);

    const handleFilterVehicles = useCallback((option) => {
        const filteredVehicles = originalOptionsVehicles.filter(vehicle => vehicle.Brand === option.name);
        setOptionsVehicles(filteredVehicles);
    }, [originalOptionsVehicles]);

    const handleSelectFuel = useCallback((option) => {
        setSelectedOptionFuel(option);

        if (option.name === 'Combustão') {
            autonomyEletricRef.current.disabled = true;
            autonomyEletricRef.current.value = "";
            tankCapacityRef.current.disabled = false;
            consumptionAlcoholRef.current.disabled = false;
            consumptionGasolineRef.current.disabled = false;
        } else if (option.name === 'Elétrico') {
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

    const updateBrand = async (data) => {
        const formData = new FormData();
        if (selectedOptionBrand === null) {
            return console.error("Selecione uma marca");
        }

        formData.append('brandId', selectedOptionBrand.id);

        if (imgBrandPreview === `${ApiImages}/media/brand/${selectedOptionBrand.img}`) {
            delete data.img;
        }

        for (const key in data) {
            if(data[key]){
                formData.append(key, data[key]);
            }
        }

        try {
            const response = await API.updatebrand(formData);

            setType(response.status);
            setMessage(response.message);

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if(response.status === 'success') {
                    location.reload();
                }
            }, 5000);
        } catch (error) {
            console.error('Erro ao editar os dados:', error);
        }
    };

    const updateVehicle = async (data) => {
        const formData = new FormData();
        if (selectedOptionVehicle === null) {
            return console.error("Selecione um veículo");
        }

        formData.append('vehicleId', selectedOptionVehicle.id);

        if (imgVehiclePreview === `${ApiImages}/media/vehicle/${selectedOptionVehicle.VehImg}`) {
            delete data.VehImg;
        }

        for (const key in data) {
            if(data[key]){
                formData.append(key, data[key]);
            }
        }
        
        if(yearRef.current.value){
            formData.append('year', yearRef.current.value);
        }

        if(priceRef.current.value) {
            formData.append('price', priceRef.current.value);
        }
        
        if(velocityRef.current.value){
            formData.append('velocity', velocityRef.current.value.replace(',','.'));
        }

        if(trunkCapacityRef.current.value) {
            formData.append('trunkCapacity', trunkCapacityRef.current.value);
        }

        if(weightRef.current.value) {
            formData.append('weight', weightRef.current.value);
        }

        if(selectedOptionFuel !== null) {
            formData.append('fuelType', selectedOptionFuel.name);
            formData.append('tankCapacity', tankCapacityRef.current.disabled ? 'N/A' : tankCapacityRef.current.value);
            formData.append('autonomyAlcohol', autonomyAlcoholRef.current.value);
            formData.append('autonomyGasoline', autonomyGasolineRef.current.value);
            formData.append('autonomyEletric', autonomyEletricRef.current.disabled ? 'N/A' : autonomyEletricRef.current.value);
            formData.append('consumptionAlcohol', consumptionAlcoholRef.current.disabled ? 'N/A' : consumptionAlcoholRef.current.value.replace(',', '.'));
            formData.append('consumptionGasoline', consumptionGasolineRef.current.disabled ? 'N/A' : consumptionGasolineRef.current.value.replace(',', '.'));
        }
        
    
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        // return;

        try {
            const response = await API.updatevehicle(formData);

            setType(response.status);
            setMessage(response.message);

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if(response.status === 'success') {
                    location.reload();
                }
            }, 2000);
        } catch (error) {
            console.error('Erro ao editar os dados:', error);
        }
    };

    async function handleDeleteBrand() {
        if (selectedOptionBrand === null) {
            return console.error("Selecione uma marca");
        }

        const confirm = window.confirm("Deseja realmente deletar essa marca? Todos veículos cadastrados nela também serão excluídos permanentemente e não poderão ser recuperados.");

        if(confirm) {
            const response = await API.deletebrand(selectedOptionBrand.id);

            setType(response.status);
            setMessage(response.message);

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if(response.status === 'success') {
                    location.reload();
                }
            }, 5000);
        }
    };

    async function handleDeleteVehicle() {
        if (selectedOptionVehicle === null) {
            return console.error("Selecione uma veículo");
        }

        const confirm = window.confirm("Deseja realmente deletar esse veículo? Os dados não poderão ser recuperados.");

        if(confirm) {
            const response = await API.deletevehicle(selectedOptionVehicle.id);

            setType(response.status);
            setMessage(response.message);

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if(response.status === 'success') {
                    location.reload();
                }
            }, 5000);
        }
    }

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
                setOriginalOptionsVehicles(dataVehicles.cars);
            } catch (error) {
                console.error('Erro ao buscar dados dos veículos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateAutonomy = () => {
            const tankCapacity = parseFloat(tankCapacityRef.current.value.replace(',', '.')) || 0;
            const consumptionAlcohol = parseFloat(consumptionAlcoholRef.current.value.replace(',', '.')) || 0;
            const consumptionGasoline = parseFloat(consumptionGasolineRef.current.value.replace(',', '.')) || 0;

            if (tankCapacity > 0 && consumptionAlcohol > 0) {
                setAutonomyAlcohol((tankCapacity * consumptionAlcohol).toFixed());
            } else {
                setAutonomyAlcohol(null);
            }

            if (tankCapacity > 0 && consumptionGasoline > 0) {
                setAutonomyGasoline((tankCapacity * consumptionGasoline).toFixed());
            } else {
                setAutonomyGasoline(null);
            }
        };

        const inputs = [
            tankCapacityRef.current,
            consumptionAlcoholRef.current,
            consumptionGasolineRef.current,
        ].filter(input => input !== null);

        inputs.forEach(input => {
            input.addEventListener('input', updateAutonomy);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('input', updateAutonomy);
            });
        };
    }, []);

    useEffect(() => {
        if (autonomyAlcoholRef.current) {
            autonomyAlcoholRef.current.value = autonomyAlcohol || "";
        }

        if (autonomyGasolineRef.current) {
            autonomyGasolineRef.current.value = autonomyGasoline || "";
        }
    }, [autonomyAlcohol, autonomyGasoline]);

    return (
        <Container>
            <Header />

            <main>

                <Form onSubmit={handleSubmitBrand(updateBrand)}>
                {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}
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
                                onChange={(e) => handleImageChange(e, setImgBrandPreview, setValueBrand)}
                            />
                        </label>

                        <InputSelect
                            title="Selecione uma marca"
                            group="marcas"
                            options={optionsBrands}
                            onSelect={handleSelectBrand}
                        />

                        <Input
                            name="nameBrand"
                            placeholder="Atualizar o nome da marca"
                            {...registerBrand("newName")}
                        />

                        <Button
                            title="Atualizar"
                            $border="true"
                            type="submit"
                        />
                        <Button 
                            title="Deletar" 
                            $border="true" 
                            type="button" 
                            onClick={handleDeleteBrand} 
                        />
                    </UpdateBrand>
                </Form>

                <Form onSubmit={handleSubmitVehicle(updateVehicle)}>
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
                                onChange={(e) => handleImageChange(e, setImgVehiclePreview, setValueVehicle)}
                            />
                        </label>

                        <InputSelect 
                            title="Selecione uma marca" 
                            group="brands" 
                            options={optionsBrands} 
                            onSelect={handleFilterVehicles}                             
                        />

                        <InputSelect 
                            title="Selecione uma veículo" 
                            group="vehicle" 
                            options={optionsVehicles} 
                            onSelect={handleSelectVehicle} 
                        />

                        <Input 
                            name="vehicleName" 
                            placeholder="Atualizar nome" 
                            {...registerVehicle("newName")} 
                        />
                        <Input 
                            type="number" 
                            name="year" 
                            placeholder="Atualizar ano" 
                            ref={yearRef}
                        />
                        <Input 
                            type="number" 
                            name="price" 
                            placeholder="Atualizar preço" 
                            ref={priceRef}
                        />
                        <Input 
                            type="number" 
                            step="0.01" 
                            name="velocity" 
                            placeholder="Atualizar tempo de 0 a 100 km/h" 
                            ref={velocityRef} 
                        />
                        <Input 
                            type="number" 
                            name="trunkCapacity" 
                            placeholder="Atualizar cap. do porta malas (L)" 
                            ref={trunkCapacityRef}
                        />
                        <Input 
                            type="number" 
                            name="weight" 
                            placeholder="Atualizar peso (Kg)" 
                            ref={weightRef}
                        />

                        <InputSelect
                            title="Atualize o tipo de propulsão"
                            group="fuel"
                            options={optionsFuel}
                            onSelect={handleSelectFuel}
                            selected={selectedOptionFuel}
                        />
                        <Input
                            type="number"
                            ref={tankCapacityRef}
                            name="tankCapacity"
                            placeholder="Cap. do tanque de combustível (L)"
                            required
                            disabled
                        />
                        <Input
                            type="number"
                            step="0.01"
                            ref={consumptionAlcoholRef}
                            name="consumption-a"
                            placeholder="Consumo médio - Km/l (A)"
                            required
                            disabled
                        />
                        <Input
                            type="number"
                            step="0.01"
                            ref={consumptionGasolineRef}
                            name="consumption-g"
                            placeholder="Consumo médio - Km/l (G)"
                            required
                            disabled
                        />
                        <Input
                            type="number"
                            ref={autonomyAlcoholRef}
                            name="autonomyAlcohol"
                            placeholder="Autonomia - Km (Álcool)"
                            disabled
                        />
                        <Input
                            type="number"
                            ref={autonomyGasolineRef}
                            name="autonomyGasoline"
                            placeholder="Autonomia - Km (Gasolina)"
                            disabled
                        />
                        <Input
                            type="number"
                            ref={autonomyEletricRef}
                            name="autonomyEletric"
                            placeholder="Autonomia - Km (Elétrico)"
                            required
                            disabled
                        />

                        <Button
                            title="Atualizar"
                            $border="true"
                            type="submit"
                        />
                        <Button 
                            title="Deletar" 
                            $border="true"
                            type="button"
                            onClick={handleDeleteVehicle} 
                        />
                    </UpdateVehicle>
                </Form>
            </main>
        </Container>
    );
}