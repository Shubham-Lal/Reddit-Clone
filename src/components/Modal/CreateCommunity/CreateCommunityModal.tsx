import { auth, firestore } from '../../../firebase/clientApp';
import { Icon, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input, Stack, Checkbox, Flex, Link } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState("");
    const [charRemaining, setCharRemaining] = useState(21);
    const [noChar, setNoChar] = useState("No");
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const format = /[`!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    const format = /[ `!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        if (format.test(e.target.value)) {
            setError("Community names can only contain letters, numbers, hyphens, underscores or full-stops.");
        }
        if (e.target.value.length <= 21) {
            setCommunityName(e.target.value);
            setCharRemaining(21 - e.target.value.length);
        }
        setNoChar("No");
        return;

    };

    const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(e.target.name);
    };

    const handleCreateCommunity = async () => {
        setError("");
        if (format.test(communityName)) {
            setError("Community names can only contain letters, numbers, hyphens, underscores or full-stops.");
            return;
        }
        if (communityName.length < 3) {
            setError("Community names must be between 3-21 characters.");
            return;
        }

        setLoading(true);
        try {
            // const communityDocRef = doc(firestore, "communities", communityName);
            const communityDocRef = doc(firestore, "communities", communityName);

            await runTransaction(firestore, async (transaction) => {
                // To check if Community exists
                const communityDoc = await transaction.get(communityDocRef);
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is taken. Please try another.`)
                }

                // Creating Community here
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    numberOfMembers: 1,
                    privacyType: communityType,
                    createdAt: serverTimestamp(),
                    imageURL: "",
                    verified: false
                });

                // Creating Community Snippet here
                transaction.set(
                    doc(firestore, `users/${user?.uid}/communitySnippets`, communityName.toLowerCase()),
                    {
                        communityId: communityName,
                        isModerator: true,
                        imageURL: ""
                    }
                );
            })
        }
        catch (error: any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" flexDirection="column" fontSize={17} padding={3}>Create your Community</ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody display="flex" flexDirection="column" padding="10px 0">
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color="gray.500">
                                Community names including capitalization cannot be changed.
                            </Text>
                            <Text position="relative" top="28px" left="10px" width="20px" color="gray.400">
                                r/
                            </Text>
                            <Input
                                position="relative"
                                value={communityName}
                                size="sm"
                                pl="22px"
                                onChange={handleChange}
                            />
                            <Text color={charRemaining === 0 ? "red" : "gray.500"} fontSize="9pt">
                                {charRemaining || noChar} {charRemaining > 1 || charRemaining === 0 ? "characters" : "character"} remaining
                            </Text>
                            <Text color="red" fontSize="9pt" pt={1}>{error}</Text>
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    <Checkbox name="public" isChecked={communityType === "public"} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Public
                                            </Text>
                                            <Text mb={1} mr={1} color="gray.200">|</Text>
                                            <Text fontSize="9pt" color="gray.500">
                                                Anyone can view, post & comment to this community.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name="restricted" isChecked={communityType === "restricted"} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Restricted
                                            </Text>
                                            <Text mb={1} mr={1} color="gray.200">|</Text>
                                            <Text fontSize="9pt" color="gray.500">
                                                Anyone can view this community but only, approved users can post & comment.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name="private" isChecked={communityType === "private"} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={HiLockClosed} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Private
                                            </Text>
                                            <Text mb={1} mr={1} color="gray.200">|</Text>
                                            <Text fontSize="9pt" color="gray.500">
                                                Only approved users can view, post & comment on this community.
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    <Flex align="center" pl={3} pr={3}>
                        <Text fontSize="9pt">
                            To create custom Community (Government, Business, NGO, etc.),{` `}
                            <Link color="blue.500" href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NO}&text=Hello%20${process.env.NEXT_PUBLIC_FIRST_NAME}.%20I%20want%20to%20have%20my%20custom%20Community%20name.%20Reach%20me%20out.`} isExternal>
                                contact here<ExternalLinkIcon fontSize={15} />
                            </Link>
                        </Text>
                    </Flex>
                    <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
                        <Button variant="outline" height="30px" _hover={{ bg: "blue.100" }} mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button height="30px" onClick={handleCreateCommunity} isLoading={loading} loadingText="Creating">
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;