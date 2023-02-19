import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import SEO from "./seo";


const Error: React.FC = () => {

    return (
        <>
            <SEO />
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
                margin="0 10px"
                textAlign="center"
            >
                Sorry, this page doesn't exists!
                <Link href="/">
                    <Button mt={4}>GO HOME</Button>
                </Link>
            </Flex>
        </>
    )
}
export default Error;