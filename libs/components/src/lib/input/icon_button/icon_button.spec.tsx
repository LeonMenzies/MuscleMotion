import { render } from '@testing-library/react';

import IconButton from './icon_button';

describe('IconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButton />);
    expect(baseElement).toBeTruthy();
  });
});
