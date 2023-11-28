import { useState, useEffect, useCallback } from 'react';
import { Product } from '@musclemotion/types';

export interface UseFetchProducts {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useFetchProducts = (): UseFetchProducts => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch('https://api.example.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      setError('error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(); // You can include dependencies if needed
  }, [fetchProducts]);

  return { products, loading, error, fetchProducts };
};

export default useFetchProducts;
