import { Header } from "@/components/Header"
import { LayoutContainer, PageContent } from "./styles";

type MainLayoutProps = {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) =>{
    return(
        <LayoutContainer>
            <Header/>
            <PageContent>
                {children}
            </PageContent>
        </LayoutContainer>
    )
}