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
    background-color: rgba(0,0,0,0.5);
`;

export const Content = styled.div`
    min-width: 700px;
    max-height: 95%; 
    margin: 0 auto;
    padding: 50px;

    overflow-y: auto;

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.GRAY_100};
    border-radius: 8px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: ${({ theme }) => theme.COLORS.BLUE_100};

        svg {
            cursor: pointer;
            font-size: 25px;
            color: ${({ theme }) => theme.COLORS.LIGHT_RED};
        }
    }

    > main {
        display: flex;
        gap: 5px;

        padding-top: 20px;

        table {
            width: 300px;
        }
    }
`;