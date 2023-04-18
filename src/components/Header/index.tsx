import { Flex, Box, Image, Center } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box bg="red" py={2}>
            <Center maxW="1200px" mx="auto" alignItems="center">
                <Image src="./assets/marvel.svg" alt="Marvel Logo" w={120} />
            </Center>
        </Box>

    );
}

export default Header