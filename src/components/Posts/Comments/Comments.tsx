import { Post, postState } from "../../../atoms/postAtom";
import { firestore } from "../../../firebase/clientApp";
import { Box, Divider, Flex, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, doc, getDocs, increment, orderBy, query, serverTimestamp, Timestamp, where, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { useSetRecoilState } from "recoil";
import { Comment } from "../../../atoms/postAtom";
import CommentItem from "./CommentItem";


type CommentsProps = {
    user: User;
    selectedPost: Post | null;
    communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [loadingDeleteId, setLoadingDeleteId] = useState("");
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

            newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

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
        setLoadingDeleteId(comment.id);
        try {
            const batch = writeBatch(firestore);
            const commentDocRef = doc(firestore, "comments", comment.id);
            batch.delete(commentDocRef);
            const postDocRef = doc(firestore, "posts", selectedPost?.id!);
            batch.update(postDocRef, {
                numberOfComments: increment(-1)
            });
            await batch.commit();
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! - 1
                } as Post
            }));
            setComments((prev) => prev.filter((item) => item.id !== comment.id));
        }
        catch (error: any) {
            console.log(error.message);
        }
        finally {
            setLoadingDeleteId("");
        }
    };

    const getPostComment = async () => {
        try {
            const commentsQuery = query(
                collection(firestore, "comments"),
                where("postId", "==", selectedPost?.id),
                orderBy("createdAt", "desc")
            );

            const commentDocs = getDocs(commentsQuery);
            const comments = (await commentDocs).docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setComments(comments as Comment[]);
        }
        catch (error: any) {
            console.log(error.message)
        }
        finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedPost) return;
        getPostComment();
    }, [selectedPost]);

    return (
        <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
            <Divider />
            <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" width="100%">
                {!fetchLoading && (
                    <CommentInput
                        commentText={commentText}
                        setCommentText={setCommentText}
                        user={user}
                        createLoading={createLoading}
                        onCreateComment={onCreateComments}
                    />
                )}
            </Flex>
            <Stack spacing={6} p={2}>
                {fetchLoading ? (
                    <>
                        {[0, 1, 2].map((item) => (
                            <Box key={item} padding="6" bg="white">
                                <Flex direction="row">
                                    <SkeletonCircle size="10" />
                                    <SkeletonText width="100px" mt={2} ml={2} noOfLines={1} />
                                </Flex>
                                <SkeletonText mt="1" noOfLines={2} spacing="4" />
                            </Box>
                        ))}
                    </>
                ) : (
                    <>
                        {comments.length === 0 ? (
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                borderTop="1px solid"
                                borderColor="gray.100"
                                p={20}
                            >
                                <Text fontWeight={700} opacity={0.3}>
                                    No Comments Yet
                                </Text>
                            </Flex>
                        ) : (
                            <>
                                {comments.map((item: Comment) => (
                                    <CommentItem
                                        key={item.id}
                                        comment={item}
                                        onDeleteComment={onDeleteComment}
                                        loadingDelete={loadingDeleteId === item.id}
                                        userId={user?.uid}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </Stack>
        </Box>
    )
}
export default Comments;