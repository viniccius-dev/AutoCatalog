import { Container, Form, Section } from './styles';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import API from '../../helpers/api'; // Importe a API

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';

export function New() {

    const options = [];

    const imgBrandRef = useRef(null);
    const newBrandRef = useRef(null);

    const [imgBrandPreview, setImgBrandPreview] = useState(null);
    const [imgVehiclePreview, setImgVehiclePreview] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);


    const handleImageChange = (e, setImagePreview) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSelect = (option) => {
        console.log('Selected option:', option);
        setSelectedOption(option);

        // Desabilite os inputs referenciados
        if (imgBrandRef.current) {
            imgBrandRef.current.disabled = true;
        }
        if (newBrandRef.current) {
            newBrandRef.current.disabled = true;
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('brandImage', imgBrandRef.current.files[0]);
        formData.append('vehicleImage', document.querySelector('#vehicle').files[0]);
        formData.append('brand', selectedOption ? selectedOption.name : newBrandRef.current.value);
        formData.append('vehicleName', e.target.vehicleName.value);
        formData.append('year', e.target.year.value);
        formData.append('price', e.target.price.value);
        formData.append('velocity', e.target.velocity.value);
        formData.append('consumption', e.target.consumption.value);
        formData.append('tankCapacity', e.target.tankCapacity.value);
        formData.append('trunkCapacity', e.target.trunkCapacity.value);
        formData.append('weight', e.target.weight.value);

        try {
            await API.createVehicle(formData);
        } catch (error) {
            console.error('Erro ao criar veículo:', error);
        }
    }

    return (
        <Container>
            <Header />

            <main>
                <Form onSubmit={onSubmit}>
                    <header>
                        <h1>Adicionar veículo</h1>
                        <Link to="/">Voltar</Link>
                    </header>

                    <Section>

                        <label id="img-brand" htmlFor="brand">
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

                        <InputSelect title="Selecione uma marca" group="marcas" options={options} onSelect={handleSelect} />

                        <Input ref={newBrandRef} id="new-brand" placeholder="Adicione uma nova marca" />

                        <label htmlFor="vehicle">
                            {imgVehiclePreview ? (
                                <img src={imgVehiclePreview} alt="Imagem do veículo" />
                            ) : (
                                <span>Imagem do veículo</span>
                            )}

                            <input
                                // disabled
                                id="vehicle" 
                                type="file"
                                onChange={(e) => handleImageChange(e, setImgVehiclePreview)}
                            />
                        </label>

                        <Input name="vehicleName" placeholder="Nome do veículo" />
                        <Input name="year" placeholder="Ano" />
                        <Input name="price" placeholder="Preço" />
                        <Input name="velocity" placeholder="Tempo de 0 a 100 km/h" />
                        <Input name="consumption" placeholder="Consumo médio" />
                        <Input name="tankCapacity" placeholder="Cap. do tanque de combustível" />
                        <Input name="trunkCapacity" placeholder="Cap. do porta malas" />
                        <Input name="weight" placeholder="Peso (Kg)" />

                    </Section>

                    <Button title="Cadastrar" $border="true" />
                    
                </Form>
            </main>
        </Container>
    );
}