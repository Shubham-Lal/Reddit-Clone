import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Flex, Textarea, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";


type CommentInputProps = {
    commentText: string;
    setCommentText: (value: string) => void;
    user: User;
    createLoading: boolean;
    onCreateComment: (commentText: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({ commentText, setCommentText, user, createLoading, onCreateComment }) => {

    return (
        <Flex direction="column" position="relative" mt={2}>
            {user ? (
                <>
                    <Text mb={1}>
                        Comment as{" "}
                        <span style={{ color: "#3182CE" }}>
                            {user.displayName || user?.email?.split("@")[0]}
                        </span>
                    </Text>
                    <Textarea
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        placeholder="What are your thoughts?"
                        fontSize="10pt"
                        borderRadius={4}
                        minHeight="160px"
                        pb={10}
                        _placeholder={{ color: "gray.500" }}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid black",
                        }}
                    />
                    <Flex
                        position="absolute"
                        left="1px"
                        right={0.1}
                        bottom="1px"
                        justify="flex-end"
                        bg="gray.100"
                        p="6px 8px"
                        borderRadius="0px 0px 4px 4px"
                    >
                        <Button
                            height="26px"
                            disabled={!commentText.length}
                            isLoading={createLoading}
                            onClick={() => onCreateComment(commentText)}
                        >
                            Comment
                        </Button>
                    </Flex>
                </>
            ) : (
                <Flex
                    align="center"
                    justify="space-between"
                    borderRadius={2}
                    border="1px solid"
                    borderColor="gray.100"
                    p={4}
                    mt={2}
                >
                    <Text fontWeight={500}>Log In or Sign Up to leave a comment for this post.</Text>
                    <AuthButtons />
                </Flex>
            )}
        </Flex>
    )
}
export default CommentInput;