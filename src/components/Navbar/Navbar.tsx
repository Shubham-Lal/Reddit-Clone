import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Link from "next/link";


const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <Flex bg="white" height="44px" padding="6px 12px" justify={{ md: "space-between" }}>
            <Flex align="center" width={{ base: "40px", md: "auto" }} mr={{ base: 0, md: 2 }} cursor="pointer" onClick={() => {window.location.href = '/'}}>
                <Image src="/images/redditFace.svg" alt="reddit-logo" height="30px" />
                <Image src="/images/redditText.svg" alt="reddit-text" height="46px" display={{
                    base: "none",
                    md: "unset"
                }} />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user} />
        </Flex>
    )
}
export default Navbar;