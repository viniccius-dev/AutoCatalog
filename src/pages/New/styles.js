import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 90px auto;
    grid-template-areas:
    "header"
    "content";

    > main {
        grid-area: content;
        overflow-y: auto;
    }
`;

export const Form = styled.form`
    max-width: 600px;
    margin: 38px auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding-bottom: 20px;

        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

        h1 {
            color: ${({ theme }) => theme.COLORS.BLUE_100};
        }

        a {
            font-size: 20px;
            color: ${({ theme }) => theme.COLORS.BLUE_300};
        }
    }

    > label {
        display: inline-block;
        width: 48px;
        height: 48px;

        background-color: ${({ theme }) => theme.COLORS.GRAY_100};

        border-radius: 8px;
        border-width: 1px;
        border-style: solid;
        border-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

        cursor: pointer;

        > svg {    
            margin: 15px;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }

        > img {
            border-radius: 6px;
            width: 46px;
            height: 46px;
            object-fit: cover;
        }

        > input {
            display: none;
        }
    }

    .disabled {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        cursor: default;
    }
`;