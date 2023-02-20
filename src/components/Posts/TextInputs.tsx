import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";


type TextInputsProps = {
    textInput: {
        title: string;
        body?: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({ textInput, onChange, handleCreatePost, loading }) => {

    return (
        <Stack spacing={3} width="100%">
            <Input
                name="title"
                // value={}
                // onChange={}
                fontSize="12pt"
                borderRadius={4}
                placeholder="Title"
                _placeholder={{ color: "gray.500" }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }}
            />
            <Textarea
                name="body"
                // value={}
                // onChange={}
                fontSize="10pt"
                borderRadius={4}
                placeholder="Text (optional)"
                _placeholder={{ color: "gray.500" }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }}
                scrollBehavior="smooth"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '20px',
                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '20px',
                        backgroundColor: "#FF3C00",
                    },
                }}
            />
            <Flex justify="flex-end">
                <Button height="34px" p="0 30px" disabled={false} isLoading={loading} loadingText="Posting" onClick={() => {}}>
                    Post
                </Button>
            </Flex>
        </Stack>
    )
}
export default TextInputs;