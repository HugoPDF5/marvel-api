import { Box, Button, Flex, Heading, IconButton, Image, Text, useToast } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { comicProps } from "../../types/comics";
import { CartItemProps, CartProps } from "../../types/cart";


const CartItem = ({
  image,
  name,
  price,
  quantity,
  onRemove,
}: CartItemProps) => {
  return (
    <Flex alignItems="center" mb={4}>
      <Box mr={4}>
        <Image src={image} alt={name} w={16} h={16} />
      </Box>
      <Box flexGrow={1}>
        <Text fontSize={["sm", "md"]} fontWeight="bold">
          {name}
        </Text>
        <Text fontSize={["sm", "md"]}>
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
  const toast = useToast();

  return (
    <Box maxW="md" w={["full", "full", "auto"]} boxShadow="md" rounded="md" overflow="hidden">
      <Flex align="center" justify="space-between" p={4} borderBottomWidth={1}>
        <Heading fontSize={["lg", "lg", "2xl"]}>Item</Heading>
        <Button
          variant="ghost"
          onClick={onClear}
          border="1px solid black"
          _hover={{ background: "red", color: "white", borderColor: "red" }}
        >
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label="Remove item"
            icon={<BiTrash size={"20px"} />}
            size={"lg"}
          />
        </Button>
      </Flex>
      <Box p={4}>
        {items.map((item: comicProps) => (
          <CartItem
            key={item.id}
            image={item.thumbnail.path + "/detail." + item.thumbnail.extension}
            name={item.title}
            price={item.prices.map((item) => item.price)}
            quantity={1}
            onRemove={() => {
              onRemoveItem(item.id);
              toast({
                title: "Product removed from cart.",
                status: "warning",
                duration: 2000,
                isClosable: true,
              });
            }}
          />
        ))}
        <Flex justify="space-between" mt={4}>
          <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
            Total:
          </Text>
          <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
            ${totalValue.toFixed(2)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;