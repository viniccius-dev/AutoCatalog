import styled from 'styled-components';

export const Container = styled.header`
    grid-area: header;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
`;

export const Wrapper = styled.div`
    max-width: 2000px;
    margin: 0 auto;

    height: 90px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 5%;

    > img {
        width: 100px;
        height: 75px;
    }
`;