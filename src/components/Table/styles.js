import styled from 'styled-components';

export const Container = styled.table`
    border-collapse: collapse;
    border: 1px solid rgb(140 140 140);
    font-size: 15px;
    letter-spacing: 1px;

    > caption {
        font-size: 22px;
        font-weight: 500;
        background-color: ${({ theme }) => theme.COLORS.BLUE_100};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    th, td {
        border: ${({ theme }) => `1px solid ${theme.COLORS.BLUE_100}`};
        padding: 8px 10px;
    }

    td:last-of-type {
        text-align: center;
    }

    tbody > tr {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
    }

    tbody > tr:nth-of-type(even) {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
    }
`;