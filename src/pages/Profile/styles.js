import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;

    > header {
        width: 100%;
        height: 120px;

        background: ${({ theme }) => theme.COLORS.BACKGROUND_600};

        display: flex;
        align-items: center;

        padding: 0 70px;

        svg {
            color: ${({ theme }) => theme.COLORS.BLUE_100};
            font-size: 24px;
        }

        button {
            border: none;
            background: none;
        }
    }
`;

export const Form = styled.form`
    max-width: 340px;
    margin: 30px auto 0;

    > div:nth-child(4) {
        margin-top: 15px;
    }

    > button {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const Avatar = styled.div`
    position: relative;
    margin: -124px auto 32px;

    width: 186px;
    height: 186px;

    > img {
        border-radius: 50%;
        width: 186px;
        height: 186px;
        object-fit: cover;
    }

    > label {
        width: 48px;
        height: 48px;
        background-color: ${({ theme }) => theme.COLORS.BLUE_200};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 7px;
        right: 7px;
        cursor: pointer;

        input {
            display: none;
        }

        svg {
            width: 20px;
            height: 20px;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`;

export const NoAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 186px;
    height: 186px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    background: ${({ theme }) => theme.COLORS.BACKGROUND_600};

    > svg {
        font-size: 80px;
    }
`