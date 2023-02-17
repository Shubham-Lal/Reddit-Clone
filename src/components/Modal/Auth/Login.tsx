import { authModalState } from "../../../atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";


type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [error, setError] = useState("");
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        userError,
    ] = useSignInWithEmailAndPassword(auth);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (error) setError("");
        if (loginForm.password.length < 6) {
            setError("Password must be atleast 6 characters long!");
            return;
        }
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                onChange={onChange}
                required
                name="email"
                placeholder="Email"
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
                placeholder="Password"
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
            {(error || userError) && (
                <Text textAlign="center" color="red" fontSize="10pt">
                    {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            )}
            <Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
                Log In
            </Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New here?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setAuthModalState(prev => ({
                        ...prev,
                        view: "signup"
                    }))}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    )
}
export default Login;