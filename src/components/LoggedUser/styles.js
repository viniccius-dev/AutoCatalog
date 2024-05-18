import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: right;

    > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    > div {
        display: flex;
        flex-direction: column;
        margin-right: 16px;
        line-height: 24px;
    }

    span {
        font-size: 14px;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    strong {
        font-size: 18px;
    }
`;