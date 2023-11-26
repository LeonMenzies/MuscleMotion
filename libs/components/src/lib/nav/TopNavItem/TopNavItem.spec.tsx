import { render } from '@testing-library/react';

import TopNavItem from './TopNavItem';

describe('TopNavItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopNavItem />);
    expect(baseElement).toBeTruthy();
  });
});
