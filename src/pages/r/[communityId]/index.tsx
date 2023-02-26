import { firestore } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import CommunitySEO from "../../../pages/seo-community";
import SEO from "../../../pages/seo";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Community/About";
import AboutMobile from "../../../components/Community/AboutMobile";
import Footer from "../../../components/Footer/Footer";

type CommunityPageProps = {
    communityData: Community
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
    const setCommunityStateValue = useSetRecoilState(communityState);
    useEffect(() => {
        setCommunityStateValue(prev => ({
            ...prev,
            currentCommunity: communityData,
        }))
    }, [communityData]);

    if (!communityData) {
        return (
            <>
                <SEO />
                <NotFound />
                <Footer />
            </>
        )
    }

    return (
        <>
            <CommunitySEO CommunityData={communityData} />
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                    <AboutMobile communityData={communityData} />
                    <Posts communityData={communityData} />
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

export default CommunityPage;