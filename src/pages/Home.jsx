import { Link as ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

function Home() {
   return (
    <>
        <Link as={ReactLink} to="/sign-up">Sign Up</Link>
        <Link as={ReactLink} to="/sign-in">Sign In</Link>
    </>
   ); 
}

export default Home;