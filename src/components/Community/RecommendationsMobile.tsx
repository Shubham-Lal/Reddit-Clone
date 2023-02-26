import { Community } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";
import { Flex, Icon, Image, Skeleton, SkeletonCircle, Stack, Text, Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";

type RecommendationsProps = {
    loading: boolean;
    communitites: Community[];
};

const RecommendationsMobile: React.FC<RecommendationsProps> = ({ loading, communitites }) => {
    const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

    return (
        <Flex direction="column" top="56px" bg="white" borderRadius={4} border="1px solid" borderColor="gray.300" mb={2}
            display={{ base: "flex", md: "none" }}
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                bg="blue.500"
                height="70px"
                borderRadius="4px 4px 0px 0px"
                fontWeight={600}
                backgroundSize="cover"
                bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('images/recCommsArt.png')"
            >
                Top Communities
            </Flex>
            <Flex direction="column">
                {loading ? (
                    <Stack mt={2} p={3}>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                    </Stack>
                ) : (
                    <>
                        {communitites.map((item, index) => {
                            const isJoined = !!communityStateValue.mySnippets.find(
                                (snippet) => snippet.communityId === item.id
                            );
                            return (
                                <Flex key={item.id} position="relative" align="center" fontSize="10pt" borderBottom="1px solid" borderColor="gray.200" p="10px 12px">
                                    <Flex width="80%" align="center">
                                        <Flex width="15%">
                                            <Text>
                                                {index + 1}
                                            </Text>
                                        </Flex>
                                        <Flex width="80%">
                                            <Link href={`/r/${item.id}`}>
                                                <Flex align="center" >
                                                    {item.imageURL ? (
                                                        <Image
                                                            src={item.imageURL}
                                                            borderRadius="full"
                                                            boxSize="28px"
                                                            mr={2}
                                                            alt="Community Logo"
                                                        />
                                                    ) : (
                                                        <Icon
                                                            as={FaReddit}
                                                            fontSize={30}
                                                            color="blue.500"
                                                            mr={2}
                                                        />
                                                    )}
                                                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                        {`r/${item.id}`}
                                                    </span>
                                                </Flex>
                                            </Link>
                                        </Flex>
                                    </Flex>
                                    <Box position="absolute" right={isJoined ? "10px" : "16.5px"}>
                                        <Button p="12px 18px" height="22px" fontSize="8pt" variant={isJoined ? "outline" : "solid"}
                                            onClick={() => {
                                                onJoinOrLeaveCommunity(item, isJoined)
                                            }}
                                        >
                                            {isJoined ? "Leave" : "Join"}
                                        </Button>
                                    </Box>
                                </Flex>
                            )
                        })}
                        <Box p="10px 20px">
                            <Button height="30px" width="100%">View All</Button>
                        </Box>
                    </>
                )}
            </Flex>
        </Flex >
    )
}
export default RecommendationsMobile;