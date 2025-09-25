import { createGlobalStyle } from "styled-components";


export const theme = {
    colors: {
        yellow: "#D4AF8C",
        black: "#2F4F4F",
        white: "#F2F2F2",
        blue: "#0000FF",
    },
    spacing: {
        xxs: "0.125rem",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "4rem",
    },
    fontSize: {
        sm: "0.875rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        xxl: "2rem",
    },
}
export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
    
    body{
        background: ${theme.colors.white};
    }
`;