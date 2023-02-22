import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { useRef } from "react";


type ImageUploadProps = {
    selectedFile?: string;
    setSelectedFile: (value: string) => void;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, setSelectedFile, onSelectImage, setSelectedTab }) => {
    const selectedFileRef = useRef<HTMLInputElement>(null);

    return (
        <Flex direction="column" justify="center" align="center" width="100%">
            {selectedFile
                ? <>
                    <Image src={selectedFile} maxWidth={{ base: "auto", sm: "400px" }} maxHeight={{ base: "auto", sm: "400px" }} alt="Preview File"/>
                    <Stack direction="row" mt={4}>
                        <Button height="28px" onClick={() => setSelectedTab("Post")}>
                            Back to Post
                        </Button>
                        <Button variant="outline" height="28px" onClick={() => setSelectedFile("")}>
                            Remove
                        </Button>
                    </Stack>
                </>
                :
                <Flex justify="center" align="center" p={20} border="1px dashed" borderRadius={4} borderColor="gray.200" width="100%">
                    <Button variant="outline" height="28px" onClick={() => selectedFileRef.current?.click()}>
                        Upload
                    </Button>
                    <input type="file" ref={selectedFileRef} onChange={onSelectImage} hidden />
                </Flex>
            }
        </Flex>
    )
}
export default ImageUpload;