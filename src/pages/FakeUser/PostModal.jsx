import { 
    useDisclosure, Button, Text,
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import userService from "../../services/userService";
import PostComments from './PostComments';

export default function PostModal() {
    const { id } = useParams();
    const [ comment, setComment ] = useState(false);
    const [ post, setPost ] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initPost = async() => {
        const post = await userService.getPostId(id);
        setPost(post.data);
    }
    
    useEffect(() => {
        initPost();
    }, []);

    const showComments = () => {
        setComment(true);
    }

    return (
        <>
            <Button onClick={onOpen} fontSize="20px" mt="30px">View Post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{post?.body}</Text>
                        <Button onClick={showComments} m="30px 0">Show Comments</Button>
                        <br />
                        <PostComments comment={comment} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}