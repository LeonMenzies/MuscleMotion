import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useFetchProducts from './fetch-products';

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
