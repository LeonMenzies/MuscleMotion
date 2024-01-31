import { render } from '@testing-library/react';

import NavMenu from './nav_menu';

describe('NavMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavMenu />);
    expect(baseElement).toBeTruthy();
  });
});
