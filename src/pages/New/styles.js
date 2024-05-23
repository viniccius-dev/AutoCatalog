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
        border-bottom-color: ${({ theme }) => theme.COLORS.BLUE_300};

        h1 {
            color: ${({ theme }) => theme.COLORS.BLUE_100};
        }

        a {
            font-size: 20px;
            color: ${({ theme }) => theme.COLORS.BLUE_300};
        }
    }

    > button {
        width: 100%;
    }
`;

export const Section = styled.div`
    display: grid;
    grid-template-columns: 105px auto 300px;
    column-gap: 10px;
    grid-template-areas:
    "img-brand brand brand"
    "img-brand new-brand new-brand"
    "img-vehicle vehicle vehicle"
    "img-vehicle year year"
    "price price velocity"
    "km-l km-l tank-capacity"
    "trunk-capacity trunk-capacity weight";

    margin-top: 20px;

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

            &:disabled #img-brand {
                cursor: default;
            }
        }
    }

    > label:nth-of-type(1) {
        grid-area: img-brand;
    }

    > label:nth-of-type(2) {
        grid-area: img-vehicle;
    }

    > div:nth-of-type(1) {
        grid-area: brand;
    }

    > div:nth-of-type(2) {
        grid-area: new-brand;
    }

    > div:nth-of-type(3) {
        grid-area: vehicle;
    }

    > div:nth-of-type(4) {
        grid-area: year;
    }

    > div:nth-of-type(5) {
        grid-area: price;
    }

    > div:nth-of-type(6) {
        grid-area: velocity;
    }

    > div:nth-of-type(7) {
        grid-area: km-l;
    }

    > div:nth-of-type(8) {
        grid-area: tank-capacity;
    }

    > div:nth-of-type(9) {
        grid-area: trunk-capacity;
    }

    > div:nth-of-type(10) {
        grid-area: weight;
    }
`;