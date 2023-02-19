import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";


const SignUp: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (error) setError("");
        if (signUpForm.password != signUpForm.confirmPassword) {
            setError("Password do not match!");
            return;
        }
        if (signUpForm.password.length < 6) {
            setError("Password must be atleast 6 characters long!");
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
    }

    const createUserDocument = async (user: User) => {
        await setDoc(
            doc(firestore, "users", user.uid),
            JSON.parse(JSON.stringify(user))
        );
    }

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

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
            {(error || userError) && (
                <Text textAlign="center" color="red" fontSize="10pt">
                    {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            )}
            <Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
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