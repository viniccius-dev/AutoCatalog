import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: grid;
    grid-template-rows: 95px auto;
    grid-template-areas:
    "header"
    "content";
    

    > main {
        grid-area: content;
        max-width: 1500px;
        margin: 0 auto;
        width: 100%;

        display: grid;
        grid-auto-rows: 250px;
        gap: 25px;

        padding: 50px 7%;
        overflow-y: auto; // Problema com barra de rolagem acima de width 1500px

        @media (min-width: 400px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (min-width: 700px) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (min-width: 1000px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (min-width: 1000px) {
            grid-template-columns: repeat(5, minmax(0, 1fr));
        }
    }
`;