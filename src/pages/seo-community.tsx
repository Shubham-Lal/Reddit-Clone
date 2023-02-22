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
            <title>{`${CommunityData.id}'s Community`}</title>
            <meta name="description" content={`${CommunityData.id}'s Community Page | Reddit Clone`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={communityStateValue.currentCommunity?.imageURL ? communityStateValue.currentCommunity.imageURL : "/favicon.ico"} />
        </Head>
    )
}
export default CommunitySEO;