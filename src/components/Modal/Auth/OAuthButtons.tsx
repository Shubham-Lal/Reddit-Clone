import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSignInWithGoogle, useSignInWithGithub, useSignInWithMicrosoft } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithMicrosoft, mUser, mLoading, mError] = useSignInWithMicrosoft(auth);
    const [signInWithGithub, gbUser, gbLoading, gbError] = useSignInWithGithub(auth);
    const [error, setError] = useState(false);
    useEffect(() => {
        if(gError || mError || gbError) setError(true);
    }, [gError, mError,gbError]);

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={gLoading} onClick={() => {
                setError(false);
                signInWithGoogle();
            }}>
                <Image src="/images/googlelogo.png" alt="google-logo" height="20px" mr={2} />
                Continue with Google
            </Button>
            <Button variant="oauth" mb={2} isLoading={mLoading} onClick={() => {
                setError(false);
                signInWithMicrosoft();
            }}>
                <Image src="/images/microsoftlogo.png" alt="microsoft-logo" height="20px" mr={2} />
                Continue with Microsoft
            </Button>
            <Button variant="oauth" mb={2} isLoading={gbLoading} onClick={() => {
                setError(false);
                signInWithGithub();
            }}>
                <Image src="/images/githublogo.png" alt="github-logo" height="20px" mr={2} />
                Continue with Github
            </Button>
            {error && <Text textAlign="center" color="red" fontSize="10pt">Something went wrong! Try again Later...</Text>
                // <>
                //     {gError && <Text textAlign="center" color="red" fontSize="10pt">{FIREBASE_ERRORS[gError?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
                //     {mError && <Text textAlign="center" color="red" fontSize="10pt">{FIREBASE_ERRORS[mError?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
                //     {gbError && <Text textAlign="center" color="red" fontSize="10pt">{FIREBASE_ERRORS[gbError?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
                // </>
            }
        </Flex>
    )
}
export default OAuthButtons;