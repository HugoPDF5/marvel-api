import { Flex, Box, Image, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Spacer, useDisclosure, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from '../Cart';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart';
import MapGoogle from '../MapGoogle';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const { cart, removeFromCart, clearCart, totalValue, totalItems } = useContext(CartContext);

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
                {totalItems >= 0 && (
                    <Box
                        position="absolute"
                        top="8px"
                        right="340px"
                        bg="white"
                        borderRadius="50%"
                        color="black"
                        fontSize="small"
                        fontWeight="bold"
                        minWidth="20px"
                        textAlign="center"
                    >
                        {totalItems}
                    </Box>
                )}
                <Drawer size={'md'} placement="right" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Carrinho de compras</DrawerHeader>
                        <DrawerBody>
                            <Cart totalItems={totalItems} items={cart} onClear={clearCart} onRemoveItem={removeFromCart} totalValue={totalValue}></Cart>
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
                    <ModalHeader>Selecione seu endereço</ModalHeader>
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