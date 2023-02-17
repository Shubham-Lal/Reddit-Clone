import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";


const Navbar: React.FC = () => {

    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src="/images/redditFace.svg" alt="reddit-logo" height="30px" />
                <Image src="/images/redditText.svg" alt="reddit-text" height="46px" display={{
                    base: "none",
                    md: "unset"
                }}/>
            </Flex>
            <SearchInput />
            <RightContent />
        </Flex>
    )
}
export default Navbar;