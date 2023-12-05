import { act, renderHook } from '@testing-library/react';

import usePostProducts from './usePostProducts';

describe('usePostProducts', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePostProducts());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
