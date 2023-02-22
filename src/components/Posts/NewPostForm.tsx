import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon, Text } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import { useState } from "react";
import TextInputs from "./PostForms/TextInputs";
import LinksPostForm from "./PostForms/LinksPostForm";
import PollsPostForm from "./PostForms/PollsPostForm";
import TalkPostForm from "./PostForms/TalkPostForm";
import ImageUpload from "./PostForms/ImageUpload";
import { Post } from "../../atoms/postAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { Community } from "../../atoms/communitiesAtom";
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React from "react";
import useSelectFile from "../../hooks/useSelectFile";


type NewPostFormProps = {
    user: User;
    communityData: Community;
};

const formTabs: TabItems[] = [
    {
        title: "Post",
        icon: IoDocumentText
    },
    {
        title: "Images & Video",
        icon: IoImageOutline
    },
    {
        title: "Links",
        icon: BsLink45Deg
    },
    {
        title: "Poll",
        icon: BiPoll
    },
    {
        title: "Talk",
        icon: BsMic
    },
];

export type TabItems = {
    title: string;
    icon: typeof Icon.arguments;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ user, communityData }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Using Hooks for Global onSelectFile
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event;
        setTextInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleCreatePost = async () => {
        // Step 1) Create Post Object
        // Step 2) Store the Post Document in Firebase Database
        // Step 3) Check for Image Upload 
        // -> then store it into Firebase Storage Bucket 
        // -> Update Post Document in Database by adding ImageURL
        // Step 4) Redirect User to the Community Page
        setError(false);
        setLoading(true);
        const { communityId } = router.query;
        // STEP 1:
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.displayName || user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            imageURL: selectedFile || "",
            communityImageURL: communityData.imageURL || "",
            createdAt: serverTimestamp() as Timestamp
        };
        // STEP 2:
        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            // STEP 3:
            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, "data_url");
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                });
            }
            // STEP 4:
            router.back();
        }
        catch (error: any) {
            console.log(error.message);
            if (error.message === `The value of property "imageURL" is longer than 1048487 bytes.`)
                alert("Maximum allowed image size is 1MB! Try again...");
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} key={item.title} />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && <TextInputs textInputs={textInputs} onChange={onTextChange} handleCreatePost={handleCreatePost} loading={loading} />}
                {selectedTab === "Images & Video" && <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} onSelectImage={onSelectFile} setSelectedTab={setSelectedTab} />}
                {selectedTab === "Links" && <LinksPostForm />}
                {selectedTab === "Poll" && <PollsPostForm />}
                {selectedTab === "Talk" && <TalkPostForm />}
            </Flex>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text>Error Creating Post!</Text>
                </Alert>
            )}
        </Flex>
    )
}
export default NewPostForm;