import { render } from '@testing-library/react';

import DropDown from './DropDown';

describe('DropDown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropDown />);
    expect(baseElement).toBeTruthy();
  });
});
