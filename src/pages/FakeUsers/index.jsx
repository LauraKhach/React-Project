import { useEffect, useState } from "react";
import { Flex, Spinner } from '@chakra-ui/react';
import axios from "axios";
import FakeUserCard from "./FakeUserCard";
import userService from "../../services/userService";

export default function FakeUsers() {
    const [ fakeUsers, setFakeUsers ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const initUsers = async() => {
       const users = await userService.getFakeUsers();
        setIsLoading(false);
        setFakeUsers(users.data);
    }

    useEffect(() => {
        initUsers();
    }, []);

    return (
        <>
            { 
                isLoading ? 
                <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
                    <Spinner minWidth="200px" minHeight="200px" speed='0.8s' />  
                </Flex> :
                <Flex flexWrap="wrap" bg="lightsteelblue">
                    {
                        fakeUsers.map((user) => (
                            <FakeUserCard key={user?.id} user={user} />
                        ))
                    }
                </Flex>
            }
        </>
    );
}