import { communityState } from "../../../atoms/communitiesAtom";
import { auth } from "../../../firebase/clientApp";
import CommunitySEO from "../../seo-community";
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import SEO from "../../seo";
import NotFound from "../../../components/Community/NotFound";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer/Footer";
import About from "../../../components/Community/About";
import useCommunityData from "../../../hooks/useCommunityData";
import AboutMobile from "@/components/Community/AboutMobile";


const SubmitPostPage: React.FC = () => {
    const [user] = useAuthState(auth);
    // const communityStateValue = useRecoilValue(communityState);
    const { communityStateValue } = useCommunityData();

    if (user && communityStateValue.currentCommunity) {
        return (
            <>
                <CommunitySEO CommunityData={communityStateValue.currentCommunity!} />
                <AboutMobile communityData={communityStateValue.currentCommunity} singlePage={true} onSubmitPage={true}/>
                <PageContent>
                    <>
                        <Box p="14px 0" borderBottom="1px solid" borderColor="white">
                            <Text>
                                Create a post
                            </Text>
                        </Box>
                        <NewPostForm user={user} communityData={communityStateValue.currentCommunity!} />
                    </>
                    <>
                        <About communityData={communityStateValue.currentCommunity} onSubmitPage={true}/>
                    </>
                </PageContent>
                <Footer />
            </>
        )
    }
    return (
        <>
            <SEO />
            <NotFound />
            <Footer />
        </>
    )
}

export default SubmitPostPage;