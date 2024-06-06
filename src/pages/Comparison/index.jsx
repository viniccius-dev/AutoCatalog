import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";

import { Container, Content, Background, Layer } from './styles';

import { API } from '../../helpers/api';
import storage from "../../helpers/storage";

import { Header } from '../../components/Header';
import { Table } from '../../components/Table';
import { DisplayMessage } from "../../components/DisplayMessage";

export function Comparison() {
    const profile = storage.get("profile");
    const [listCars, setListCars] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [currentComparison, setCurrentComparison] = useState("");

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const [selectedCars, setSelectedCars] = useState([null, null]); // Two vehicles for comparison

    useEffect(() => {
        async function fetchVehicles() {
            const response = await API.renderCars();
            setListCars(response.cars);
        }

        fetchVehicles();
    }, [currentComparison]);

    useEffect(() => {
        if(currentComparison.isLiked) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
        console.log(currentComparison);
    }, [currentComparison]);

    const handleSelectVehicle = async (index, vehicle) => {
        const updatedSelectedCars = [...selectedCars];
        updatedSelectedCars[index] = vehicle;
        if(index === selectedCars.length - 1 && selectedCars.length < 4) {
            updatedSelectedCars.push(null);
        }
        setSelectedCars(updatedSelectedCars);

        if(profile) {
            try {
                const filterSelectedCars = updatedSelectedCars.filter(car => car !== null);
                if(filterSelectedCars.length < 2) {
                    return;
                }
                const response = await API.savehistory(filterSelectedCars);
                setCurrentComparison(response);
            } catch(error) {
                console.error('Não foi possível salvar no histórico:', error);
            }
        }
    }

    const handleRemoveVehicle = (index) => {
        const updatedSelectedCars = selectedCars.slice();
        updatedSelectedCars[index] = null;

        // Ensure at least two tables are always present
        const nonEmptyCars = updatedSelectedCars.filter(car => car !== null);
        if (nonEmptyCars.length < 3) {
            while (nonEmptyCars.length < 2) {
                nonEmptyCars.push(null);
            }
            setSelectedCars(nonEmptyCars);
        } else {
            setSelectedCars(updatedSelectedCars);
        }
    }

    const compareAttributes = (attribute) => {
        const validCars = selectedCars.filter(car => car !== null && parseFloat(car[attribute]) !== 0);
        const allCars = selectedCars.filter(car => car !== null);

        if (validCars.length < 2) {
            validCars.push(...allCars.filter(car => !validCars.includes(car)));
        }

        if (validCars.length < 2) return {};

        const useMin = ['price','velocity', 'weight'];
        const values = validCars.map(car => parseFloat(car[attribute]));
        const bestValue = useMin.includes(attribute) ? Math.min(...values) : Math.max(...values);

        const comparisonResults = validCars.map(car => (parseFloat(car[attribute]) || 0) === bestValue);
        return selectedCars.map((car) => car ? comparisonResults[validCars.indexOf(car)] : null);
    }

    const handleChangeLike = async () => {
        const filterSelectedCars = selectedCars.filter(car => car !== null);

        if(filterSelectedCars.length < 2) { return };

        if(!isLike) {
            try {
                await API.addfavorites(currentComparison.data.id);
                setIsLike(true);
            } catch(error) {
                setType('error');

                if(error.message) {
                    setMessage(error.message);
                } else {
                    setMessage('Erro ao adicionar aos favoritos.')
                }
        
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
            }
        } else {
            try {
                await API.addfavorites(currentComparison.data.id);
                setIsLike(false);
            } catch(error) {
                setType('error');

                if(error.message) {
                    setMessage(error.message);
                } else {
                    setMessage('Erro ao remover dos favoritos.')
                }
        
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
            }
        }
    }

    return (
        <Container>
            <Header />

            <Background>
                <Layer>
                    <Content>
                        {showMessage && <DisplayMessage id="display-message" $type={type} message={message}/>}
                        <header>
                            <h2>Comparação</h2>
                            {profile && isLike ? <FaHeart onClick={handleChangeLike} /> : <FaRegHeart onClick={handleChangeLike} />} 
                        </header>

                        <main>
                            {/* <Table title={car.VehName} data={car} img /> */}
                            {selectedCars.map((car, index) => (
                                <Table 
                                    key={index}
                                    title={car?.VehName || "Selecionar"}
                                    data={car}
                                    list={listCars}
                                    onSelect={(vehicle) => handleSelectVehicle(index, vehicle)}
                                    onRemove={() => handleRemoveVehicle(index)}
                                    comparison={compareAttributes}
                                    index={index}
                                    img
                                />
                            ))}
                        </main>
                    </Content>
                </Layer>
            </Background>
        </Container>
    )
}