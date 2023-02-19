import { Community } from "@/atoms/communitiesAtom";
import Head from "next/head";

type CommunitySEOProps = {
    CommunityData: Community
};

const CommunitySEO:React.FC<CommunitySEOProps> = ({ CommunityData }) => {
    
    return (
        <Head>
            <title>{CommunityData?.id}</title>
            <meta name="description" content={`${CommunityData?.id}'s Community Page | Reddit Clone`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={CommunityData?.imageURL ? CommunityData?.imageURL : "/favicon.ico"} />
        </Head>
    )
}
export default CommunitySEO;