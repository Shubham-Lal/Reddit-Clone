import AuthModal from '../../Modal/Auth/AuthModal';
// import AuthModal from '@/components/Modal/Auth/AuthModal';    Another way of importing components
import { Flex } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';

type RightContentProps = {
    // user: any;
};

const RightContent: React.FC<RightContentProps> = () => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    )
}
export default RightContent;