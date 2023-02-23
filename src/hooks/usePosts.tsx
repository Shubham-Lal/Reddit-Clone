import { Post, postState, PostVote } from "../atoms/postAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { communityState } from "../atoms/communitiesAtom";
import { authModalState } from "../atoms/authModalAtom";
import { useRouter } from "next/router";

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    // Vote Functionality of Post
    const onVote = async (post: Post, vote: number, communityId: string) => {
        // User is Logged in or not
        if (!user?.uid) {
            setAuthModalState({
                open: true,
                view: "login"
            });
            return;
        }
        try {
            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(
                (vote) => vote.postId === post.id
            );

            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            const updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            // New Vote
            if (!existingVote) {
                //STEP 1: Create a Post Vote Document in Firebase Database
                const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote,
                };
                batch.set(postVoteRef, newVote);

                //STEP 2: ADD or SUBTRACT the Vote from Post
                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];
            }
            // Voted before
            else {
                const postVoteRef = doc(firestore, "users", `${user?.uid}/postVotes/${existingVote.id}`);

                // User could be UpVote -> Neutral OR DownVote -> Neutral
                if (existingVote.voteValue === vote) {
                    // Add/Subtract 1 from the Post Vote
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);

                    // Deleting the Post Vote Documnet from Firebase Database
                    batch.delete(postVoteRef);

                    voteChange *= -1;
                }
                // User could be UpVote -> DownVote OR DownVote -> UpVote
                else {
                    // Add/Subtract 2 from the Post Vote
                    updatedPost.voteStatus = voteStatus + 2 * vote;
                    const voteIndex = postStateValue.postVotes.findIndex(
                        (vote) => vote.id === existingVote.id
                    );
                    updatedPostVotes[voteIndex] = {
                        ...existingVote,
                        voteValue: vote,
                    };

                    // Updating the existing Post Vote Document in Firebase Database
                    batch.update(postVoteRef, {
                        voteValue: vote,
                    });

                    voteChange = 2 * vote;
                }
            }
            const postIndex = postStateValue.posts.findIndex(
                (item) => item.id === post.id
            );
            updatedPosts[postIndex] = updatedPost;
            // Update the Post using recoil state with updated state value
            setPostStateValue((prev) => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes,
            }));

            if (postStateValue.selectedPost) {
                setPostStateValue(prev => ({
                    ...prev,
                    selectedPost: updatedPost,
                }))
            }

            // Update our Post Document
            const postRef = doc(firestore, "posts", post.id!);
            batch.update(postRef, {
                voteStatus: voteStatus + voteChange
            });

            await batch.commit();
        }
        catch (error: any) {
            console.log(error.message)
        }
    };

    // Selecting a Post
    const onSelectPost = (post: Post) => {
        setPostStateValue(prev => ({
            ...prev,
            selectedPost: post,
        }));
        router.push(`/r/${post.communityId}/post/${post.id}`);
    };

    // Deleting a Post
    const onDeletePost = async (post: Post): Promise<boolean> => {
        // 3 things to do here -> If post has Image, delete from Firebase Storage -> Then, Delete the post from Firebase Database -> Update the recoil state
        try {
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }

            const postDocRef = doc(firestore, "posts", post.id!);
            await deleteDoc(postDocRef);

            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id)
            }));
            return true;
        }
        catch (error) {
            return false;
        }
    };

    // Getting Post Votes on Community Page load
    const getCommunityPostVotes = async (communityId: string) => {
        const postVotesQuery = query(
            collection(firestore, "users", `${user?.uid}/postVotes`),
            where("communityId", "==", communityId)
        );

        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setPostStateValue((prev) => ({
            ...prev,
            postVotes: postVotes as PostVote[],
        }))
    };

    useEffect(() => {
        if (!user || !currentCommunity) return;
        getCommunityPostVotes(currentCommunity?.id);
    }, [user, currentCommunity]);

    useEffect(() => {
        // For clearing user Post Votes when Logged Out
        if (!user) {
            setPostStateValue(prev => ({
                ...prev,
                postVotes: []
            }));
        }
    }, [user]);

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;