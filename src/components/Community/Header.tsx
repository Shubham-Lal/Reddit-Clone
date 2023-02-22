import { Box, Button, Flex, Icon, Image, Text, SkeletonCircle } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import { FcCheckmark } from "react-icons/fc";
import useCommunityData from "../../hooks/useCommunityData";
import { useState } from "react";


type HeaderProps = {
    communityData: Community
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    const { communityStateValue, onJoinOrLeaveCommunity, loading } = useCommunityData();
    const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id);
    const [loadingImage, setLoadingImage] = useState(true);

    return (
        <Flex direction="column" width="100%" height="146px">
            <Box height="50%" bg="blue.400" />
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex width="95%" maxWidth="860px">
                    {loadingImage && communityData.imageURL != "" && (
                        <Box position="relative" top={-3} border="4px solid" borderColor="white" borderRadius="full">
                            <SkeletonCircle boxSize="58px" />
                        </Box>
                    )}
                    {communityStateValue.currentCommunity?.imageURL
                        ? <Image
                            src={communityStateValue.currentCommunity.imageURL}
                            alt={communityData.id}
                            position="relative"
                            top={-3}
                            color="blue.500"
                            boxSize="66px"
                            border="4px solid white"
                            borderRadius="full"
                            onLoad={() => setLoadingImage(false)}
                            display={loadingImage ? "none" : "unset"}
                        />
                        : <>
                            <Icon as={FaReddit} fontSize={64} position="relative" top={-3} color="#FF3C00" border="4px solid white" borderRadius="50%" />
                        </>
                    }
                    <Flex padding="10px 16px">
                        <Flex direction="column" mr={6}>
                            <Flex align="center">
                                <Text fontWeight={800} fontSize="16pt">
                                    {communityData.id}
                                </Text>
                                {communityData.verified && <Icon ml={1} as={FcCheckmark} fontSize={20} />}
                            </Flex>
                            <Text fontWeight={600} fontSize="10pt" color="gray.400">
                                r/{communityData.id}
                            </Text>
                        </Flex>
                        <Button
                            variant={isJoined ? "outline" : "solid"}
                            height="30px"
                            pr={6} pl={6}
                            isLoading={loading}
                            onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                        >
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Header;