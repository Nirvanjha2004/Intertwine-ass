import * as React from 'react';
import { Box, Button, Card, CardContent, Typography, Divider, IconButton, TextField, InputAdornment } from '@mui/material';
import { RemoveShoppingCart, Add, Remove } from '@mui/icons-material';

const cartItems = [
  { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, quantity: 2, price: 5.5 },
  { id: 2, name: 'Donut', calories: 452, fat: 25.0, quantity: 1, price: 2.0 },
  { id: 3, name: 'Eclair', calories: 262, fat: 16.0, quantity: 3, price: 3.5 },
  // Add more items as needed
];

export default function Cart() {
  const [items, setItems] = React.useState(cartItems);
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id: number) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, boxShadow: 4, borderRadius: 2, padding: 2 }}>
      {/* Search Input */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>Shopping Cart</Typography>
        <TextField
          label="Search Item"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '40%' }}
        />
      </Box>

      {/* Cart Items */}
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <Card key={item.id} sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                  <RemoveShoppingCart />
                </IconButton>
              </Box>
              <Typography variant="body2">Calories: {item.calories}</Typography>
              <Typography variant="body2">Fat: {item.fat} g</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                {/* Quantity Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>
                    <Remove />
                  </IconButton>
                  <Typography variant="body2">{item.quantity}</Typography>
                  <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                    <Add />
                  </IconButton>
                </Box>
                <Typography variant="body2">Price: ${item.price}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Total Price */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
        <Typography variant="h6">${getTotalPrice()}</Typography>
      </Box>

      {/* Clear Cart Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" color="error" onClick={handleClearCart} sx={{ padding: '10px 20px' }}>
          Clear Cart
        </Button>
      </Box>

      {/* Checkout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
}
