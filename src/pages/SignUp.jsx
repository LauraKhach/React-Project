import { Box, Flex, Text, Input, Button, Link } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid";
const emailPAttern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp() {
  const profileImage = useRef("");
  const [ users, setUsers] = useState([]);

  const updateLocalStorage = (values) => {
    const userJSON = JSON.stringify(values);
    localStorage.setItem("users", userJSON);
  }
  
  useEffect(() => {
    const users = localStorage.getItem("users");
    const parsedUsers = JSON.parse(users);
    setUsers(parsedUsers || []);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = (values) => {
    setUsers((prev) => {
      const usersData = [
        ...prev, 
        { 
          id: uuid(), 
          ...values, 
          image: '',
          followers: JSON.stringify([]),
          followings: JSON.stringify([]),
        }
      ];

      updateLocalStorage(usersData);
      navigate("/sign-in");

      return usersData;
    })
  }

  function readFile(file) {
    if (!file) return;
      
    const FR = new FileReader();
      
    FR.addEventListener("load", function(evt) {
      console.log(evt.target.result);
      profileImage.current = evt.target.result;
    }); 
      
    FR.readAsDataURL(file);
  }

  const onImgUpload = async (e) => {
    // const image = URL.createObjectURL(e.target.files[0]);
    readFile(e.target.files[0])
    // profileImage.current = image;
  }


  return (
      <Flex
        w="100%"
        height="100vh"
        backgroundColor="dodgerblue"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          w="max-content"
          h="max-content"
          p="50px"
          backgroundColor="white"
          borderRadius="10px"
          flexDirection="column"
          alignItems="center"
        >
          <Text 
            textAlign="center"
            fontSize="5xl"
            fontWeight="bold"
          >
            Sign Up
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Text 
              mt="30px"
              mb="10px"
              fontWeight="bold"
              fontSize="xl"
              >
                First Name
              </Text>
              <Input 
                placeholder='First Name' 
                w="800px"
                h="50px"
                {...register("first_name", {
                  required: 'First Name is required', 
                  minLength: { value: 3, message: 'Min 3' },
                })}
              />
              { errors?.first_name && 
                <Text
                  color="red"
                  fontSize="13px"
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
                fontSize="xl"
              >
                Last Name
              </Text>
              <Input 
                placeholder='Last Name' 
                w="800px"
                h="50px"
                {...register("last_name", {
                  required: 'Last Name is required', 
                  minLength: { value: 3, message: 'Min 3' },
                })}
              />
              { errors?.last_name && 
                <Text
                  color="red"
                  fontSize="13px"
                >
                  { errors?.last_name?.message }
                </Text>
              }
            </Box>
            <Box>
              <Text
                mt="30px"
                mb="10px"
                fontWeight="bold"
                fontSize="xl"
              >
                Email
              </Text>
              <Input
                placeholder='Email' 
                w="800px"
                h="50px"
                {...register("email", {
                  required: 'Email is required',
                  pattern: {
                    value: emailPAttern, 
                    message: "Wrong email format",
                  }
                })}
              />
              {errors?.email && 
                <Text
                  color="red"
                  fontSize="13px"
                >
                  { errors?.email?.message }
                </Text>
              }
            </Box>
            <Box>
              <Text
                mt="30px"
                mb="10px"
                fontWeight="bold"
                fontSize="xl"
              >
                Password
              </Text>
              <Input 
                type="password"
                placeholder='Password' 
                w="800px"
                h="50px"
                {...register("password", {
                  required: 'Password is required', 
                  minLength: { value: 6, message: 'Min 6' },
                })}
              />
              {errors?.password && 
                <Text
                  color="red"
                  fontSize="13px"
                >
                  { errors?.password?.message }
                </Text>
              }
            </Box>
            <Box>
              <Text
                mt="30px"
                mb="10px"
                fontWeight="bold"
                fontSize="xl"
              >
                Avatar
              </Text>
              <Input 
                onChange={onImgUpload}
                type="file"
                placeholder='Avatar' 
                w="800px"
                h="50px"
              />
            </Box>
            <Button
              type='submit'
              w="810px"
              h="50px"
              mt="20px"
              mb="20px"
              border="none"
              borderRadius="10px"
              backgroundColor="dodgerblue"
              color="white"
              fontWeight="bold"
              fontSize="20px"
              cursor="pointer"
              _hover={{
                backgroundColor:"red"
              }}
            >
              Sign Up
            </Button>
          </form>
          <Link as={ReactLink} to="/sign-in">Have an account?</Link>
        </Flex>
      </Flex>
  );
}

export default SignUp;