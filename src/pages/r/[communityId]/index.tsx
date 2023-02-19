import { firestore } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import CommunitySEO from "../../../pages/seo-community";
import SEO from "../../../pages/seo";
import Header from "@/components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";


type CommunityPageProps = {
    communityData: Community
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    if (!communityData) {
        return (
            <>
                <SEO/>
                <NotFound />
            </>
        )
    }

    return (
        <>
            <CommunitySEO CommunityData={communityData}/>
            <Header communityData={communityData}/>
            <PageContent>
                <></>
                <></>
            </PageContent>
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

export default CommunityPage;