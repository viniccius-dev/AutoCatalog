import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    user-select: none;
    margin-bottom: 8px;
`;

export const SelectButton = styled.div`
    display: flex;
    padding: 0.75rem;
    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Chevrons = styled.div`
    color: ${({ theme }) => theme.COLORS.BLUE_100};
    font-size: 20px;
`;

export const OptionsList = styled.div`
    z-index: 2;
    position: absolute;
    width: 100%;

    max-height: 200px;
    overflow-y: auto;

    margin-top: 0.25rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.BLUE_200};
    color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Option = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;

    padding: 0.75rem;

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

    > svg {
        margin-left: auto;
        color: ${({ theme }) => theme.COLORS.BLUE_100};
    }

    > input[type="radio"] {
        all: unset;
        position: absolute;
        inset: 0;
        cursor: pointer;
    }

    &:has(input:checked),
    &:hover {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        color: ${({ theme}) => theme.COLORS.BACKGROUND_900};
    }

    &:has(input:focus) {
        outline-width: 1px;
        outline-style: solid;
        outline-color: ${({ theme }) => theme.COLORS.BLUE_300};
    }
`;