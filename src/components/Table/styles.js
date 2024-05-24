import styled from 'styled-components';

export const Container = styled.table`
    border-collapse: collapse;
    border: 1px solid rgb(140 140 140);
    font-size: 18px;
    letter-spacing: 1px;

    > caption {
        background-color: rgb(228 240 245);
    }

    th, td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
    }

    td:last-of-type {
        text-align: center;
    }

    tbody > tr:nth-of-type(even) {
        background-color: rgb(237 238 242);
    }
`;