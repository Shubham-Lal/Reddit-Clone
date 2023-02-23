import { Box, Button, Divider, Flex, Icon, Image, Spinner, Stack, Text } from "@chakra-ui/react";
// import { Icon } from "@chakra-ui/react";
import { Community, communityState } from "../../atoms/communitiesAtom";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/clientApp";
import { GiCaptainHatProfile } from "react-icons/gi";
import { useRef } from "react";
import useSelectFile from "../../hooks/useSelectFile";
import { FaReddit } from "react-icons/fa";
import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";


type AboutProps = {
    communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null);

    const { selectedFile, onSelectFile, imageUploaded, setImageUploaded } = useSelectFile();
    const [uploadingImage, setUploadingImage] = useState(false);
    const setCommunityStateValue = useSetRecoilState(communityState);

    const onUpdateImage = async () => {
        if (!selectedFile) return;
        setUploadingImage(true);
        try {
            const imageRef = ref(storage, `communities/${communityData.id}/image`);
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "communities", communityData.id), {
                imageURL: downloadURL,
            });

            setCommunityStateValue(prev => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                } as Community,
            }));
        }
        catch (error: any) {
            console.log(error.message);
        }
        finally {
            setUploadingImage(false);
            setImageUploaded(true);
        }
    };

    return (
        <Box position="sticky" top="60px">
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
                    {user && (
                        <Link href={`/r/${communityData.id}/submit`}>
                            <Button mt={3} height="30px" width="100%">
                                Create Post
                            </Button>
                        </Link>
                    )}
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize="10pt">
                                <Flex align="center">
                                    <Icon as={GiCaptainHatProfile} mr={2} />
                                    <Text fontWeight={600}>
                                        Admin
                                    </Text>
                                </Flex>
                                <Flex align="center" justify="space-between">
                                    {uploadingImage ? (
                                        <>
                                            <Text color="blue.500">
                                                Uploading Image...
                                            </Text>
                                        </>
                                    ) : (
                                        <Text color={selectedFile ? "gray.500" : "blue.500"} cursor="pointer" _hover={{ textDecoration: "underline" }}
                                            onClick={() => {
                                                selectedFileRef.current?.click();
                                            }}
                                        >
                                            Change Community Image
                                        </Text>
                                    )}
                                    {communityData.imageURL || selectedFile ? (
                                        <Image
                                            src={selectedFile || communityData.imageURL}
                                            borderRadius="full"
                                            boxSize="40px"
                                            alt="Community Image"
                                        />
                                    ) : (
                                        <Icon
                                            as={FaReddit}
                                            fontSize={40}
                                            color="brand.100"
                                            mr={2}
                                        />
                                    )}
                                </Flex>
                                {selectedFile && (uploadingImage ? (
                                    <Spinner />
                                ) : (!imageUploaded &&
                                    <Text cursor="pointer" color="blue.500" onClick={onUpdateImage}>
                                        Save Changes
                                    </Text>
                                ))}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/x-png, image/gif, image/jpeg"
                                    hidden
                                    ref={selectedFileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box >
    )
}
export default About;