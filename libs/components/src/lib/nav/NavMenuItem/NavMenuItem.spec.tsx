import { render } from '@testing-library/react';

import { NavMenuItem } from './NavMenuItem';

describe('NavMenuItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavMenuItem />);
    expect(baseElement).toBeTruthy();
  });
});
