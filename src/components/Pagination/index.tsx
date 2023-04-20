import { Button, Center, HStack } from '@chakra-ui/react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pageButtonsToShow = 5;

  const getVisiblePages = () => {
    const visiblePages = [];
    let startPage = Math.max(currentPage - Math.floor(pageButtonsToShow / 2), 1);
    let endPage = Math.min(startPage + pageButtonsToShow - 1, totalPages);

    if (endPage - startPage + 1 < pageButtonsToShow) {
      startPage = Math.max(endPage - pageButtonsToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Center>
      <HStack spacing={4} mt={8} color="yellow">
        <Button onClick={() => onPageChange(1)} isDisabled={isFirstPage} background={'gray'} variant="outline">First</Button>
        <Button onClick={() => onPageChange(previousPage)} isDisabled={isFirstPage} background={'gray'} variant="outline">Previous</Button>
        {visiblePages.map((page) => (
          <Button key={page} onClick={() => onPageChange(page)} background={'gray'} variant={page === currentPage ? "solid" : "outline"}>{page}</Button>
        ))}
        <Button onClick={() => onPageChange(nextPage)} background={'gray'} isDisabled={isLastPage} variant="outline">Next</Button>
        <Button onClick={() => onPageChange(totalPages)} background={'gray'} isDisabled={isLastPage} variant="outline">Last</Button>
      </HStack>
    </Center>
  );
};

export default Pagination;