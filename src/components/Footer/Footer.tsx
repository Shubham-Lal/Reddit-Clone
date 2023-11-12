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
            borderTop="1px solid"
            borderColor="blue.500"
        >
            <Text mr={1}>Made with</Text>
            <Text color="blue.500">
                <BsFillSuitHeartFill />
            </Text>
            <Text ml={1}>by</Text>
            <Link href="https://github.com/Shubham-Lal" target="_blank">
                <Text ml={1} color="#FF3C00" textDecoration="underline">Shubham Lal</Text>
            </Link>
        </Flex>
    )
}
export default Footer;