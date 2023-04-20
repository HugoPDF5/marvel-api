import { Button, HStack } from '@chakra-ui/react';

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
    <HStack spacing={4} mt={8}>
      <Button onClick={() => onPageChange(1)} isDisabled={isFirstPage} variant="outline">Primeira</Button>
      <Button onClick={() => onPageChange(previousPage)} isDisabled={isFirstPage} variant="outline">Anterior</Button>
      {visiblePages.map((page) => (
        <Button key={page} onClick={() => onPageChange(page)} variant={page === currentPage ? "solid" : "outline"}>{page}</Button>
      ))}
      <Button onClick={() => onPageChange(nextPage)} isDisabled={isLastPage} variant="outline">Próxima</Button>
      <Button onClick={() => onPageChange(totalPages)} isDisabled={isLastPage} variant="outline">Última</Button>
    </HStack>
  );
};

export default Pagination;