import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      margin="0 10px"
      textAlign="center"
    >
      Sorry, the page you are looking for doesn't exists!
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
