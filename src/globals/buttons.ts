import styled from "styled-components";
import { theme } from "./theme";

type ButtonProps = {
    variant?: "primary" | "secondary" | "destructive";
    size?: "small" | "medium" | "large";
}

export const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    border-radius: ${theme.spacing.md};
    color: ${theme.colors.white};
    transition: opacity .3s ease;
    ${(props) => props.variant === "primary" && `
        background-color: ${theme.colors.blue};
    `
    }
    
    ${(props) => props.size === "small" && `
        padding: ${theme.spacing.xxs} ${theme.spacing.xs};
        font-size: ${theme.fontSize.sm};
    `}

    ${(props) => props.size === "medium" && `
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.fontSize.sm};
    `};

    ${(props) => props.size === "large" && `
        padding: ${theme.spacing.xxs} ${theme.spacing.lg};
        font-size: ${theme.fontSize.lg};
    `
    }

    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`;