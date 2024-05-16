import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    background: rgba(0,0,0,0.7);
`;

export const Container = styled.div`
    width: 80%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: end;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};

    > svg {
        font-size: 20px;
        margin: 15px 15px 0 0;
        cursor: pointer;
    }
`;

export const Form = styled.form`
    width: 100%;
    padding: 0 8%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    text-align: center;

    > h3 {
        font-size: 28px;
        margin-top: 15px;
    }

    > p {
        font-size: 18px;
        margin: 25px 0;
        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    div:nth-last-of-type(1) {
        width: 100%;
        
        display: flex;
        justify-content: space-between;

        margin: 20px 0;

        button:first-child {
            margin-left: 0;
            font-weight: 400;
        }
    }
`;