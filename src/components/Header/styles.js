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

    > a {
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }

    > div:first-of-type {
        a {
            padding: 0 10px;
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
        }

        a:hover, a.active {
            font-weight: 900;
        }
    }

    > img {
        width: 100px;
        height: 75px;
    }
`;