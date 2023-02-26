import { auth } from "../../firebase/clientApp";
import { Box, Flex, Icon, Input, Skeleton, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { useState } from "react";
import useDirectory from "@/hooks/useDirectory";


const CreatePostLink: React.FC = () => {

    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { toggleMenuOpen } = useDirectory();

    const onClick = () => {
        setLoadingSubmit(true);
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            setLoadingSubmit(false);
            return;
        }
        const { communityId } = router.query;

        if (communityId) {
            router.push(`/r/${communityId}/submit`);
            return;
        }
        toggleMenuOpen();
        setLoadingSubmit(false);
    };

    return (
        <>
            {loadingSubmit ?
                <Box boxShadow="sm" bg="white" mb={2} borderRadius={4}>
                    <Skeleton height="56px" />
                    <Flex align="center" justify="center">
                        <Spinner size="md" color="#FF3C00" position="absolute" mb="56px" />
                    </Flex>
                </Box>
                :
                <Flex
                    justify="space-evenly"
                    align="center"
                    bg="white"
                    height="56px"
                    borderRadius={4}
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                    mb={2}
                    display={loadingSubmit ? "none" : "flex"}
                >
                    <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
                    <Input
                        placeholder="Create Post"
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{
                            bg: "white",
                            border: "1px solid",
                            borderColor: "blue.500",
                        }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid",
                            borderColor: "blue.500",
                        }}
                        bg="gray.50"
                        borderColor="gray.200"
                        height="36px"
                        borderRadius={4}
                        mr={4}
                        onClick={onClick}
                    />
                    <Icon
                        as={IoImageOutline}
                        fontSize={24}
                        mr={4}
                        color="gray.400"
                        cursor="pointer"
                        onClick={onClick}
                    />
                    <Icon
                        as={BsLink45Deg}
                        fontSize={24}
                        color="gray.400"
                        cursor="pointer"
                        onClick={onClick}
                    />
                </Flex>
            }
        </>
    );
}
export default CreatePostLink;