import { Box, Button, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react";
// import { Icon } from "@chakra-ui/react";
import { Community } from "../../atoms/communitiesAtom";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";


type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const router = useRouter();

    return (
        <Box position="sticky" top="58px">
            <Flex justify="space-between" align="center" bg="blue.400" color="white" p={3} borderRadius="4px 4px 0 0">
                <Text fontSize="12pt">
                    About {communityData.id}
                </Text>
                {/* <Icon as={HiOutlineDotsHorizontal} cursor="pointer"/> */}
            </Flex>
            <Flex direction="column" p={3} bg="white" borderRadius="0 0 4px 4px">
                <Stack>
                    <Flex width="100%" p={2} fontSize="10pt">
                        <Flex direction="column" flexGrow={1} align="center" justify="center">
                            <Text fontWeight={700}>
                                {communityData.numberOfMembers.toLocaleString()}
                            </Text>
                            <Text>
                                {communityData.numberOfMembers > 1 ? "Members" : "Member"}
                            </Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1} align="center" justify="center">
                            <Text fontWeight={700}>{communityData.privacyType.at(0)! === "p" ? "P" : "R"}{communityData.privacyType.split("p" || "r")}</Text>
                            <Text>Community</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex align="center" width="100%" p={1} fontWeight={500} fontSize="10pt">
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        {communityData.createdAt &&
                            <Text>
                                Created {moment(new Date(communityData.createdAt?.seconds * 1000)).format("DD MMM, YYYY")}
                            </Text>}
                    </Flex>
                    <Link href={`/r/${router.query.communityId}/submit`}>
                        <Button mt={3} height="30px" width="100%">Create Post</Button>
                    </Link>
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;