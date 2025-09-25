import { styled } from "styled-components";

export const MainLayout = styled.div`
    display: flex;
`;

export const LayoutContainer = styled.div`

  @media (min-width: 768px) {
    display: flex;
    min-height: 100dvh;
    width: 100%;
  }
`

export const PageContent = styled.main`
  flex: 1;
  padding: 64px 24px 0 24px;
`