import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
    background: none;
    color: ${({ theme }) => theme.COLORS.BLUE_100};

    border: ${({ theme, $border }) => $border === "true" ? `1px solid ${theme.COLORS.GRAY_100}` : 'none'};
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    padding: ${({ $border }) => $border === "true" ? '10px 30px' : '0'};
    margin: ${({ $border }) => $border === "true" ? '0' : '10px 30px'};

    &:disabled {
        opacity: 0.5;
    }
`;