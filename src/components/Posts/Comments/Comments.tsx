import { Post, postState } from "../../../atoms/postAtom";
import { firestore } from "../../../firebase/clientApp";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, doc, increment, serverTimestamp, Timestamp, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { useSetRecoilState } from "recoil";


type CommentsProps = {
    user: User;
    selectedPost: Post | null;
    communityId: string;
};

export type Comment = {
    id: string;
    creatorId: string;
    creatorDisplayText: string;
    communityId: string;
    postId: string;
    postTitle: string;
    text: string;
    createdAt: Timestamp;
}

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const setPostState = useSetRecoilState(postState);

    const onCreateComments = async () => {
        // Step 1) Create a Comment Document in Firebase Database
        // Step 2) Increment 1 on the Post's Number of Comments
        // Step 3) Update Clien's recoil state
        setCreateLoading(true);
        try {
            const batch = writeBatch(firestore);
            // STEP 1:
            const commentDocRef = doc(collection(firestore, "comments"));
            const newComment: Comment = {
                id: commentDocRef.id,
                creatorId: user.uid,
                creatorDisplayText: user.displayName || user.email!.split("@")[0],
                communityId,
                postId: selectedPost?.id!,
                postTitle: selectedPost?.title!,
                text: commentText,
                createdAt: serverTimestamp() as Timestamp,
            }

            batch.set(commentDocRef, newComment);

            // STEP 2:
            const postDocRef = doc(firestore, "posts", selectedPost?.id!);
            batch.update(postDocRef, {
                numberOfComments: increment(1)
            });
            
            await batch.commit();

            // STEP 3:
            setCommentText("");
            setComments((prev) => [newComment, ...prev]);
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! + 1
                } as Post
            }))
        } 
        catch (error: any) {
            console.log(error.message);
        }
        finally {
            setCreateLoading(false);
        }
    };

    const onDeleteComment = async (comment: Comment) => {
        // Step 1) Delete a Comment Document in Firebase Database
        // Step 2) Decrement 1 on the Post's Number of Comments
        // Step 3) Update Client's recoil state
        try {
            
        } 
        catch (error: any) {
            console.log(error.message);
        }
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