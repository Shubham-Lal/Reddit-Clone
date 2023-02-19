import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type PageContentProps = {
    children: ReactNode
};

const PageContent:React.FC<PageContentProps> = ({ children }) => {

    return (
        <Flex>
            <Flex>
                {/* Left Side */}
                <Flex></Flex>

                {/* Right Side */}
                <Flex></Flex>
            </Flex>
        </Flex>
    )
}
export default PageContent;