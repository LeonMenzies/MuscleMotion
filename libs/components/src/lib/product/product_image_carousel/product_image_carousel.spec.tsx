import { render } from '@testing-library/react';

import ProductImageCarousel from './product_image_carousel';

describe('ProductImageCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductImageCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
