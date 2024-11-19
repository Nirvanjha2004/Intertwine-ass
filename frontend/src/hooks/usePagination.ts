import { useState } from 'react';

export function usePagination(initialRowsPerPage: number = 5) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPaginatedItems = <T>(items: T[]) => {
    if (rowsPerPage > 0) {
      return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    return items;
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    getPaginatedItems
  };
} 