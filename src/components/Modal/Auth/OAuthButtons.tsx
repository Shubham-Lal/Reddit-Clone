import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle, useSignInWithGithub, useSignInWithMicrosoft } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithMicrosoft, mUser, mLoading, mError] = useSignInWithMicrosoft(auth);
    const [signInWithGithub, gbUser, gbLoading, gbError] = useSignInWithGithub(auth);

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={gLoading} onClick={() => signInWithGoogle()}>
                <Image src="/images/googlelogo.png" alt="google-logo" height="20px" mr={2} />
                Continue with Google
            </Button>
            <Button variant="oauth" mb={2} isLoading={mLoading} onClick={() => signInWithMicrosoft()}>
                <Image src="/images/microsoftlogo.png" alt="microsoft-logo" height="20px" mr={2} />
                Continue with Microsoft
            </Button>
            <Button variant="oauth" mb={2} isLoading={gbLoading} onClick={() => signInWithGithub()}>
                <Image src="/images/githublogo.png" alt="github-logo" height="20px" mr={2} />
                Continue with Github
            </Button>
            {gError && <Text>{gError?.message}</Text>}
            {mError && <Text>{mError?.message}</Text>}
            {gbError && <Text>{gbError?.message}</Text>}
        </Flex>
    )
}
export default OAuthButtons;