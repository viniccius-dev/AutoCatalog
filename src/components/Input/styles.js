import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
    
    margin-bottom: 8px;
    border-radius: 10px;

    > input {
        height: 50px;
        width: 100%;

        padding: 12px;

        color: ${({ theme }) => theme.COLORS.WHITE};
        background: transparent;
        border: 0;
        border-radius: 10px;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        }

        &:disabled {
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
            border-width: 1px;
            border-style: dashed;
            border-color: ${({ theme }) => theme.COLORS.GRAY_100};
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }

        &:disabled::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    > svg {
        margin-left: 16px;
    }
`;