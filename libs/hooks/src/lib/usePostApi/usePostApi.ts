import { useState, useCallback } from 'react';
import axios from 'axios';
import { ApiResponse } from '@musclemotion/types';
import { URL_BASE } from '@musclemotion/constants';

export const usePostApi = <D, T>(
  endpoint: string
): [ApiResponse<T>, boolean, (data: D) => Promise<void>] => {
  const [results, setResults] = useState<ApiResponse<T>>({
    success: false,
    errorMessage: '',
  });
  const [loading, setLoading] = useState(false);

  const postProducts = useCallback(
    async (data: D) => {
      try {
        setLoading(true);
        const response = await axios.request<ApiResponse<T>>({
          data: data,
          method: 'POST',
          url: URL_BASE + endpoint,
          withCredentials: true,
        });

        if (!response.data.success) {
          throw new Error(response.data.errorMessage || 'Failed to post');
        }

        setResults(response.data);
      } catch (error) {
        setResults({
          success: false,
          errorMessage: 'Failed to fetch products',
        });
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  return [results, loading, postProducts];
};

export default usePostApi;
