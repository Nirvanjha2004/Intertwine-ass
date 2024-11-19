import * as React from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  TablePagination, 
  Button,
  Skeleton,
  useTheme,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  KeyboardArrowLeft, 
  KeyboardArrowRight,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  AddShoppingCart,
  Search as SearchIcon
} from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { usePagination } from '../hooks/usePagination';
import { useCart } from '../hooks/useCart';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const theme = useTheme();
  const { products, loading } = useProducts();
  const { searchQuery, setSearchQuery, searchResults } = useSearch(products, ['title', 'brand', 'category']);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, getPaginatedItems } = usePagination();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <Box>
        <Skeleton 
          variant="rectangular" 
          height={56} 
          sx={{ mb: 2, borderRadius: 1 }} 
        />
        <TableContainer>
          {[...Array(5)].map((_, index) => (
            <Skeleton 
              key={index}
              variant="rectangular"
              height={53}
              sx={{ mb: 1, borderRadius: 1 }}
            />
          ))}
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by product name, brand, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'background.paper',
              '&:hover': {
                '& > fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            },
          }}
        />
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Brand</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Price ($)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Rating</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedItems(searchResults).map((product) => (
              <TableRow 
                key={product.id}
                sx={{ 
                  '&:hover': { 
                    bgcolor: theme.palette.action.hover 
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">{product.brand}</TableCell>
                <TableCell align="right">
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                      py: 0.5,
                      px: 1.5,
                      borderRadius: 1,
                      display: 'inline-block'
                    }}
                  >
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ${product.price}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ color: 'gold', display: 'inline-flex', alignItems: 'center' }}>
                    {product.rating} ★
                  </Box>
                </TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => addToCart(product)}
                    startIcon={<AddShoppingCart />}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 1.5
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {searchResults.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No products found matching your search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.grey[50]
          }}
        />
      </TableContainer>
    </Box>
  );
}

