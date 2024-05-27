import { 
    Container,
    Background,
    Layer, 
    Content, 
    Filters, 
    FilterNumbers,
    FilteredArrays
} from './styles';

import { useState } from 'react';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

export function Search() {
    const brands = ['Ford', 'Honda', 'Fiat', 'Chevrolet', 'Toyota', 'Nissan', 'Volkswagen', 'BMW', 'Mercedes'];
    const years = [2000, 2001, 2003, 2004, 2005, 2006, 2007];

    const [visibleCountBrands, setVisibleCountBrands] = useState(3);
    const [visibleCountYears, setVisibleCountYears] = useState(3);

    const loadMoreItems = (setVisibleCount) => {
        setVisibleCount(prevCount => prevCount + 5);
    }

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
                                    <Input type="number" placeholder="Mínimo" />
                                    <span>-</span>
                                    <Input type="number" placeholder="Máximo" />
                                </FilterNumbers>
                            </div>

                            <div>
                                <h3>Marca</h3>

                                <FilteredArrays>
                                    {brands.slice(0, visibleCountBrands).map((brand, index) => (
                                        <li key={index}>
                                            <label>
                                                <input type="checkbox" value={brand} name="brand" />
                                                <span>{brand}</span>
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
                                    {years.slice(0, visibleCountYears).map((year, index) => (
                                        <li key={index}>
                                            <label>
                                                <input type="checkbox" value={year} name="brand" />
                                                <span>{year}</span>
                                            </label>
                                        </li>
                                    ))}
                                </FilteredArrays>

                                {visibleCountYears < years.length && (
                                    <button onClick={() => loadMoreItems(setVisibleCountYears)}>Ver mais</button>
                                )}
                            </div>

                            <div>
                                <h3>Consumo</h3>

                                <FilterNumbers>
                                    <Input type="number" placeholder="Mínimo" />
                                    <span>-</span>
                                    <Input type="number" placeholder="Máximo" />
                                </FilterNumbers>
                            </div>
                        </Filters>
                    </Content>
                </Layer>
            </Background>
        </Container>
    );
}