import { Flex, Icon } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import { useState } from "react";
import TextInputs from "./TextInputs";
import LinksPostForm from "./LinksPostForm";
import PollsPostForm from "./PollsPostForm";
import TalkPostForm from "./TalkPostForm";
import ImageUpload from "./ImageUpload";


type NewPostFormProps = {

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event;
        setTextInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        if (!event.target.files?.[0]) return;
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }

    };

    const handleCreatePost = async () => { };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} key={item.title} />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && <TextInputs textInputs={textInputs} onChange={onTextChange} handleCreatePost={handleCreatePost} loading={loading} />}
                {selectedTab === "Images & Video" && <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} onSelectImage={onSelectImage} setSelectedTab={setSelectedTab} />}
                {selectedTab === "Links" && <LinksPostForm />}
                {selectedTab === "Poll" && <PollsPostForm />}
                {selectedTab === "Talk" && <TalkPostForm />}
            </Flex>
        </Flex>
    )
}
export default NewPostForm;