import { styled } from "styled-components";
import { theme } from "./theme";

export const TextNormal = styled.p`
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.black};
    padding: ${theme.spacing.sm} 0;
`;

export const TextTitleLarge = styled.h1`
    font-size: ${theme.fontSize.xxl};
    color: ${theme.colors.black};
    padding: ${theme.spacing.sm} 0;
    font-weight: bold;
`;

export const TextTitle = styled.h1`
    font-size: ${theme.fontSize.xl};
    color: ${theme.colors.black};
    padding: ${theme.spacing.sm} 0;
    font-weight: bold;
`;

export const TextTiny = styled.p`
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.black};
    padding: ${theme.spacing.xs} 0;
`;

export const Label = styled(TextNormal)`
      
`;

export const TextError = styled.span`
    color: #FF0000;
    font-size: ${theme.fontSize.sm};
    padding: 0;

`;