import { Post } from "@/atoms/postAtom";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";


type CommentsProps = {
    user: User;
    selectedPost: Post;
    communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const onCreateComments = async (commentText: string) => {

    };

    const onDeleteComment = async (comment: any) => {

    };

    const getPostComment = async () => {

    };

    useEffect(() => {
        getPostComment();
    }, []);

    return (
        <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
            <Divider />
            <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" width="100%">
                <CommentInput 
                    commentText={commentText}
                    setCommentText={setCommentText}
                    user={user}
                    createLoading={createLoading}
                    onCreateComment={onCreateComments}
                />
            </Flex>
        </Box>
    )
}
export default Comments;