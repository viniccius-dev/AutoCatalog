import styled from 'styled-components';

export const Container = styled.div`
    max-width: 241px;

    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${({ theme, $type }) => $type === "error" ? theme.COLORS.LIGHT_RED : theme.COLORS.LIGHT_GREEN};

    > svg {
        margin-right: 10px;
        font-size: 18px
    }

    > p {
        margin: 0;
        text-align: left;
    }
`;