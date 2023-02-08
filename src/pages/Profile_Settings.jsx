import { Flex, Box, Text, Input, Button, useToast } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { getUsers } from '../helpers';
import { useUser } from '../contexts/UserContext';

export default function Profile_Settings() {
  const { currentUser } = useUser();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
    }
  });

  const onSubmit = (values) => {
    const newUser = {
        ...currentUser, 
        ...values
    };
    
    updateCurrentUser(newUser);
    updateUsers(newUser);
    toast ({
        title: "Successfully saved",
        status: "success",
    })
  }

  const updateCurrentUser = (newUser) => {
    const userJSON = JSON.stringify(newUser);
    localStorage.setItem("user", userJSON);
  }

  const updateUsers = (newUser) => {
    const users = getUsers();
    const filterUsers = users.filter(user => user?.id !== newUser?.id);
    const newUsers = [
        ...filterUsers,
        newUser
    ];
    const usersJSON = JSON.stringify(newUsers);
    localStorage.setItem("users", usersJSON);
  }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                w="100%"
                h="100vh"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg="dodgerblue"
            >
                <Box>
                    <Text 
                        mt="30px"
                        mb="10px"
                        fontWeight="bold"
                        fontSize="3xl"
                        color="white"
                    >
                        First Name
                    </Text>
                    <Input 
                        placeholder='First Name' 
                        w="800px"
                        h="60px"
                        bg="HighlightText"
                        fontSize="xl"
                        fontWeight="500"
                        {...register("first_name", {required: 'First Name is required'})}
                    />
                    { errors?.first_name && 
                        <Text
                        pt="5px"
                        color="red"
                        fontSize="15px"
                        >
                        { errors?.first_name?.message }
                        </Text>
                    }
                </Box>
                <Box>
                    <Text
                        mt="30px"
                        mb="10px"
                        fontWeight="bold"
                        fontSize="3xl"
                        color="white"
                    >
                        Last Name
                    </Text>
                    <Input 
                        placeholder='Last Name' 
                        w="800px"
                        h="60px"
                        bg="HighlightText"
                        fontSize="xl"
                        fontWeight="500"
                        {...register("last_name", {required: 'Last Name is required'})}
                    />
                    { errors?.last_name && 
                        <Text
                        pt="5px"
                        color="red"
                        fontSize="15px"
                        >
                        { errors?.last_name?.message }
                        </Text>
                    }
                </Box>
                <Button
                    type='submit'
                    w="800px"
                    h="60px"
                    mt="50px"
                    mb="20px"
                    border="none"
                    borderRadius="10px"
                    backgroundColor="white"
                    color="dodgerblue"
                    fontWeight="bold"
                    fontSize="20px"
                    cursor="pointer"
                    _hover={{
                        backgroundColor:"dodgerblue",
                        color: "white",
                        border:"3px solid white",
                    }}
                >
                    Save
                </Button>
            </Flex>
        </form>
    );
}
