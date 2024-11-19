import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
          setLoading(false);
          return;
        }

        const response = await axios.get('https://dummyjson.com/products?limit=100');
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        localStorage.setItem('products', JSON.stringify(fetchedProducts));
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
} 