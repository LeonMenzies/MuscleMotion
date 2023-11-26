import { render } from '@testing-library/react';

import TopNav from './TopNav';

describe('TopNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopNav />);
    expect(baseElement).toBeTruthy();
  });
});
