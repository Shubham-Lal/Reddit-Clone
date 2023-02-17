import { authModalState } from "../../../atoms/authModalAtom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil"
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useEffect } from "react";


const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false
        }));
    }

    useEffect(() => {
        if (user) handleClose(); 
    }, [user]);

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                    {/* <ModalHeader textAlign="center"> */}
                        {modalState.view === "login" && "Sign in to your account"}
                        {modalState.view === "signup" && "Create your new account"}
                        {modalState.view === "resetPassword" && "Reset your password"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
                        <Flex direction="column" align="center" justify="center" width="70%">
                            <OAuthButtons />
                            <Text align="center" justifyContent="center" color="gray.500" fontWeight={700} border="1px solid" borderColor="gray.300" borderRadius="50%" padding="5px">
                                OR
                            </Text>
                            <AuthInputs />
                            {/* <ResetPassword /> */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;