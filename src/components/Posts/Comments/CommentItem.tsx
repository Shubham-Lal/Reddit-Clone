import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { Comment } from "../../../atoms/postAtom";

type CommentItemProps = {
    comment: Comment;
    onDeleteComment: (comment: Comment) => void;
    loadingDelete: boolean;
    userId: string;

};

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDeleteComment, loadingDelete, userId }) => {


    return (
        <Flex>
            <Box mr={2}>
                <Icon as={FaReddit} fontSize={30} color="blue.500" />
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="8pt">
                    <Text fontWeight={700}>
                        {comment.creatorDisplayText}
                    </Text>
                    <Text color="gray.600">
                        {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
                    </Text>
                    {loadingDelete && <Spinner size="sm" color="#FF3C00"/>}
                </Stack>
                <Text fontSize="10pt">
                    {comment.text}
                </Text>
                <Stack direction="row" align="center" cursor="pointer" color="gray.500">
                    <Icon as={IoArrowUpCircleOutline} _hover={{ color: "blue.500" }} />
                    <Icon as={IoArrowDownCircleOutline} _hover={{ color: "blue.500" }} />
                    {userId === comment.creatorId && (
                        <>
                            <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                                Edit
                            </Text>
                            <Text fontSize="9pt" _hover={{ color: "blue.500" }} onClick={() => onDeleteComment(comment)}>
                                Delete
                            </Text>
                        </>
                    )}
                </Stack>
            </Stack>
        </Flex>
    )
}
export default CommentItem;