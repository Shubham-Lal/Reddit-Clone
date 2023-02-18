import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input } from '@chakra-ui/react';
import { useState } from "react";

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [communityName, setCommunityName] = useState("");
    const [charRemaining, setCharRemaining] = useState(21);
    const [noChar, setNoChar] = useState("No");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 21) {
            setCommunityName(e.target.value);
            setCharRemaining(21 - e.target.value.length);
        }
        setNoChar("No");
        return;

    }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose}>
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
                            <Text color={charRemaining === 0 ? "red" : ""}>
                                {charRemaining || noChar} {charRemaining > 1 || charRemaining === 0 ? "characters" : "character"} remaining
                            </Text>
                        </ModalBody>
                    </Box>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost'>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;