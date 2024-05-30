import styled from 'styled-components';

export const Container = styled.table`
    border-collapse: collapse;
    border: 1px solid rgb(140 140 140);
    font-size: 15px;
    letter-spacing: 1px;

    > caption {
        height: 67px;
        padding-top: 18px;

        font-size: 22px;
        font-weight: 500;
        background-color: ${({ theme }) => theme.COLORS.BLUE_100};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    th, td {
        border: ${({ theme }) => `1px solid ${theme.COLORS.BLUE_100}`};
        padding: 8px 10px;
        height: 57px;
    }

    .td-img {
        height: 171px;
    }

    td > img {
        width: 150px;
        height: 150px;
    }

    td > div {
        margin: 0;

        div {
            background-color: ${({ theme }) => theme.COLORS.BLUE_100};
            font-size: 19px;

            svg {
                color: ${({ theme }) => theme.COLORS.WHITE};
            }
        }
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