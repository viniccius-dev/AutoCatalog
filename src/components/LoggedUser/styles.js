import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: right;

    > a img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    > div:first-of-type {
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

export const NoAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    > svg {
        font-size: 25px;
    }
`