import { Box, Text, Link, Button } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

export default function FakeUserCard({user}) {
    return (
        <Box
            w="500px"
            h="500px"
            p="30px"
            m="50px"
            boxSizing="border-box"
            border="none"
            bg="blue.500"
            color="white"
            boxShadow="15px 20px 10px #888888"
        >
            <Text>{user?.name}</Text>
            <Text>{user?.username}</Text>
            <Text>{user?.phone}</Text>
            <Text>{user?.email}</Text>
            <Button color="black"><Link as={ReactLink} to={`/fake-users/${user?.id}`}>Open Single Page</Link></Button>
        </Box>
    );
}