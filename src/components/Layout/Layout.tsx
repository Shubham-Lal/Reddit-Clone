import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

type LayoutProps = {
    children: ReactNode
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default Layout;