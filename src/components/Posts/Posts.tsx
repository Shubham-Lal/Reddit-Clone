import { auth, firestore } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/communitiesAtom";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import usePosts from "../../hooks/usePosts";
import { Post } from "../../atoms/postAtom";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";


type PostsProps = {
    communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();

    const getPosts = async () => {
        setLoading(true);
        try {
            const postsQuery = query(
                collection(firestore, `posts`),
                where("communityId", "==", communityData.id),
                orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postsQuery);
            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPostStateValue(prev => ({
                ...prev,
                posts: posts as Post[]
            }))
        }
        catch (error: any) {
            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, [communityData]);

    return (
        <>
            {loading ? (
                <PostLoader />
            ) : (
                <Stack>
                    {postStateValue.posts.map((item) => (
                        <PostItem
                            post={item}
                            userIsCreator={user?.uid === item.creatorId}
                            userVoteValue={
                                postStateValue.postVotes.find((vote) => vote.postId === item.id)
                                    ?.voteValue
                            }
                            onVote={onVote}
                            onSelectPost={onSelectPost}
                            onDelete={onDeletePost}
                            key={item.id}
                            communityData={communityData}
                        />
                    ))}
                </Stack>
            )
            }

        </>
    )
}
export default Posts;