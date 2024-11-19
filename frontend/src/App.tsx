import { Box, Container, Tab, Tabs, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import CustomPaginationActionsTable from './components/Page';
import Cart from './components/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function App() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 4, 
        mb: 6,
        textAlign: 'center'
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 2
          }}
        >
          E-Commerce Store
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Browse our collection of premium products and add them to your cart
        </Typography>
      </Box>

      <Box sx={{ 
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 3,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: theme.palette.grey[50]
        }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            aria-label="shop tabs"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontSize: '1rem',
                textTransform: 'none',
                fontWeight: 500,
              }
            }}
          >
            <Tab 
              icon={<StorefrontIcon />} 
              iconPosition="start" 
              label="Products" 
            />
            <Tab 
              icon={<ShoppingCartIcon />} 
              iconPosition="start" 
              label="Cart" 
            />
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {currentTab === 0 && <CustomPaginationActionsTable />}
          {currentTab === 1 && <Cart />}
        </Box>
      </Box>
    </Container>
  );
}
