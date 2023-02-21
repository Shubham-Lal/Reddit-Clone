import { auth, firestore } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/communitiesAtom";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";


type PostsProps = {
    communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

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
    }, []);

    return (
        <div>Have a good coding</div>
    )
}
export default Posts;