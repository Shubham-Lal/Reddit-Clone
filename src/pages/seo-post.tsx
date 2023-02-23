import { Community } from "../atoms/communitiesAtom";
import Head from "next/head";

type PostSEOProps = {
    communityData: Community
};

const PostSEO: React.FC<PostSEOProps> = ({ communityData }) => {

    return (
        <Head>
            <title>{`Post | ${communityData?.id}'s Community`}</title>
            <meta name="description" content={`${communityData?.id}'s Community Post | Reddit Clone`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={communityData?.imageURL ? communityData.imageURL : "/favicon.ico"} />
        </Head>
    )
}

export default PostSEO;