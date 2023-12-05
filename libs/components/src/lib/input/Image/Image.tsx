import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

export interface ImageProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  width?: string;
  height?: string;
}

export function Image(props: ImageProps) {
  const { onChange, width, height } = props;

  return (
    <StyledImage
      type="file"
      accept="image/*"
      onChange={onChange}
      width={width}
      height={height}
    />
  );
}

const StyledImage = styled.input<ImageProps>`
  /* Common styles for the image input */
  /* Set width and height if provided */
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  /* Other styles as needed */

  /* Hide the default file input appearance */
  appearance: none;
  border: none;
  /* Add any additional styling you need for the image input */
`;
