import { authModalState } from '../../../atoms/authModalAtom';
import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from "recoil";
import Login from './Login';
import SignUp from './SignUp';


type AuthInputsProps = {

};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState);

    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
            {modalState.view === "login" && <Login />}
            {modalState.view === "signup" && <SignUp />}
        </Flex>
    )
}
export default AuthInputs;