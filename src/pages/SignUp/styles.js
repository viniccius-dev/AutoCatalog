import styled from 'styled-components';
import backgroundImg from '../../assets/Background-register.jpg'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Form = styled.form`
    padding: 0 136px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    > h1 {
        font-size: 44px;
    }

    > h2 {
        font-size: 24px;
        margin: 20px 0;
        color: ${({ theme }) => theme.COLORS.BLUE_100};
    }

    > a {
        margin-top: 20px;
        color: ${({ theme }) => theme.COLORS.BLUE_100};
        font-weight: 500;
    }

    > button {
        margin-top: 15px;
        width: 100%;
    }

    #display-message {
        max-width: 241px;
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
`;