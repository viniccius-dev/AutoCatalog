import styled from 'styled-components';

export const Container = styled.div`
    cursor: pointer;
    transition: filter 0.2s;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 30px;

    &:hover {
        filter: brightness(0.9);
    }

    > img {
        width: 128px;
        height: 128px;
    }
`;