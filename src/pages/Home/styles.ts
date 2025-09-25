import { styled } from "styled-components";
import { theme } from "../../globals/theme";

export const CarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing.xl};
`;

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
`;
