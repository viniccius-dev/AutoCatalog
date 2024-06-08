import styled from "styled-components";

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

        section {
            max-width: 600px;
            margin: 38px auto;

            header {
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

                button {
                    font-size: 20px;
                    color: ${({ theme }) => theme.COLORS.BLUE_300};
                    background: none;
                    border: none;
                }
            }

            div {

                p, h3 {
                    text-align: justify;
                }

                h3 {
                    padding: 15PX 0;
                }

                p {
                    color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
                }
            }
        }
    }
`;