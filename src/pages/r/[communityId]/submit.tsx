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


const SubmitPostPage: React.FC = () => {
    const [user] = useAuthState(auth);
    const communityStateValue = useRecoilValue(communityState);

    if (user && communityStateValue.currentCommunity) {
        return (
            <>
                <CommunitySEO CommunityData={communityStateValue.currentCommunity!} />
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
                        About Component
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