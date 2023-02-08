import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import Router from './router/index.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
          <UserProvider>
            <Router />
          </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;