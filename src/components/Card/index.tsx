import { Box, Button, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useComics } from '../../services/comics';

const Card = () => {
    const comicsService = useComics()
    const [comics, setComics] = useState([])

    useEffect(() => {
        async function getComics() {
            const result = await comicsService.getAllComics()
            setComics(result)
        }
        getComics()
    }, [])
    console.log(comics)
    return (
        <Box maxW="1200px" mx="auto" py={6}>
            <Heading as="h2" size="lg" mb={6} mt={6}>
                Lista de Quadrinhos
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {comics.map((comic, index) => (
                    <GridItem key={index} bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
                        <Image src={comic.thumbnail.path+'/detail.'+comic.thumbnail.extension} alt={comic.title} w="full" h={300} objectFit="cover" />
                        <Box p={4}>
                            <Heading as="h3" size="md" mb={2} isTruncated>{comic.title}</Heading>
                            <Box display="flex" justifyContent="flex-end">
                                <Button color="white" variant='solid' background="red" size="sm">Detalhes</Button>
                            </Box>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}

export default Card