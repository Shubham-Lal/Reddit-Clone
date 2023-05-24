// import { defaultMenuItem } from "../../atoms/directoryMenuAtom";
// import useDirectory from "../../hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    // const { onSelectMenuItem } = useDirectory();

    return (
        <>
            <Flex
                as="header"
                position="fixed"
                width="100%"
                zIndex={99}
                bg="white"
                height="44px"
                padding="6px 12px"
                justify={{ md: "space-between" }}
                // boxShadow="0px 0px 5px 5px #E0E0E0"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                {/* () => { window.location.href = '/' }  <-- Can be used for routing too but refreshes the page */}
                <Flex align="center" width={{ base: "40px", md: "auto" }} mr={{ base: 0, md: 2 }} cursor="pointer"
                    onClick={() => {
                        window.location.href = '/';
                        // onSelectMenuItem(defaultMenuItem);
                    }}
                >
                    <Image src="/images/redditFace.svg" alt="reddit-logo" height="30px" />
                    <Image src="/images/redditText.svg" alt="reddit-text" height="46px" display={{
                        base: "none",
                        md: "unset"
                    }} />
                </Flex>
                {user && <Directory />}
                {/* <SearchInput user={user} /> */}
                <RightContent user={user} />
            </Flex>
        </>
    )
}
export default Navbar;
