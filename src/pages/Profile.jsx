import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById, getUsers } from '../helpers';
import { useUser } from '../contexts/UserContext';

export default function Profile() {
    const [btn, setBtn] = useState("Follow");
    const { currentUser } = useUser();

    const { id } = useParams();
    const user = getUserById(id);

    const onBtnClick = () => {
        if (btn === "Follow") {
            setBtn("Unfollow");
        }
        else {
            setBtn("Follow");
        }
        
        const currentUserFollowings = JSON.parse(currentUser.followings || null) || [];
        const currentUserWithNewFollowings = [
            ...currentUserFollowings,
            user,
        ]
        const newCurrentUser = {
            ...currentUser,
            followings: JSON.stringify(currentUserWithNewFollowings),
        }

        const userFollowers = JSON.parse(user.followers || null) || [];
        const userWithNewFollowers = [
            ...userFollowers,
            currentUser,
        ]
        const newUser = {
            ...user,
            followers: JSON.stringify(userWithNewFollowers),
        }
        
        updateCurrentUsers(newCurrentUser);
        updateUser(newCurrentUser);
        updateUsers(newUser);
    }

    const updateCurrentUsers = (newCurrentUser) => {
        const users = getUsers();
        const filteredUsers = users.filter(user => user?.id !== newCurrentUser?.id);
        const newUsers = [
            ...filteredUsers,
            newCurrentUser
        ];
        const usersJSON = JSON.stringify(newUsers);
        localStorage.setItem("users", usersJSON);
    }

    const updateUser = (newCurrentUser) => {
        const userJSON = JSON.stringify(newCurrentUser);
        localStorage.setItem("user", userJSON);
    } 

    const updateUsers = (newUser) => {
        const users = getUsers();
        const filteredUsers = users.filter(user => user?.id !== newUser?.id);
        const newUsers = [
            ...filteredUsers,
            newUser
        ];
        const usersJSON = JSON.stringify(newUsers);
        localStorage.setItem("users", usersJSON);
    }

    return (
        <Flex
            w="100%"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            bg="dodgerblue"
        >
            <Flex fontFamily="initial">
                <Box
                    mr="50px"
                >
                    <Image
                        alt="user_avatar"
                        src={user?.image}
                        w="500px"
                        h="500px"
                        objectFit="cover"
                        borderRadius="50%"
                    ></Image>
                </Box>
                <Box>
                    <Text
                        mb="30px"
                        fontSize="8xl"
                        fontWeight="bold"
                        color="yellow.400"
                    >
                        {user?.first_name} {user?.last_name}
                    </Text>
                    <Flex alignItems="center">
                        <Text 
                            fontSize="5xl" 
                            fontWeight="bold"
                            color="red.500"
                        >
                            Email: 
                        </Text>
                        <Text 
                            as="i"
                            textDecoration="underline"
                            fontSize="4xl"
                            ml="50px"
                        >
                            {user?.email}
                        </Text>
                    </Flex>
                    <Button
                        onClick={onBtnClick}
                        w="100%"
                        h="50px"
                        mt="30px"
                        bg="white"
                        color="dodgerblue"
                        fontSize="20px"
                    >
                        {btn} 
                   </Button>
                </Box>
            </Flex>
            <Link to="/users">Users</Link>
        </Flex>
    );
}