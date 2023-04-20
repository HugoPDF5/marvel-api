import { Box, Button, Flex, Heading, IconButton, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { comicProps } from "../../types/comics";
import { CartItemProps, CartProps } from "../../types/cart";


const CartItem = ({ image, name, price, quantity, onRemove }: CartItemProps) => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Flex alignItems="center" mb={4}>
      <Box mr={4}>
        <Image src={image} alt={name} w={16} h={16} />
      </Box>
      <Box flexGrow={1}>
        <Text fontSize="md" fontWeight="bold" color={textColor}>
          {name}
        </Text>
        <Text fontSize="md" color={textColor}>
          ${price} x {quantity}
        </Text>
      </Box>
      <Box>
        <IconButton
          variant="ghost"
          colorScheme="red"
          aria-label="Remove item"
          icon={<AiOutlineClose />}
          onClick={onRemove}
        />
      </Box>
    </Flex>
  );
};

const Cart = ({ items, totalValue, onClear, onRemoveItem }: CartProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const toast = useToast()

  return (
    <Box
      maxW="md"
      w="full"
      bg={bgColor}
      boxShadow="md"
      rounded="md"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" p={4} borderBottomWidth={1}>
        <Heading fontSize="lg">Item</Heading>
        <Button variant="ghost" onClick={onClear} border='1px solid black' _hover={{background: 'red', color: 'white', borderColor: 'red'}}>
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label="Remove item"
            icon={ <BiTrash size={'20px'} />}
            size={'lg'}
          />
        </Button>
      </Flex>
      <Box p={4}>
        {items.map((item: comicProps) => (
          <CartItem
            key={item.id}
            image={item.thumbnail.path + '/detail.' + item.thumbnail.extension}
            name={item.title}
            price={item.prices.map(item => item.price)}
            quantity={1}
            onRemove={() => {
              onRemoveItem(item.id)
              toast({
                title: 'Product removed from cart.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              })
            }}
          />
        ))}
        <Flex justify="space-between" mt={4}>
          <Text fontSize="xl" fontWeight="bold" color={useColorModeValue("gray.700", "gray.300")}>
            Total:
          </Text>
          <Text fontSize="xl" fontWeight="bold" color={useColorModeValue("gray.700", "gray.300")}>
            ${totalValue}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;