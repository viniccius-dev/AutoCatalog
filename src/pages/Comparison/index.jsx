import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

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
    const [selectedCars, setSelectedCars] = useState([null, null]);
    const location = useLocation();

    useEffect(() => {
        const fetchVehicles = async () => {
            const params = new URLSearchParams(location.search);
            const carIds = [
                params.get('car1'),
                params.get('car2'),
                params.get('car3'),
                params.get('car4')
            ].filter(Boolean);

            if (carIds.length > 0) {
                const carDataPromises = carIds.map(id => API.renderVehicle(id));
                const carsData = await Promise.all(carDataPromises);
                const updatedSelectedCars = carsData.map(car => car.vehicle).concat(Array(4 - carsData.length).fill(null));
                setSelectedCars(updatedSelectedCars.slice(0, carsData.length + 1));

                const filterSelectedCars = updatedSelectedCars.filter(car => car!== null);
                if (filterSelectedCars.length < 2) return;

                const response = await API.savehistory(filterSelectedCars);
                setCurrentComparison(response);
            }
        };

        fetchVehicles();
    }, [location.search]);

    useEffect(() => {
        async function fetchVehicles() {
            const response = await API.renderCars();
            setListCars(response.cars);
        }

        fetchVehicles();
    }, []);

    useEffect(() => {
        const filterSelectedCars = selectedCars.filter(car => car !== null);

        if (currentComparison.isLiked && filterSelectedCars.length >= 2) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [currentComparison, selectedCars]);

    const handleSelectVehicle = async (index, vehicle) => {
        const updatedSelectedCars = [...selectedCars];
        updatedSelectedCars[index] = vehicle;

        if (!updatedSelectedCars.includes(null) && updatedSelectedCars.length < 4) {
            updatedSelectedCars.push(null);
        }
        setSelectedCars(updatedSelectedCars);

        if (profile) {
            try {
                const filterSelectedCars = updatedSelectedCars.filter(car => car !== null);
                if (filterSelectedCars.length < 2) return;

                console.log(updatedSelectedCars, filterSelectedCars); //Mesma comparações para usuários diferentes

                const response = await API.savehistory(filterSelectedCars);
                setCurrentComparison(response);
            } catch (error) {
                console.error('Não foi possível salvar no histórico:', error);
            }
        }
    };

    const handleRemoveVehicle = async (index) => {
        const updatedSelectedCars = selectedCars.slice();
        updatedSelectedCars[index] = null;

        // Remove tabelas null extras, garantindo que haja pelo menos uma
        const nullCount = updatedSelectedCars.filter(car => car === null).length;
        if (nullCount > 1 && updatedSelectedCars.length > 2) {
            const lastNullIndex = updatedSelectedCars.lastIndexOf(null);
            updatedSelectedCars.splice(lastNullIndex, 1);
        }
        
        setSelectedCars(updatedSelectedCars);

        if (profile) {
            try {
                const filterSelectedCars = updatedSelectedCars.filter(car => car !== null);
                if (filterSelectedCars.length < 2) return;

                const response = await API.savehistory(filterSelectedCars);
                setCurrentComparison(response);
            } catch (error) {
                console.error('Não foi possível salvar no histórico:', error);
            }
        }
    };

    const compareAttributes = (attribute) => {
        const validCars = selectedCars.filter(car => car !== null && parseFloat(car[attribute]) !== 0);
        const allCars = selectedCars.filter(car => car !== null);

        if (validCars.length < 2) {
            validCars.push(...allCars.filter(car => !validCars.includes(car)));
        }

        if (validCars.length < 2) return {};

        const useMin = ['price', 'velocity', 'weight'];
        const values = validCars.map(car => parseFloat(car[attribute]));
        const bestValue = useMin.includes(attribute) ? Math.min(...values) : Math.max(...values);

        const comparisonResults = validCars.map(car => (parseFloat(car[attribute]) || 0) === bestValue);
        return selectedCars.map((car) => car ? comparisonResults[validCars.indexOf(car)] : null);
    };

    const handleChangeLike = async () => {
        const filterSelectedCars = selectedCars.filter(car => car !== null);
        if (filterSelectedCars.length < 2) return;

        try {
            await API.addfavorites(currentComparison.data.id);
            if (!isLike) {
                setIsLike(true);
            } else {
                setIsLike(false);
            }
        } catch (error) {
            setType('error');
            setMessage(error.message || 'Erro ao alterar o estado dos favoritos.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }
    };

    const renderTables = () => {
        const tables = selectedCars.map((car, index) => (
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
        ));

        if (selectedCars.length < 4 && !selectedCars.includes(null)) {
            tables.push(
                <Table
                    key={selectedCars.length}
                    title="Selecionar"
                    data={null}
                    list={listCars}
                    onSelect={(vehicle) => handleSelectVehicle(selectedCars.length, vehicle)}
                    comparison={compareAttributes}
                    index={selectedCars.length}
                    img
                />
            );
        }

        return tables;
    };

    return (
        <Container>
            <Header />
            <Background>
                <Layer>
                    <Content>
                        {showMessage && <DisplayMessage id="display-message" $type={type} message={message} />}
                        <header>
                            <h2>Comparação</h2>
                            {profile && (isLike ? <FaHeart onClick={handleChangeLike} /> : <FaRegHeart onClick={handleChangeLike} />)}
                        </header>
                        <main>
                            {renderTables()}
                        </main>
                    </Content>
                </Layer>
            </Background>
        </Container>
    );
}