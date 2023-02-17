import AuthModal from '../../Modal/Auth/AuthModal';   // Another way of importing components @/components/Modal/Auth/AuthModal
import { Button, Flex } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';

type RightContentProps = {
    user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user
                    ? <Button onClick={() => signOut(auth)}>Logout</Button>
                    : <AuthButtons />
                }
            </Flex>
        </>
    )
}
export default RightContent;