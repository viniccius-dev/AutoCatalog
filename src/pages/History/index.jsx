import { useEffect, useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { Container } from './styles';
import { Header } from '../../components/Header';

import { API, ApiBase } from "../../helpers/api";

export function History() {
    const [listComparison, setListComparison] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.renderhistory();
                setListComparison(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do histórico:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Header />

            <main>
                <header>
                    <h1>Histórico</h1>
                    <button><FaRegHeart /> Favoritos</button>
                </header>

                <section>
                    {
                        !listComparison ?

                        <h3>Não há nenhum histórico de comparativos</h3>

                        :

                        listComparison.map(comparison => (
                            <div key={comparison.id} className="card">
                                <div className="cars">
                                    {comparison.car_1 && 
                                        <img 
                                            src={`${ApiBase}/media/vehicle/${comparison.car_1.vehicleImage}`}
                                            alt={comparison.car_1.vehicleName}
                                        />}     
                                    {comparison.car_2 && 
                                        <img 
                                            src={`${ApiBase}/media/vehicle/${comparison.car_2.vehicleImage}`}
                                            alt={comparison.car_2.vehicleName}
                                        />
                                    }     
                                    {comparison.car_3 && 
                                        <img 
                                            src={`${ApiBase}/media/vehicle/${comparison.car_3.vehicleImage}`} 
                                            alt={comparison.car_3.vehicleName}
                                        />
                                    }     
                                    {comparison.car_4 && 
                                        <img 
                                            src={`${ApiBase}/media/vehicle/${comparison.car_4.vehicleImage}`} 
                                            alt={comparison.car_4.vehicleName}
                                        />
                                    }     
                                </div>
                                    
                                <h3>Comparativo</h3>
                            </div>
                        ))
                    }
                </section>
            </main>
        </Container>
    );
}