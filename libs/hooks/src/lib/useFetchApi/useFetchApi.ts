import { useState, useCallback } from 'react';
import axios from 'axios';
import { ApiResponse } from '@musclemotion/types';
import { URL_BASE } from '@musclemotion/constants';

export const useFetchApi = <T>(
  endpoint: string
): [ApiResponse<T>, boolean, () => Promise<void>] => {
  const [results, setResults] = useState<ApiResponse<T>>({
    success: false,
    errorMessage: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.request<ApiResponse<T>>({
        method: 'GET',
        url: URL_BASE + endpoint,
      });

      if (!response.data.success) {
        throw new Error(response.data.errorMessage || 'Failed to fetch');
      }

      setResults(response.data);
    } catch (error: unknown) {
      setResults({
        success: false,
        errorMessage: 'Failed to fetch products',
      });
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return [results, loading, fetchProducts];
};

export default useFetchApi;
