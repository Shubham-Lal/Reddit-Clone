import { Community } from "../atoms/communitiesAtom";
import useCommunityData from "../hooks/useCommunityData";
import Head from "next/head";

type CommunitySEOProps = {
    CommunityData: Community
};

const CommunitySEO: React.FC<CommunitySEOProps> = ({ CommunityData }) => {
    const { communityStateValue } = useCommunityData();

    return (
        <Head>
            <title>{`${CommunityData?.id}'s Community`}</title>
            <meta name="description" content={`${CommunityData?.id}'s Community Page | Reddit Clone`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={communityStateValue.currentCommunity?.imageURL ? communityStateValue.currentCommunity.imageURL : "/favicon.ico"} />
        </Head>
    )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     // Get Community Data & pass it to Client
//     try {
//         const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
//         const communityDoc = await getDoc(communityDocRef);
//         return {
//             props: {
//                 communityData: communityDoc.exists()
//                     ? JSON.parse(
//                         safeJsonStringify({
//                             id: communityDoc.id,
//                             ...communityDoc.data()
//                         })
//                     )
//                     : ""
//             }
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

export default CommunitySEO;