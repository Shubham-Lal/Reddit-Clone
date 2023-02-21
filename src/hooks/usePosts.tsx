import { Post, postState } from "../atoms/postAtom";
import { useRecoilState } from "recoil";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => {

    };

    const onSelectPost = () => {

    };

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

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;