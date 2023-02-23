import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, doc, getDocs, increment, writeBatch } from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";


const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        if (!user) {
            setAuthModalState({
                open: true,
                view: "login"
            });
            return;
        }

        setLoading(true);
        if (isJoined) {
            leaveCommunity(communityData.id);
            // leaveCommunity(communityData.id, communityData);
            return;
        }
        joinCommunity(communityData);
    };


    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }))
        }
        catch (error: any) {
            console.log(error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const joinCommunity = async (communityData: Community) => {
        try {
            const batch = writeBatch(firestore);

            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
                isModerator: false
            }

            batch.set(
                doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id),
                newSnippet
            );
            batch.update(
                doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1),
            });
            await batch.commit();

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))
        }
        catch (error: any) {
            console.log(error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    // const leaveCommunity = async (communityId: string, communityData: Community) => {
    const leaveCommunity = async (communityId: string) => {
        try {
            const batch = writeBatch(firestore);

            // const newSnippet: CommunitySnippet = {
            //     isModerator: communityData.creatorId === user?.uid && false
            // }

            // batch.set(
            //     doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id),
            //     newSnippet
            // );
            batch.delete(
                doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
            );

            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1),
            });

            await batch.commit();

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));
        }
        catch (error: any) {
            console.log(error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: []
            }));
            return;
        }
        getMySnippets();
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;