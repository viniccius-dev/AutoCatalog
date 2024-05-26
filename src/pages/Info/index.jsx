import { FiArrowRight } from 'react-icons/fi';

import { Container, Content, Background, Layer } from './styles';

import { Header } from '../../components/Header';
import { Table } from '../../components/Table';
import { InputSelect } from '../../components/InputSelect';

import imgCar from '../../assets/corsa.png'

export function Info() {
    const options = [
        {id: 1, name: 'Celta'},
        {id: 2, name: 'Astra'}
    ];

    return(
        <Container>
            <Header />

            <Background>
                <Layer>
                    <Content>

                        <Table />
                        <div>
                            <InputSelect title="Celta" group="cars" options={options}  />

                            <img src={imgCar} />

                            <button>
                                Realizar comparação
                                <FiArrowRight />
                            </button>
                        </div>
                        
                    </Content>
                </Layer>
            </Background>
        </Container>
    );
}