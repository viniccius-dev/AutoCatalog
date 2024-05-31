import { 
    Container,
    Background,
    Layer, 
    Content, 
    Filters, 
    FilterNumbers,
    FilteredArrays
} from './styles';

import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';

import { API, ApiBase } from '../../helpers/api';

export function Search() {
    const fuels = ['Combustão', 'Elétrico', 'Híbrido'];

    const navigate = useNavigate();
    
    const [search, setSearch] = useState("");
    const [valueMin, setValueMin] = useState("");
    const [valueMax, setValueMax] = useState("");
    const [consumptionMin, setConsumptionMin] = useState("");
    const [consumptionMax, setConsumptionMax] = useState("");
    const [brandsSelected, setBrandsSelected] = useState([]);
    const [yearsSelected, setYearsSelected] = useState([]);
    const [fuelsSelected, setFuelsSelected] = useState([]);

    const [brands, setBrands] = useState([]);
    const [carsYears, setCarsYears] = useState([]);
    const [cars, setCars] = useState([]);
    
    const uniqueYears = Array.from(new Set(carsYears.map(car => car.year))).sort();

    const [visibleCountBrands, setVisibleCountBrands] = useState(3);
    const [visibleCountYears, setVisibleCountYears] = useState(3);
    const [visibleCountFuels, setVisibleCountFuels] = useState(3);

    const loadMoreItems = (setVisibleCount) => {
        setVisibleCount(prevCount => prevCount + 5);
    }

    const handleValuesFilter = (e, setValue) => {
        setValue(e.target.value);
    }

    const handleOptionsFilter = (e, options, setSelected) => {
        const selected = e.target.value;
        const alreadySelected = options.includes(selected);

        if(alreadySelected) {
            const filterOption = options.filter(item => item !== selected);
            setSelected(filterOption);
        } else {
            setSelected(prevState => [...prevState, selected]);
        }
    } 

    const handleNavigateInfo = (id) => {
        navigate(`/info/${id}`);
    }

    useEffect(() => {
        async function fetchData() {
            const dataBrands = await API.renderBrands();
            const dataCars = await API.renderCars();
            setBrands(dataBrands.brands);
            setCarsYears(dataCars.cars);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchVehicles() {
            const filters = {
                search,
                valueMin,
                valueMax,
                consumptionMin,
                consumptionMax,
                brandsSelected,
                yearsSelected,
                fuelsSelected
            }
            
            const response = await API.renderFilters(filters);
            setCars(response.cars);
        }

        fetchVehicles();
    }, [
        search,
        valueMin,
        valueMax,
        consumptionMin,
        consumptionMax,
        brandsSelected,
        yearsSelected,
        fuelsSelected
    ]);

    return (
        <Container>
            <Header />

            <Background>
                <Layer>
                    <Content>
                        <Filters>
                            <div>
                                <h3>Preço</h3>

                                <FilterNumbers>
                                    <Input 
                                        type="number" 
                                        placeholder="Mínimo" 
                                        onChange={(e) => handleValuesFilter(e, setValueMin)} 
                                    />
                                    <span>-</span>
                                    <Input 
                                        type="number" 
                                        placeholder="Máximo" 
                                        onChange={(e) => handleValuesFilter(e, setValueMax)} 
                                    />
                                </FilterNumbers>
                            </div>

                            <div>
                                <h3>Marca</h3>

                                <FilteredArrays>
                                    {brands.slice(0, visibleCountBrands).map((brand, index) => (
                                        <li key={index}>
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    value={brand.id} 
                                                    name="brand"
                                                    onChange={(e) => handleOptionsFilter(e, brandsSelected, setBrandsSelected)} 
                                                />
                                                <span>{brand.name}</span>
                                            </label>
                                        </li>
                                    ))}
                                </FilteredArrays>

                                {visibleCountBrands < brands.length && (
                                    <button onClick={() => loadMoreItems(setVisibleCountBrands)}>Ver mais</button>
                                )}
                            </div>

                            <div>
                                <h3>Ano</h3>

                                <FilteredArrays>
                                    {uniqueYears.slice(0, visibleCountYears).map((year, index) => (
                                        <li key={index}>
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    value={year} 
                                                    name="year"
                                                    onChange={(e) => handleOptionsFilter(e, yearsSelected, setYearsSelected)} 
                                                />
                                                <span>{year}</span>
                                            </label>
                                        </li>
                                    ))}
                                </FilteredArrays>

                                {visibleCountYears < uniqueYears.length && (
                                    <button onClick={() => loadMoreItems(setVisibleCountYears)}>Ver mais</button>
                                )}
                            </div>

                            <div>
                                <h3>Consumo</h3>

                                <FilterNumbers>
                                    <Input 
                                        type="number" 
                                        placeholder="Mínimo" 
                                        onChange={(e) => handleValuesFilter(e, setConsumptionMin)} 
                                    />
                                    <span>-</span>
                                    <Input 
                                        type="number" 
                                        placeholder="Máximo" 
                                        onChange={(e) => handleValuesFilter(e, setConsumptionMax)} 
                                    />
                                </FilterNumbers>
                            </div>

                            <div>
                                <h3>Combustível</h3>

                                <FilteredArrays>
                                    {fuels.slice(0, visibleCountYears).map((fuel, index) => (
                                        <li key={index}>
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    value={fuel} 
                                                    name="fuel" 
                                                    onChange={(e) => handleOptionsFilter(e, fuelsSelected, setFuelsSelected)} 
                                                />
                                                <span>{fuel}</span>
                                            </label>
                                        </li>
                                    ))}
                                </FilteredArrays>

                                {visibleCountFuels < fuels.length && (
                                    <button onClick={() => loadMoreItems(setVisibleCountFuels)}>Ver mais</button>
                                )}
                            </div>
                        </Filters>

                        <section>
                            <Input 
                                placeholder="Pesquisar" 
                                icon={FiSearch} 
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <h2>Resultados <span>({cars.length})</span></h2>

                            <main>
                                {cars.map(car => (
                                    <Card 
                                        key={car.id} 
                                        title={car.VehName} 
                                        img={`${ApiBase}/media/vehicle/${car.VehImg}`} 
                                        onClick={() => handleNavigateInfo(car.id)}
                                        alt="vehicle" 
                                    />
                                ))}
                            </main>
                        </section>
                    </Content>
                </Layer>
            </Background>
        </Container>
    );
}