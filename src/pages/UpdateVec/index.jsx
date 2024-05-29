import { useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Container, Form, UpdateBrand, UpdateVehicle } from './styles';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';

import { API, ApiBase } from '../../helpers/api';

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

    const updateBrand = async (data) => {
        const formData = new FormData();
        if (selectedOptionBrand === null) {
            return console.error("Selecione uma marca");
        }

        delete data.img;
        formData.append('brandId', selectedOptionBrand.id);

        for (const key in data) {
            if(data[key]){
                formData.append(key, data[key]);
            }
        }

        if (imgBrandPreview !== `${ApiBase}/media/brand/${selectedOptionBrand.img}`) {
            formData.append('img', imgBrandRef.current.files[0]);
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

        delete data.img;
        delete data.VehImg;
        formData.append('vehicleId', selectedOptionVehicle.id);

        if (imgVehiclePreview !== `${ApiBase}/media/vehicle/${selectedOptionVehicle.VehImg}`) {
            formData.append('VehImg', imgVehicleRef.current.files[0]);
        }

        for (const key in data) {
            if(data[key]){
                formData.append(key, data[key]);
            }
        }
        
        if(selectedOptionFuel !== null) {
            formData.append('fuelType', selectedOptionFuel);
            formData.append('tankCapacity', tankCapacityRef.current.disabled ? 'N/A' : tankCapacityRef.current.value);
            formData.append('autonomyAlcohol', autonomyAlcoholRef.current.value);
            formData.append('autonomyGasoline', autonomyGasolineRef.current.value);
            formData.append('autonomyEletric', autonomyEletricRef.current.disabled ? 'N/A' : autonomyEletricRef.current.value);
            formData.append('consumptionAlcohol', consumptionAlcoholRef.current.disabled ? 'N/A' : consumptionAlcoholRef.current.value);
            formData.append('consumptionGasoline', consumptionGasolineRef.current.disabled ? 'N/A' : consumptionGasolineRef.current.value);
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
            }, 5000);
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
            await API.deletevehicle(selectedOptionVehicle.id);

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
                {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}

                <Form onSubmit={handleSubmitBrand(updateBrand)}>
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
                                {...registerBrand("img")}
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
                                {...registerVehicle("img")}
                                onChange={(e) => handleImageChange(e, setImgVehiclePreview, setValueVehicle)}
                            />
                        </label>

                        <InputSelect title="Selecione uma marca" group="brands" options={optionsBrands} onSelect={handleFilterVehicles} />
                        <InputSelect title="Selecione uma veículo" group="vehicle" options={optionsVehicles} onSelect={handleSelectVehicle} />

                        <Input name="vehicleName" placeholder="Atualizar nome" {...registerVehicle("newName")} />
                        <Input name="year" placeholder="Atualizar ano" {...registerVehicle("year")} />
                        <Input name="price" placeholder="Atualizar preço" {...registerVehicle("price")} />
                        <Input name="velocity" placeholder="Atualizar tempo de 0 a 100 km/h" {...registerVehicle("velocity")} />
                        <Input name="trunkCapacity" placeholder="Atualizar cap. do porta malas (L)" {...registerVehicle("trunkCapacity")} />
                        <Input name="weight" placeholder="Atualizar peso (Kg)" {...registerVehicle("weight")} />

                        <InputSelect
                            title="Atualize o tipo de propulsão"
                            group="fuel"
                            options={optionsFuel}
                            onSelect={handleSelectFuel}
                        />
                        <Input
                            ref={tankCapacityRef}
                            name="tankCapacity"
                            placeholder="Cap. do tanque de combustível (L)"
                            required
                            disabled
                        />
                        <Input
                            ref={consumptionAlcoholRef}
                            name="consumption-a"
                            placeholder="Consumo médio - Km/l (A)"
                            required
                            disabled
                        />
                        <Input
                            ref={consumptionGasolineRef}
                            name="consumption-g"
                            placeholder="Consumo médio - Km/l (G)"
                            required
                            disabled
                        />
                        <Input
                            ref={autonomyAlcoholRef}
                            name="autonomyAlcohol"
                            placeholder="Autonomia - Km (Álcool)"
                            disabled
                        />
                        <Input
                            ref={autonomyGasolineRef}
                            name="autonomyGasoline"
                            placeholder="Autonomia - Km (Gasolina)"
                            disabled
                        />
                        <Input
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