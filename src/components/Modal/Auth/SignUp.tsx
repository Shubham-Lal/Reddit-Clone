import { authModalState } from "../../../atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";


const SignUp:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = () => {

    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                onChange={onChange}
                required
                name="email"
                placeholder="Enter your Email address"
                type="email"
                bg="gray.50"
                mb={2}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
            />
            <Input
                onChange={onChange}
                required
                name="password"
                placeholder="Enter a strong Password"
                type="password"
                bg="gray.50"
                mb={2}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
            />
            <Input
                onChange={onChange}
                required
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                bg="gray.50"
                mb={2}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
            />
            <Button type="submit" width="100%" height="36px" mt={2} mb={2}>
                Sign Up
            </Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a Redditor?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setAuthModalState(prev => ({
                        ...prev,
                        view: "login"
                    }))}
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;