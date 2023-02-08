import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import userService from "../../services/userService";

export default function PostComments({comment}) {
    const [ comments, setComments ] = useState([]);
    const { id } = useParams();

    const getPostComments = async() => {
        const comments = await userService.getPostsComments(id);
        const filteredComments = comments.data.filter(comment => comment?.postId === +id);
        const filteredComment = filteredComments.find(comment => comment?.name);
        setComments(filteredComment);
    }
    
    useEffect(() => {
        getPostComments();
    }, []);

    return (
        <>
            {
                comment ? comments?.name : ""
            }
        </>
    )
}