import styled from 'styled-components';
import BackgroundImg from '../../assets/Background-info.jpg';

export const Container = styled.div`
    height: 100vh;

    display: grid;
    grid-template-rows: 90px auto;
    grid-template-areas:
    "header"
    "content";
`;

export const Background = styled.div`
    grid-area: content;
    overflow-y: auto;

    background: url(${BackgroundImg}) no-repeat center center;
    background-size: cover;
`;

export const Layer = styled.div`
    height: 100%;

    display: flex;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    width: 1000px;
    height: 90%;
    max-height: 836px;
    overflow-y: auto;

    margin: 0 auto;
    padding: 0 40px;

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.GRAY_100};
    border-radius: 8px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};

    > section {
        width: 630px;
        min-height: 830px;

        padding: 40px 0 40px 40px;

        border-left: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};

        > h2 {
            margin: 20px 0;
        }

        > main {
            display: grid;
            grid-auto-rows: 250px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 15px;

            padding-right: 10px;

            height: 625px;

            overflow-y: auto;
        }
    }
`

export const Filters = styled.nav`
    width: 280px;

    padding: 40px 40px 40px 0;

    > div {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
        padding: 10px;
        margin-bottom: 15px;
        border: ${({ theme }) => `1px solid ${theme.COLORS.BACKGROUND_600}`};
        border-radius: 10px;

        h3 {
            font-size: 20px;
            margin-bottom: 25px;
        }

        button {
            border: none;
            background: transparent;
            margin-top: 10px;
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    > div:last-of-type {
        margin-bottom: 0;
    }
`;

export const FilterNumbers = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > div {
        margin: 0;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        border: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};

        input {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

            &::placeholder { 
                color: ${({ theme }) => theme.COLORS.GRAY_100};
            }
        }
    }

    > span {
        font-size: 25px;
    }
`;

export const FilteredArrays = styled.ul`
    list-style-type: none;
`;