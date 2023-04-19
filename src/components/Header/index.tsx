import { Flex, Box, Image, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Spacer, useDisclosure, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from '../Cart';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart';
import MapGoogle from '../MapGoogle';

const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const { cart, removeFromCart, clearCart, total } = useContext(CartContext);


    const handleMapClick = (event) => {
        const iframe = event.target;
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const map = innerDoc.querySelector("div[aria-label='Google Maps']");
        map.addEventListener("click", () => {
            const placeName = innerDoc.querySelector("h1[data-section-id='title']").innerText;
            const address = innerDoc.querySelector("span[data-section-id='ad']").innerText;
            console.log(placeName, address);
            // atualize o formulário com as informações obtidas
        });
    };

    return (
        <Box bg="red" py={2}>
            <Flex maxW="1200px" mx="auto" align="center">
                <Image src="./assets/marvel.svg" alt="Marvel Logo" w={120} />
                <Spacer />

                <IconButton
                    variant="ghost"
                    aria-label="Menu"
                    icon={<AiOutlineShoppingCart size={24} color='white' />}
                    onClick={onOpen}
                    _hover={{ backgroundColor: 'transparent' }}
                />
                <Drawer size={'md'} placement="right" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Carrinho de compras</DrawerHeader>
                        <DrawerBody>
                            <Cart items={cart} onClear={clearCart} onRemoveItem={removeFromCart} total={total}></Cart>
                            <Center mt={8}>
                                <Button onClick={onOpenModal} color="white" variant='solid' background="red" size="lg" _hover={{ color: 'red', background: "white" }}>Comprar</Button>
                            </Center>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>

            <Modal size={'4xl'} isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comprar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MapGoogle isOpen={isOpenModal} onClose={onCloseModal} />
                        <Center mt={8}>
                            <Button onClick={onOpenModal} color="white" variant='solid' background="red" size="lg" _hover={{ color: 'red', background: "white" }}>Enviar para esse endereço</Button>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );

}

export default Header