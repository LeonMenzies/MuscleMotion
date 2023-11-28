import { act, renderHook } from '@testing-library/react';

import useFetchProducts from './useFetchProducts';

describe('useFetchProducts', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
