import { Box, Flex, Text, Input, Button, Link, useToast } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { getUsers } from '../helpers';

function SignIn() {
    const toast = useToast();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = (values) => {
        const userWithEmailExists = emailexists(values.email);
        if (!userWithEmailExists) {
            return toast({
                    title: 'Wrong email',
                    description: "User following email doesn't exists.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
        }

        const userWithPasswordExists = emailAndPasswordexists(values.password, values.email);
        if (!userWithPasswordExists) {
            return toast({
                title: 'Wrong email or password',
                description: "User following email or password doesn't exists.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        const user = getUser(values.email, values.password);
        
        const userJSON=JSON.stringify(user);
        localStorage.setItem("user", userJSON);
        
        toast ({
            title: "Successfully loged in",
            status: "success",
        })
        navigate("/profile");
    }

    const getUser = (email, password) => {
        const users = getUsers();
        const user = users.find((user) => user.password === password && user.email === email);
        
        return user;
    }

    getUsers();

    const emailexists = (email) => {
        const users = getUsers();
        const exists = users.find((user) => user.email === email);
        
        return exists ? true : false;
    }

    const emailAndPasswordexists = (password, email) => {
        console.log(email, password);
        const users = getUsers();
        const exists = users.find((user) => user.password === password && user.email === email);
        
        return exists ? true : false;
    }

    return (
        <Flex
            w="100%"
            height="100vh"
            backgroundColor="dodgerblue"
            justifyContent="center"
            alignItems="center"
        >
            <Flex
                w="max-content"
                h="max-content"
                p="50px"
                backgroundColor="white"
                borderRadius="10px"
                flexDirection="column"
                alignItems="center"
            >
                <Text 
                    textAlign="center"
                    fontSize="5xl"
                    fontWeight="bold"
                >
                    Sign In
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Text
                            mt="30px"
                            mb="10px"
                            fontWeight="bold"
                            fontSize="xl"
                        >
                            Email
                        </Text>
                        <Input 
                            type="email"
                            placeholder='Email' 
                            w="800px"
                            h="50px"
                            {...register("email", {required: 'Email is required'})}
                        />
                        {errors?.email && 
                            <Text
                            color="red"
                            fontSize="13px"
                            >
                            { errors?.email?.message }
                            </Text>
                        }
                    </Box>
                    <Box>
                        <Text
                            mt="30px"
                            mb="10px"
                            fontWeight="bold"
                            fontSize="xl"
                        >
                            Password
                        </Text>
                        <Input 
                            type="password"
                            placeholder='Password' 
                            w="800px"
                            h="50px"
                            {...register("password", {required: 'Password is required'})}
                        />
                        {errors?.password && 
                            <Text
                                color="red"
                                fontSize="13px"
                                >
                                { errors?.password?.message }
                            </Text>
                        }
                    </Box>
                    <Button
                        type='submit'
                        w="810px"
                        h="50px"
                        mt="20px"
                        mb="20px"
                        border="none"
                        borderRadius="10px"
                        backgroundColor="dodgerblue"
                        color="white"
                        fontWeight="bold"
                        fontSize="20px"
                        cursor="pointer"
                        _hover={{
                            backgroundColor:"red"
                        }}
                    >
                        Sign In
                    </Button>
                </form>
                <Link as={ReactLink} to="/sign-up">Sign Up</Link>
            </Flex>
        </Flex>
    );
}

export default SignIn;