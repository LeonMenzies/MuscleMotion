import { render } from '@testing-library/react';

import TopNavItem from './top_nav_item';

describe('TopNavItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopNavItem />);
    expect(baseElement).toBeTruthy();
  });
});
