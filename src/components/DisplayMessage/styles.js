import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin: 5px 0;

    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
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