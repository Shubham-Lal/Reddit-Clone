import AuthModal from '../../Modal/Auth/AuthModal';   // Another way of importing components @/components/Modal/Auth/AuthModal
import { Flex } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import { User } from 'firebase/auth';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user
                    ? <Icons />
                    : <AuthButtons />
                }
                <UserMenu user={user}/>
            </Flex>
        </>
    )
}
export default RightContent;