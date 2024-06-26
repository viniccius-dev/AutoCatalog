import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.COLORS.BACKGROUND_LINEAR_GRADIENT};
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        --webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea {
        font-family: "Roboto Slab", serif;
        font-size: 16px;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }

    body .hidden {
        display: none;
    }

    input[type=number]::-webkit-inner-spin-button { 
      -webkit-appearance: none;
    
    }
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
    }

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.COLORS.GRAY_100};
        border-radius: 3px;
        border: 2px solid transparent;
    }

    ::-webkit-scrollbar-button {
        display: none;
    }
`;