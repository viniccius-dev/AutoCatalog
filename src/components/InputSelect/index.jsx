import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

import { Container, SelectButton, Chevrons, OptionsList, Option } from './styles';
import { useState, useEffect } from 'react';


export function InputSelect({ title, group, options, onSelect, selected }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected || null);

    const optionName = group !== 'vehicle' ? 'name' : 'VehName';

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {
        setSelectedOption(selected);
    }, [selected])

    return (
        <Container>
            <SelectButton onClick={toggleDropdown}>
                <div>
                    {selectedOption ? selectedOption[optionName] : title}
                </div>

                <Chevrons>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </Chevrons>
            </SelectButton>

            {isOpen && (
                <OptionsList>
                    {options.map(option => (
                        <Option key={option.id} onClick={() => handleSelect(option)}>
                            <input 
                                type="radio"
                                name={group}
                                value={option[optionName]}
                                checked={selectedOption && selectedOption[optionName] === option[optionName]}
                                readOnly
                            />
                            <span>{option[optionName]}</span>
                            {selectedOption && selectedOption[optionName] === option[optionName] && <FiCheck />}
                        </Option>
                    ))}
                </OptionsList>
            )}
        </Container>
    );
}