import { 
    Flex, useDisclosure, Button, 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';
import { getUsers } from '../helpers';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';


export default function FollowersModal() {
    const { currentUser } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userFollowers = JSON.parse(currentUser?.followers || null) || [];
    const [followers, setFollowers] = useState(userFollowers);

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

    const updateUser = (newFollowers) => {
        const newUSer = {
            ...currentUser,
            followers: JSON.stringify(newFollowers),
        }
        const userJSON = JSON.stringify(newUSer);
        localStorage.setItem("user", userJSON);
        
        updateUsers(newUSer);
    }
    
    const onDelete = (id) => {
        const newFollowers = userFollowers.filter((user) => user?.id !== id);
        
        setFollowers(newFollowers);
        updateUser(newFollowers);
    }

    return (
        <>
            <Button onClick={onOpen} fontSize="20px">Followers {followers.length}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="100rem">
                    <ModalHeader>Followers</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ol>
                            {
                                followers?.map((user) => (
                                    <Flex key={user?.id} justifyContent="space-between" m="30px">
                                        <li>{user?.first_name}</li>
                                        <Button onClick={() => onDelete(user?.id)} ml="100px" p="20px 30px" boxSizing="border-box">Delete</Button>
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