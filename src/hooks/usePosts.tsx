import { postState } from "../atoms/postAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => {

    };

    const onSelectPost = () => {

    };

    const onDeletePost = async () => {

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