import { Flex, Icon } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import { useState } from "react";
import TextInputs from "./TextInputs";


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

    const onTextChange = () => { };

    const onSelectImage = () => { };

    const handleCreatePost = async () => { };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} key={item.title} />
                ))}
            </Flex>
            <Flex p={4}>
                <TextInputs textInput={textInputs} onChange={onTextChange} handleCreatePost={handleCreatePost} loading={loading}/>
            </Flex>
        </Flex>
    )
}
export default NewPostForm;