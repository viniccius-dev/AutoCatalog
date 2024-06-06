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
        width: 625px;
        margin: 38px auto;
        padding: 0 10px;

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
                color: ${({ theme }) => theme.COLORS.LIGHT_RED};
                background: none;
                border: none;

                display: flex;
                align-items: center;
                gap: 5px;
            }
        }

        section {
            padding: 30px 0;
            display: flex;
            flex-direction: column;
            gap: 15px;

            > h3 {
                width: 100%;
                text-align: center;
                padding: 40px 0;
                color: ${({ theme }) => theme.COLORS.GRAY_300};
            }

            div.card {
                width: 100%;
                height: 60px;
                background-color: ${({ theme }) => theme.COLORS.WHITE};
                border: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};
                border-radius: 5px;
                cursor: pointer;

                display: grid;
                grid-template-columns: 3fr 1fr;

                h3 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 21px;
                    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
                    border-left: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`}
                }
            }

            div.cars {
                display: flex;
                justify-content: left;
                gap: 20px;
                padding-left: 15px;
                align-items: center;

                img {
                    width: 90px;
                    height: 58px;
                    object-fit: cover;
                    object-position: center;
                }
            }
        }

        footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;

            button {
                font-size: 16px;
                color: ${({ theme }) => theme.COLORS.BLUE_100};
                background: none;
                border: none;
                cursor: pointer;

                &:disabled {
                    color: ${({ theme }) => theme.COLORS.GRAY_300};
                    cursor: not-allowed;
                }
            }

            .btnPages {
                display: flex;
                align-items: center;
                gap: 7px;
            }

            .pages > button {
                padding: 5px 10px;
                border-radius: 5px;
            }

            button.active {
                background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
                color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
                border: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_100}`};
            }

            span {
                font-size: 16px;
                color: ${({ theme }) => theme.COLORS.GRAY_300};
            }
        }
    }
`;
