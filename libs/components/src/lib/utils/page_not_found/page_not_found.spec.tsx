import { render } from '@testing-library/react';

import PageNotFound from './page_not_found';

describe('PageNotFound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageNotFound />);
    expect(baseElement).toBeTruthy();
  });
});
