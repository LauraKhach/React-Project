import { Text, Button } from '@chakra-ui/react';

export default function CustomButton({children}) {
    return (
        <>
            <Text>This is custom button example</Text>
            <Button>{children}</Button>
            <Text>The custom button component end</Text>
        </>
    );
}