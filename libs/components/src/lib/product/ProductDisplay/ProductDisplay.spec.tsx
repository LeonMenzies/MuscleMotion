import { render } from '@testing-library/react';

import ProductDisplay from './ProductDisplay';

describe('ProductDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductDisplay />);
    expect(baseElement).toBeTruthy();
  });
});
