import styled from "styled-components";
import { theme } from "../../globals/theme";

export const HeaderContainer = styled.header`
    width: 100%;
    max-width: 15rem;
    padding: ${theme.spacing.md};
    background: ${theme.colors.yellow};

    nav{
        ul{
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            list-style: none;
            margin-top: ${theme.spacing.lg};

            li{
                display: flex;
                flex-direction: column;
                gap: ${theme.spacing.lg};
            }

            li a{
                text-decoration: none;
                color: ${theme.colors.black};
                transition: all .3s ease;
            }

            li a:hover{
                text-decoration: underline;
                color: ${theme.colors.white};
            }
        }
    }

    @media(max-width: 768px){
        display: none;
    }
`;