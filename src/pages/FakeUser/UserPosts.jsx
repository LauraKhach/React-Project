import { Text, Box } from '@chakra-ui/react';
import PostModal from './PostModal';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import userService from "../../services/userService";

export default function UserPosts() {
    const [ post, setPost ] = useState([]);
    const { id } = useParams();

    const getUser = async() => {
        const posts = await userService.getUserPosts();
        const filteredPosts = posts.data.filter(post => post?.userId === +id);
        setPost(filteredPosts);
    }
    
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {
                post?.map((post) => (
                    <Box key={post?.id} m="50px">
                        <Text>{post?.body}</Text>
                        <Text>{post?.title}</Text>
                        <PostModal />
                    </Box>
                ))
            }
        
        </>   
    );
}