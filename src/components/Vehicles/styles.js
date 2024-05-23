import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background: rgba(0,0,0,0.7);
`;

export const Container = styled.div`
    position: relative;
    overflow-x: hidden;

    margin: 10px 0;

    display: grid;
    grid-template-rows: 60px auto;
    grid-template-areas:
    "header"
    "content";

    width: 80%;
    height: 500px;
    max-width: 700px;
    border-radius: 15px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};

    > header {
        grid-area: header;
        width: 100%;
        text-align: center;
        padding: 16px 0;

        background-color: ${({ theme }) => theme.COLORS.BLUE_100};
        color: ${({ theme }) => theme.COLORS.WHITE};

        > svg {
            position: absolute;
            font-size: 25px;
            right: 18px;
            top: 18px;
            cursor: pointer;
        }
    }

    
`;

export const Content = styled.div`
    grid-area: content;
    width: 100%;

    display: grid;
    grid-auto-rows: 250px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;

    padding: 20px;

    overflow-y: auto;

    > div img {
        width: 175px;
    }
`;