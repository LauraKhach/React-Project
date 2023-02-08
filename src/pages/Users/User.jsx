import { Flex, Text, Image, Button, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

export default function User({fullName, avatar, id}) {
    return (
            <Flex 
                w="400px"
                h="500px"
                p="30px"
                m="30px"
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                bg="dodgerblue"
                borderRadius="20px"
                boxShadow="5px 10px 18px #888888"
                fontFamily="initial"
            >
                <Image
                    src={avatar}
                    alt='user_avatar'
                    borderRadius='50%'
                    w="300px"
                    h="300px"
                    objectFit="cover"
                />
                <Text 
                    as="i"
                    textAlign="center"
                    fontSize='4xl'
                    color="white"
                    textShadow="2px 2px 4px #000000"
                    letterSpacing="0.5px"
                >
                    {fullName}
                </Text>
                <Button
                    w="50%"
                    h="50px"
                    mt="10px"
                    _hover={{
                        bg: "transparent",
                        transition: "0.5s",
                    }}
                >
                    Follow
                </Button>
                <Button
                    w="50%"
                    h="50px"
                    mt="10px"
                    _hover={{
                        bg: "transparent",
                        transition: "0.5s",
                    }}
                >
                    <Link
                        as={ReactLink}
                        to={`/users/${id}`}
                    >
                        Open Profile
                    </Link>
                </Button>
            </Flex>
    );
}