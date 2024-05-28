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

    section {
        display: grid;
        column-gap: 10px;

        margin-top: 20px;

        button {
            grid-area: btn;
        }
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
        border-bottom-color: ${({ theme }) => theme.COLORS.BLUE_300};

        h1 {
            color: ${({ theme }) => theme.COLORS.BLUE_100};
            font-size: 27px;
        }

        button {
            font-size: 20px;
            color: ${({ theme }) => theme.COLORS.BLUE_300};
            background: none;
            border: none;
        }
    }

    > button {
        width: 100%;
    }

    > section {
        > label {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 109px;
            height: 109px;

            background-color: ${({ theme }) => theme.COLORS.GRAY_100};

            border-radius: 8px;
            border-width: 1px;
            border-style: solid;
            border-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

            cursor: pointer;

            > span {
                font-size: 15px;
                text-align: center;
                color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
            }

            > img {
                border-radius: 6px;
                width: 105px;
                height: 105px;
                object-fit: cover;
            }

            > input {
                display: none;
            }
        }
    }
`;

export const UpdateBrand = styled.section`
    grid-template-columns: 105px auto 300px;
    grid-template-areas:
    "img-brand brand brand"
    "img-brand name-brand name-brand"
    "btn btn btn";

    > label:nth-of-type(1) {
        grid-area: img-brand;
    }

    > div:nth-of-type(1) {
        grid-area: brand;
    }

    > div:nth-of-type(2) {
        grid-area: name-brand;
    }
`;

export const UpdateVehicle = styled.section`
    grid-template-columns: 105px auto 300px;
`;