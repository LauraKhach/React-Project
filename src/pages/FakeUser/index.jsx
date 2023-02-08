import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Input, Text, Box } from '@chakra-ui/react';
import UserPosts from "./UserPosts";
import userService from "../../services/userService";

export default function FakeUser() {
    const [ user, setUser ] = useState([]);
    const { id } = useParams();

    console.log(3);
    
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async() => {
        const user = await userService.getFakeUserId(id);
        setUser(user.data);
    }

    const getUserByUsername = async(e) => {
        const users = await userService.getFakeUsers();
        const filteredUser = users.data.filter(user => user?.username === e.target.value);
        setUser(...filteredUser);
    }

    const getUserByEmail = async(e) => {
        const users = await userService.getFakeUsers();
        console.log(users);
        const filteredUser = users.data.filter(user => user?.email === e.target.value);
        setUser(...filteredUser);
    }

    const getUserByAddress = async(e) => {
        const users = await userService.getFakeUsers();
        const filteredUser = users.data.filter(user => user?.address?.city === e.target.value);
        setUser(...filteredUser);
    }

    return (
        <Box w="100%" p="30px" bg="blue.600" color="white">
            <Flex p="30px" justifyContent="space-around">
                <Input onChange={(e) => getUserByUsername(e)} variant="filled" w="300px" placeholder="username"></Input>
                <Input onChange={(e) => getUserByEmail(e)} variant="filled" w="300px" placeholder="email"></Input>
                <Input onChange={(e) => getUserByAddress(e)} variant="filled" w="300px" placeholder="city"></Input>
            </Flex>
            <Flex w="100%" h="80%" justifyContent="center" alignItems="center" flexDirection="column">
                <Text>{user?.name}</Text>
                <Text>{user?.phone}</Text>
                <Text>{user?.email}</Text>
                <Text>{user?.address?.city}</Text>
            </Flex>
            <UserPosts />
        </Box>
    );
}