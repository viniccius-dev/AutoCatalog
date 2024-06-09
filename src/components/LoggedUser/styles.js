import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: right;
    position: relative;

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

export const DropDownList = styled.ul`
    position: absolute;
    top: 65px;
    right: 0;

    display: flex;
    flex-direction: column;

    background-color: ${({ theme }) => theme.COLORS.WHITE};
    list-style-type: none;
    border: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};
    z-index: 2;

    a {
        white-space: nowrap;
        padding: 10px 25px;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
        transition: 0.2s;
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        cursor: pointer;

        &:hover {
            background: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        }
    }

    a:not(:last-of-type) {
        border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};
    }
`;