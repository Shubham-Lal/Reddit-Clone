import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsFillSuitHeartFill } from "react-icons/bs";


const Footer = () => {

    return (
        <Flex
            width="100%"
            position="fixed"
            justify="center"
            align="center"
            zIndex={99}
            bg="white"
            height="44px"
            bottom={0}
            borderTopLeftRadius="50%"
            borderTopRightRadius="50%"
        >
            <Text mr={1}>Made with</Text>
            <BsFillSuitHeartFill color="red" />
            <Text ml={1}>by</Text>
            <Link href="https://shubhamlal.pages.dev">
                <Text ml={1} color="#FF3C00">Shubham Lal</Text>
            </Link>
        </Flex>
    )
}
export default Footer;