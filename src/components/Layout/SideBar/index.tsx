import { Header } from "@/components/Header"
import { LayoutContainer, PageContent } from "./styles";
import { HeaderMobile } from "@/components/HeaderMobile";

type MainLayoutProps = {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) =>{
    return(
        <LayoutContainer>
            <Header/>
            <HeaderMobile/>
            <PageContent>
                {children}
            </PageContent>
        </LayoutContainer>
    )
}