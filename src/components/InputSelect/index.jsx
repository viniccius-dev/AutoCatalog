import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

import { SelectButton, Chevrons, OptionsList, Option } from './styles';
import { useState } from 'react';

export function InputSelect({ title, group, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    }

    return (
        <>
            <SelectButton onClick={toggleDropdown}>
                <div>
                    {selectedOption ? selectedOption.name : title}
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
                                value={option.name}
                                checked={selectedOption && selectedOption.name === option.name}
                                readOnly
                            />
                            <span>{option.name}</span>
                            {selectedOption && selectedOption.name === option.name && <FiCheck />}
                        </Option>
                    ))}
                </OptionsList>
            )}
        </>
    );
}