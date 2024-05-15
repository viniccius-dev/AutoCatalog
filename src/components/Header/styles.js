import styled from 'styled-components';

export const Container = styled.header`
    height: 90px;
    width: 100%;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 5%;

    > img {
        width: 100px;
        height: 75px;
    }
`;