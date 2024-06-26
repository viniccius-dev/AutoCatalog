import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { Container } from './styles';
import { Header } from '../../components/Header';
import { API, ApiImages } from "../../helpers/api";

export function History() {
    const [listComparison, setListComparison] = useState([]);
    const [pagesHistory, setPagesHistory] = useState(0);
    const [pagesFavorites, setPagesFavorites] = useState(0);
    const [favorites, setFavorites] = useState(false);
    const [currentPageHistory, setCurrentPageHistory] = useState(0);
    const [currentPageFavorites, setCurrentPageFavorites] = useState(0);
    const [visiblePages, setVisiblePages] = useState([]);

    const navigate = useNavigate();

    const handleViewFavorites = () => {
        if (!favorites) {
            setFavorites(true);
            setCurrentPageFavorites(0);
            fetchFavoritesData(0);
        } else {
            setFavorites(false);
            setCurrentPageHistory(0);
            fetchHistoryData(0);
        }
    };

    const fetchHistoryData = async (page = 0) => {
        try {
            const dataHistories = await API.renderhistory(page);
            setListComparison(dataHistories.data || []);
            setPagesHistory(dataHistories.pages || 1);
            setVisiblePages(getVisiblePages(page, dataHistories.pages || 1));
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const fetchFavoritesData = async (page = 0) => {
        try {
            const dataFavorites = await API.renderLikes(page);
            setListComparison(dataFavorites.likes || []);
            setPagesFavorites(dataFavorites.pages || 1);
            setVisiblePages(getVisiblePages(page, dataFavorites.pages || 1));
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < (favorites ? pagesFavorites : pagesHistory)) {
            if (favorites) {
                setCurrentPageFavorites(newPage);
                fetchFavoritesData(newPage);
            } else {
                setCurrentPageHistory(newPage);
                fetchHistoryData(newPage);
            }
            setVisiblePages(getVisiblePages(newPage, favorites ? pagesFavorites : pagesHistory));
        }
    };

    const handleCardClick = (comparison) => {
        const params = new URLSearchParams();
        if (comparison.car_1) params.append('car1', comparison.car_1.id);
        if (comparison.car_2) params.append('car2', comparison.car_2.id);
        if (comparison.car_3) params.append('car3', comparison.car_3.id);
        if (comparison.car_4) params.append('car4', comparison.car_4.id);
        navigate(`/comparison?${params.toString()}`);
    };

    const getVisiblePages = (page, totalPages) => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
        if (page <= 2) return [0, 1, 2, 3, 4];
        if (page >= totalPages - 3) return Array.from({ length: 5 }, (_, i) => totalPages - 5 + i);
        return Array.from({ length: 5 }, (_, i) => page - 2 + i);
    };

    useEffect(() => {
        fetchHistoryData(currentPageHistory);
    }, []);

    const renderComparisons = () => {
        return listComparison.length > 0 ? listComparison.map(comparison => {
            const { car_1, car_2, car_3, car_4 } = comparison;
            const anyCarIsFalse = [car_1, car_2, car_3, car_4].some(car => car === false);

            return (
                <div key={comparison.id} className={`card ${anyCarIsFalse ? 'inactive' : ''}`} onClick={!anyCarIsFalse ? () => handleCardClick(comparison) : null}>
                    <div className="cars">
                        {anyCarIsFalse ? (
                            <p>Comparação de veículo não encontrada</p>
                        ) : (
                            <>
                                {car_1 !== null && (
                                    <img 
                                        src={`${ApiImages}/media/vehicle/${car_1.vehicleImage}`}
                                        alt={car_1.vehicleName}
                                        title={car_1.vehicleName}
                                    />     
                                )}
                                {car_2 !== null && (
                                    <img 
                                        src={`${ApiImages}/media/vehicle/${car_2.vehicleImage}`}
                                        alt={car_2.vehicleName}
                                        title={car_2.vehicleName}
                                    />     
                                )}
                                {car_3 !== null && (
                                    <img 
                                        src={`${ApiImages}/media/vehicle/${car_3.vehicleImage}`} 
                                        alt={car_3.vehicleName}
                                        title={car_3.vehicleName}
                                    />     
                                )}
                                {car_4 !== null && (
                                    <img 
                                        src={`${ApiImages}/media/vehicle/${car_4.vehicleImage}`} 
                                        alt={car_4.vehicleName}
                                        title={car_4.vehicleName}
                                    />     
                                )}
                            </>
                        )}
                    </div>
                    <h3>Comparativo</h3>
                </div>
            );
        }) : <h3>Não há nenhum histórico de comparativos</h3>;
    };

    const totalPages = favorites ? pagesFavorites : pagesHistory;
    const currentPage = favorites ? currentPageFavorites : currentPageHistory;

    return (
        <Container>
            <Header />

            <main>
                <header>
                    <h1>Histórico</h1>
                    <button onClick={handleViewFavorites}>
                        {!favorites ? <FaRegHeart /> : <FaHeart />} Favoritos
                    </button>
                </header>

                <section>
                    {renderComparisons()}
                </section>

                <footer>
                    <button className="btnPages" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        <FaArrowLeft /> Anterior
                    </button>
                    <div className="pages">
                        {visiblePages.map((page, index) => (
                            <button 
                                key={index} 
                                onClick={() => handlePageChange(page)} 
                                disabled={page >= totalPages || page < 0}
                                className={page === currentPage ? 'active' : ''}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                    <button className="btnPages" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage + 1 === totalPages}>
                        Próxima <FaArrowRight />
                    </button>
                </footer>
            </main>
        </Container>
    );
}