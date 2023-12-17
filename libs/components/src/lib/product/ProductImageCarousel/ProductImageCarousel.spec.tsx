import { render } from '@testing-library/react';

import ProductImageCarousel from './ProductImageCarousel';

describe('ProductImageCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductImageCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
