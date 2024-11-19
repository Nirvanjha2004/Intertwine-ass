import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, Divider, IconButton, TextField } from '@mui/material';
import { RemoveShoppingCart, Add, Remove } from '@mui/icons-material';

interface CartItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  quantity: number;
  brand: string;
  category: string;
}

export default function Cart() {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [search, setSearch] = React.useState('');

  // Load cart items from localStorage
  React.useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Update localStorage whenever items change
  const updateLocalStorage = (newItems: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    setItems(newItems);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    updateLocalStorage(newItems);
  };

  const handleIncreaseQuantity = (id: number) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(newItems);
  };

  const handleDecreaseQuantity = (id: number) => {
    const newItems = items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateLocalStorage(newItems);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    setItems([]);
  };

  const renderQualityStars = (rating: number) => {
    const stars = Math.round(rating);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <TextField
          label="Search Items"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
        />
      </Box>

      {items.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: 'text.secondary'
        }}>
          <Typography variant="h6">Your cart is empty</Typography>
          <Typography variant="body2">Add some products to your cart</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {items.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 3
                  },
                  transition: 'box-shadow 0.2s'
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start' 
                  }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {item.brand} • {item.category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gold', mb: 2 }}>
                        {renderQualityStars(item.rating)}
                      </Typography>
                    </Box>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'error.light',
                          color: 'error.main'
                        }
                      }}
                    >
                      <RemoveShoppingCart />
                    </IconButton>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    bgcolor: 'grey.50',
                    p: 1,
                    borderRadius: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => handleDecreaseQuantity(item.id)} 
                        disabled={item.quantity === 1}
                        size="small"
                      >
                        <Remove />
                      </IconButton>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mx: 2,
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => handleIncreaseQuantity(item.id)}
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Total</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              ${getTotalPrice()}
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleClearCart} 
              sx={{ 
                py: 1.5,
                px: 3,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Clear Cart
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                py: 1.5,
                px: 3,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
