import { comicProps } from "./comics"

export interface CartItemProps {
    image: string,
    name: string,
    price: number[],
    quantity: number,
    onRemove: () => void
  }

export interface CartProps {
    totalValue: number,
    totalItems: number,
    items: comicProps[],
    onClear: () => void,
    onRemoveItem: (item: number) => void
  }