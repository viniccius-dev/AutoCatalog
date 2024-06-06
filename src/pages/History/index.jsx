import { useEffect, useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { Container } from './styles';
import { Header } from '../../components/Header';

import { API, ApiBase } from "../../helpers/api";

export function History() {
    const [originHistory, setOriginHistory] = useState([]);
    const [listComparison, setListComparison] = useState([]);
    const [listFavorites, setListFavorites] = useState([]);
    const [pagesHistory, setPagesHistory] = useState(null);
    const [pagesFavorites, setPagesFavorites] = useState(null);
    const [favorites, setFavorites] = useState(false);

    const handleViewFavorites = () => {
        if(!favorites) {
            setListComparison(listFavorites);
            setFavorites(true);
        } else {
            setListComparison(originHistory);
            setFavorites(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataHistories = await API.renderhistory();
                const dataFavorites = await API.renderLikes();
                setOriginHistory(dataHistories.data);
                setListComparison(dataHistories.data);
                setListFavorites(dataFavorites.likes);
                setPagesHistory(dataHistories.pages);
                // setPagesFavorites(dataFavorites.pages);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
        console.log(originHistory, listFavorites);
    }, []);

    return (
        <Container>
            <Header />

            <main>
                <header>
                    <h1>Histórico</h1>
                    <button onClick={handleViewFavorites}>{!favorites ? <FaRegHeart /> : <FaHeart />} Favoritos</button>
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