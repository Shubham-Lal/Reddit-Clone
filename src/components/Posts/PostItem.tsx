import { Post } from "../../atoms/postAtom";
import { Alert, AlertIcon, Divider, Flex, Icon, Image, Skeleton, Spinner, Stack, Text, } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from "react-icons/io5";
import moment from "moment";
import { useState } from "react";
import { RWebShare } from "react-web-share";
import { Community } from "@/atoms/communitiesAtom";


type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (post: Post, vote: number, communityId: string) => void;
    onDelete: (post: Post) => Promise<boolean>;
    onSelectPost?: (post: Post) => void;
    communityData: Community;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDelete, onSelectPost, communityData }) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState(false);
    const singlePostPage = !onSelectPost;
    const router = useRouter();

    const handleDelete = async () => {
        setError(false);
        setLoadingDelete(true);
        try {
            const success = await onDelete(post);
            if (!success) {
                throw new Error("Failed to delete post!");
            }
            if(singlePostPage) {
                router.push(`/r/${post.communityId}`);
            }
        }
        catch (error: any) {
            console.log(error.message);
            setError(true);
        }
        finally {
            setLoadingDelete(false);
        }
    };

    return (
        <Flex
            border="1px solid"
            borderColor={singlePostPage ? "white" : "gray.300"}
            bg="white"
            borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
            _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
        >
            <Flex
                direction="column"
                align="center"
                bg={singlePostPage ? "none" : "gray.100"}
                p={2}
                width="40px"
                borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
            >
                <Icon
                    as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                    fontSize={30}
                    onClick={() => onVote(post, 1, post.communityId)}
                    cursor="pointer"
                    _hover={{ color: "blue.200" }}
                />
                <Text fontSize="10pt">{post.voteStatus}</Text>
                <Icon
                    as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
                    fontSize={30}
                    onClick={() => onVote(post, -1, post.communityId)}
                    cursor="pointer"
                    _hover={{ color: "blue.200" }}
                />
            </Flex>
            <Flex direction="column" width="100%">
                {error && (
                    <Alert status='error'>
                        <AlertIcon />
                        <Text>Error Deleting Post!</Text>
                    </Alert>
                )}
                <Stack spacing={1} p="10px">
                    <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
                        {/* Home Page Check */}
                        <Text>Posted by u/{post.creatorDisplayName}</Text>
                        <Text pl={1} color="gray.500">{moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Divider />
                    <Text fontSize="12pt" fontWeight={600} cursor={singlePostPage ? "default" : "pointer"} onClick={() => onSelectPost && onSelectPost(post)}>
                        {post.title}
                    </Text>
                    <Text fontSize="10pt" cursor={singlePostPage ? "default" : "pointer"} onClick={() => onSelectPost && onSelectPost(post)}>
                        {post.body}
                    </Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" p={2} cursor={singlePostPage ? "default" : "pointer"} onClick={() => onSelectPost && onSelectPost(post)}>
                            {loadingImage && <Skeleton height="200px" width="100%" borderRadius={4} />}
                            <Image
                                src={post.imageURL}
                                maxHeight="460px"
                                alt="Post Image"
                                onLoad={() => setLoadingImage(false)}
                                display={loadingImage ? "none" : "unset"}
                            />
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500" >
                    <Flex userSelect="none" align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" onClick={() => onSelectPost && onSelectPost(post)}>
                        <Icon as={BsChat} mr={2} />
                        <Text fontSize="9pt">{post.numberOfComments}</Text>
                    </Flex>
                    <Flex userSelect="none" align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
                        <Icon as={IoArrowRedoOutline} mr={2} />
                        {/* <Text fontSize="9pt">Share</Text> */}
                        <RWebShare
                            data={{
                                text: `${post.title}`,
                                url: `https://r-clone.vercel.app/r/${communityData.id}/post/${post.id}`,
                                title: `Share this post from ${communityData.id}'s Reddit Community`
                            }}
                            onClick={() => console.log("Share Post")}
                        >
                            <Text fontSize="9pt">Share</Text>
                        </RWebShare>
                    </Flex>
                    <Flex userSelect="none" align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
                        <Icon as={IoBookmarkOutline} mr={2} />
                        <Text fontSize="9pt">Save</Text>
                    </Flex>
                    {userIsCreator && (
                        <Flex userSelect="none" align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" onClick={handleDelete}>
                            {loadingDelete ? (
                                <Spinner size="sm" />
                            ) : (<>
                                <Icon as={AiOutlineDelete} mr={2} />
                                <Text fontSize="9pt">Delete</Text>
                            </>)}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PostItem;