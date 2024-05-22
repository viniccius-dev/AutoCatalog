import { Container, Form } from './styles';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';

export function New() {

    const options = [];

    const handleSelect = (option) => {
        console.log('Selected option:', option);
    }
    

    return (
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Adicionar veículo</h1>
                        <Link to="/">Voltar</Link>
                    </header>

                    <label className="" htmlFor="brand">
                        <FiPlus />
                        {/* <img src="https://github.com/viniccius-dev.png" alt="Imagem da marca" /> */}

                        <input
                            // disabled
                            id="brand" 
                            type="file"
                         />
                    </label>

                    <InputSelect title="Selecione uma marca" group="marcas" options={options} onSelect={handleSelect} />

                    <Input placeholder="Adicione uma nova marca" />
                </Form>
            </main>
        </Container>
    );
}