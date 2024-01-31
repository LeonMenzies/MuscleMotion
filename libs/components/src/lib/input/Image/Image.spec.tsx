import { render } from '@testing-library/react';

import Image from './image';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Image />);
    expect(baseElement).toBeTruthy();
  });
});
