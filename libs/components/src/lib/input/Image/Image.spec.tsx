import { render } from '@testing-library/react';

import Image from './Image';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Image />);
    expect(baseElement).toBeTruthy();
  });
});
