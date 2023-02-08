import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { useUser } from '../contexts/UserContext';
import FollowersModal from './Followers_Modal';
import FollowingsModal from './Followings_Modal';

function UserProfile() {
  const { currentUser } = useUser();
  
  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="dodgerblue"
    >
      <Flex fontFamily="initial">
        <Box mr="50px">
          <Image
            src={currentUser?.image}
            w="500px"
            h="500px"
            objectFit="cover"
            borderRadius="50%"
          ></Image>
          <Flex
            justifyContent="space-around"
            mt="50px"
          >
            <FollowingsModal currentUser={currentUser} />
            <FollowersModal currentUser={currentUser} />           
          </Flex>
        </Box>
        <Box>
          <Text
            mb="30px"
            fontSize="8xl"
            fontWeight="bold"
            color="yellow.400"
          >
            {currentUser?.first_name} {currentUser?.last_name}
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
              {currentUser?.email}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default UserProfile;