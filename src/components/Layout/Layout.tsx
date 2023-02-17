import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

const Layout= ( { children }: {children: ReactNode} ) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default Layout;