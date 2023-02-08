import { 
    Flex, useDisclosure, Button, 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';
import { useState } from 'react';
import { getUsers } from '../helpers';
import { useUser } from '../contexts/UserContext';

export default function FollowingsModal() {
    const { currentUser } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userFollowings = JSON.parse(currentUser?.followings || null) || [];
    const [followings, setFollowings] = useState(userFollowings);

    const updateUsers = (newUSer) => {
        const users = getUsers();
        const filteredUsers = users.filter(user => user?.id !== newUSer?.id);
        const newUsers = [
            ...filteredUsers,
            newUSer
        ];
        const usersJSON = JSON.stringify(newUsers);
        localStorage.setItem("users", usersJSON);
    }

    const updateUser = (newFollowings) => {
        const newUSer = {
            ...currentUser,
            followings: JSON.stringify(newFollowings),
        }
        const userJSON = JSON.stringify(newUSer);
        localStorage.setItem("user", userJSON);
        
        updateUsers(newUSer);
    }

    const unFollow = (id) => {
        const newFollowings = userFollowings.filter((user) => user?.id !== id);
        
        setFollowings(newFollowings);
        updateUser(newFollowings);
    }

    return (
        <>
            <Button onClick={onOpen} fontSize="20px">Followings {followings.length}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="100rem">
                    <ModalHeader>Followings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ol>
                            {
                                followings?.map((user) => (
                                    <Flex key={user?.id} justifyContent="space-between" m="30px">
                                        <li>{user?.first_name}</li>
                                        <Button onClick={() => unFollow(user?.id)} ml="100px" p="20px 30px" boxSizing="border-box">Unfollow</Button>
                                    </Flex>
                               ))
                            }
                        </ol>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}