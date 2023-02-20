import { Community } from "../../../atoms/communitiesAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import CommunitySEO from "../../seo-community";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import SEO from "../../seo";
import NotFound from "../../../components/Community/NotFound";


type SubmitPostPageProps = {
    communityData: Community
};

const SubmitPostPage: React.FC<SubmitPostPageProps> = ({ communityData }) => {


    const [user] = useAuthState(auth);
    if (user) {
        return (
            <>
                <CommunitySEO CommunityData={communityData} />
                <PageContent>
                    <>
                        <Box p="14px 0" borderBottom="1px solid" borderColor="white">
                            <Text>
                                Create a post
                            </Text>
                        </Box>
                        <NewPostForm />
                    </>
                    <>About Component</>
                </PageContent>
            </>
        )
    }
    return (
        <>
            <SEO />
            <NotFound />
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

export default SubmitPostPage;