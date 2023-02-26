import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, doc, getDoc, getDocs, increment, writeBatch } from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";
import { useRouter } from "next/router";


const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
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
                mySnippets: snippets as CommunitySnippet[],
                snippetsFetched: true
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
                isModerator: user?.uid === communityData.creatorId,
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

    const getCommunityData = async (communityId: string) => {
        try {
            const communityDocRef = doc(firestore, "communities", communityId);
            const communityDoc = await getDoc(communityDocRef);

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: { id: communityDoc.id, ...communityDoc.data() } as Community
            }));
        } 
        catch (error: any) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        if (!user) {
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [],
                snippetsFetched: false
            }));
            return;
        }
        getMySnippets();
    }, [user]);

    useEffect(() => {
        const { communityId } = router.query;

        if (communityId && !communityStateValue.currentCommunity) {
            getCommunityData(communityId as string);
        }
    }, [router.query, communityStateValue.currentCommunity]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        getCommunityData,
        loading
    }
}
export default useCommunityData;