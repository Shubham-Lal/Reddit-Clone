import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import safeJsonStringify from "safe-json-stringify";
import About from "../../../../components/Community/About";
import PostItem from "../../../../components/Posts/PostItem";
import usePosts from "../../../../hooks/usePosts";
import { Community } from "../../../../atoms/communitiesAtom";
import PageContent from "../../../../components/Layout/PageContent";
import { auth, firestore } from "../../../../firebase/clientApp";
import PostSEO from "../../../seo-post";
import { Post } from "../../../../atoms/postAtom";
import AboutMobile from "../../../../components/Community/AboutMobile";
import Footer from "../../../../components/Footer/Footer";

type PostPageProps = {
    communityData: Community;
}

const PostPage: React.FC<PostPageProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts();
    // const setCommunityStateValue = useSetRecoilState(communityState);

    const router = useRouter();

    //     const myFetchPostFun = async () => {
    //         const postsQuery = query(
    //             collection(firestore, `posts`),
    //             where("communityId", "==", communityData.id)
    //         );
    //         const postDocs = await getDocs(postsQuery);
    //         const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //         const post = posts.filter(item => item.id === router.query.pid);
    //         const removeArr = post.at(0);
    //         selectPost(removeArr as any);
    //     }

    // const selectPost = (post: Post) => {
    //     setPostStateValue(prev => ({
    //         ...prev,
    //         selectedPost: post,
    //     }));
    // }

    //     useEffect(() => {
    //         myFetchPostFun();
    //     }, []);

    //     useEffect(() => {
    //         setCommunityStateValue(prev => ({
    //             ...prev,
    //             currentCommunity: communityData,
    //         }))
    //     }, []);

    const fetchPost = async (postId: string) => {
        try {
            const postDocRef = doc(firestore, "posts", postId);
            const postDoc = await getDoc(postDocRef);
            setPostStateValue((prev) => ({
                ...prev,
                selectedPost: {
                    id: postDoc.id,
                    ...postDoc.data()
                } as Post,
            }));
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const { pid } = router.query;

        if (pid && !postStateValue.selectedPost) {
            fetchPost(pid as string);
        }
    }, [router.query, postStateValue.selectedPost]);

    return (
        <>
            <PostSEO communityData={communityData} />
            <AboutMobile communityData={communityData} singlePage={router.query && true} />
            <PageContent>
                <>
                    {postStateValue.selectedPost &&
                        <PostItem
                            post={postStateValue.selectedPost}
                            onVote={onVote}
                            onDelete={onDeletePost}
                            userVoteValue={postStateValue.postVotes.find((item) =>
                                item.postId === postStateValue.selectedPost?.id
                            )?.voteValue}
                            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
                            communityData={communityData}
                        />
                    }
                </>
                <>
                    <About communityData={communityData} />
                </>
            </PageContent>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Get Community Data & pass it to Client
    try {
        const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(
                        safeJsonStringify({
                            id: communityDoc.id,
                            ...communityDoc.data()
                        })
                    )
                    : ""
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default PostPage;