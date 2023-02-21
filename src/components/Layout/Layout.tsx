import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

type LayoutProps = {
    children: ReactNode
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <Box pt={10}>
                <main>{children}</main>
            </Box>
        </>
    )
}

export default Layout;