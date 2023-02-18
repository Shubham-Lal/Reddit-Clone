import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src="/images/redditFace.svg" alt="reddit-logo" height="30px" />
                <Image src="/images/redditText.svg" alt="reddit-text" height="46px" display={{
                    base: "none",
                    md: "unset"
                }}/>
            </Flex>
            <Directory />
            <SearchInput />
            <RightContent user={user} />
        </Flex>
    )
}
export default Navbar;