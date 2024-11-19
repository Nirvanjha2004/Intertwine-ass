import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  quantity: number;
  brand: string;
  category: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const newItems = [...items];
    const existingItem = newItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newItems.push({
        ...product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    setItems(newItems);
  };

  const removeFromCart = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    setItems(newItems);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    setItems(newItems);
  };

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  };
} 