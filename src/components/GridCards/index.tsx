import { Box, Button, Grid, GridItem, Heading, Image, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack, Center, useToast, Flex, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useComics } from '../../services/comics';
import { CartContext } from '../../contexts/cart';
import { comicProps } from '../../types/comics';
import Pagination from '../Pagination';

const GridCards = () => {
    const comicsService = useComics()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { addToCart } = useContext(CartContext);

    const [comics, setComics] = useState<comicProps[]>([])
    const [comicSelected, setComicSelected] = useState<comicProps>({
        creators: {
            items: [
                {
                    name: ''
                }
            ]
        },
        description: '',
        id: 0,
        prices: [{
            price: 0,
            type: ''
        }],
        thumbnail: {
            extension: '',
            path: ''
        },
        title: ''
    })
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchComics() {
            setIsLoading(true);
            const data = await comicsService.getAllComics(currentPage * 20);
            setComics(data.results);
            setTotalPages(data.total)
            setIsLoading(false);
        }
        fetchComics();
    }, [currentPage]);

    const handleAddToCart = (comic: comicProps) => {
        addToCart(comic);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Box maxW="1200px" mx="auto" py={6}>
            <Heading color='white' as="h2" size="lg" mb={6} mt={6}>
            Comics List
            </Heading>
            {isLoading ? (
                <Center>
                    <Spinner
                        thickness='4px'
                        speed='0.2s'
                        emptyColor='yellow'
                        color='white'
                        size='xl'
                    />
                </Center>
            ) : (
                <>
                    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                        {comics.map((comic: comicProps, index: number) => (
                            <GridItem onClick={() => { setComicSelected(comic) }} key={index} bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
                                <Image src={comic.thumbnail.path + '/detail.' + comic.thumbnail.extension} alt={comic.title} w="full" h={300} objectFit="cover" />
                                <Box p={4}>
                                    <Heading as="h3" size="md" mb={2} isTruncated>{comic.title}</Heading>
                                    <Heading as="h4" size="sm" mb={2}>{comic.prices.map(item => item.price)}$</Heading>
                                    <Box display="flex" justifyContent={'flex-end'} gap={2} mt={8}>
                                        <Button onClick={onOpen} color="white" variant='solid' background="gray" size="sm" _hover={{ color: 'black', background: "white" }}>Details</Button>
                                        <Button onClick={() => {
                                            handleAddToCart(comic)
                                            toast({
                                                title: 'Product added to cart.',
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                            })
                                        }}
                                            color="white" variant='solid' background="red" size="sm" _hover={{ color: 'red', background: "white" }}>Add to Cart</Button>
                                    </Box>
                                </Box>
                            </GridItem >
                        ))}
                    </Grid >
                </>
            )}
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />

            <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comic Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justifyContent={'space-evenly'}>
                            <Image mb={8} mr={6} src={comicSelected.thumbnail.path + '/detail.' + comicSelected.thumbnail.extension} alt={comicSelected.title} h={400} />
                            <VStack gap={4}>
                                <Text>Name: {comicSelected.title}</Text>
                                <Text>Description: {comicSelected.description ? comicSelected.description : 'No informations'}</Text>
                                <Text>Creator(s): {comicSelected.creators.items.length > 1 ? comicSelected.creators.items.map(item => item.name).join(', ') : 'No informations'}</Text>
                                <Text>Price: {comicSelected.prices.map(item => item.price)}$</Text>
                            </VStack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default GridCards