import { theme } from "@/globals/theme";
import { styled } from "styled-components";

export const HeaderLayout = styled.header`
        width: 100%;
        padding: ${theme.spacing.md};
        background: ${theme.colors.yellow};
    
        nav{
            ul{
                display: flex; 
                align-items: center;
                justify-content: space-between;
                list-style: none;
    
                li{
                    display: flex;
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

        @media (min-width: 768px) {
            display: none;
        }
`;