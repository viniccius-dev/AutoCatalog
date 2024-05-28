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

    const [imgBrandPreview, setImgBrandPreview] = useState(null);
    const [selectedOptionBrand, setSelectedOptionBrand] = useState(null);
    const [imgVehiclePreview, setImgVehiclePreview] = useState(null);
    const [selectedOptionVehicle, setSelectedOptionVehicle] = useState(null);

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

                        

                    </UpdateVehicle>
                </Form>
            </main>
        </Container>
    );
}