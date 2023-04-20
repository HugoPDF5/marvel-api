import { Box, Button, Grid, GridItem, Heading, Image, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack, Center, Spinner, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useComics } from '../../services/comics';
import { CartContext } from '../../contexts/cart';
import { comicProps } from '../../types/comics';

const GridCards = () => {
    const comicsService = useComics()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (comic: comicProps) => {
        addToCart(comic);
    };

    useEffect(() => {
        async function getComics() {
            const result = await comicsService.getAllComics()
            setComics(result)
        }
        getComics()
    }, [])

    return (
        <Box maxW="1200px" mx="auto" py={6}>
            <Heading as="h2" size="lg" mb={6} mt={6}>
                Lista de Quadrinhos
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {comics.map((comic: comicProps, index: number) => (
                    <GridItem onClick={() => { setComicSelected(comic) }} key={index} _hover={{ cursor: 'pointer' }} bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
                        <Image src={comic.thumbnail.path + '/detail.' + comic.thumbnail.extension} alt={comic.title} w="full" h={300} objectFit="cover" />
                        <Box p={4}>
                            <Heading as="h3" size="md" mb={2} isTruncated>{comic.title}</Heading>
                            <Heading as="h4" size="sm" mb={2}>{comic.prices.map(item => item.price)}$</Heading>
                            <Box display="flex" justifyContent="space-between" mt={8}>
                                <Button onClick={onOpen} color="white" variant='solid' background="red" size="sm" _hover={{ color: 'red', background: "white" }}>Detalhes</Button>
                                <Button onClick={() => {
                                    handleAddToCart(comic)
                                    toast({
                                        title: 'Product added to cart.',
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                }}
                                    color="white" variant='solid' background="yellow" size="sm" _hover={{ color: 'red', background: "white" }}>Adicionar ao carrinho</Button>
                            </Box>
                        </Box>
                    </GridItem >
                ))}
            </Grid >
            <Center mt={12}>
                {/* <Button color="white" variant='solid' background="yellow" size="sm" _hover={{ color: 'red', background: "white" }}>Carregar mais</Button> */}
            </Center>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalhes do Quadrinho</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image mb={6} src={comicSelected.thumbnail.path + '/detail.' + comicSelected.thumbnail.extension} alt={comicSelected.title} w="full" h={600} />
                        <VStack alignItems='flex-start' gap={4}>
                            <Text>Name: {comicSelected.title}</Text>
                            <Text>Description: {comicSelected.description ? comicSelected.description : 'No informations'}</Text>
                            <Text>Print Price: {comicSelected.prices.map(item => item.price)}$</Text>
                            <Text>Creator(s): {comicSelected.creators.items.length > 1 ? comicSelected.creators.items.map(item => item.name).join(', ') : 'No informations'}</Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box >
    );
}

export default GridCards