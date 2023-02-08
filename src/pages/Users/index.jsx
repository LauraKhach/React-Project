import { Flex } from '@chakra-ui/react';
import { getUsers } from "../../helpers";
import { useUser } from '../../contexts/UserContext';
import User from './User';

const USers = getUsers();

export default function Users() {
    const { currentUser } = useUser();
    const users = USers.filter((user) => user?.id !== currentUser?.id);

    return (
        <Flex
            w="100%"
            h="max-content"
            m="30px"
            flexWrap="wrap"
        >
            {
                users.map((user) => (
                    <User 
                        key={user.id}
                        id={user?.id}
                        fullName={`${user.first_name} ${user.last_name}`}
                        avatar={user.image}
                    />
                ))
            }
        </Flex>
    );
}