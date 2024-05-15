import styled from 'styled-components';

export const Container = styled.div`
    cursor: pointer;
    transition: filter 0.2s;
    
    height: 250px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 30px;

    &:hover {
        filter: brightness(0.9);
    }
`;