import styled from "styled-components";
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
    width: 700px;
    margin: 0 auto;
    padding: 50px;

    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.GRAY_100};
    border-radius: 35px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};

    display: flex;
    justify-content: center;
    text-align: center;
    gap: 40px;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div div {
            background-color: ${({ theme }) => theme.COLORS.BLUE_100};

            svg {
                color: ${({ theme }) => theme.COLORS.WHITE};
            }
        }

        > button {
            border: none;
            background: none;

            font-size: 19px;
            font-weight: 600;

            color: ${({ theme }) => theme.COLORS.BLUE_100};

            display: flex;
            align-items: center;
            justify-content: space-evenly;

            > svg {
                font-size: 21px;
            }
        }
    }
`;