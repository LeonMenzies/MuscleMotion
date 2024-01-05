import React, { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';

export interface ImageProps {
  onImageChange: (file: Blob) => void;
  buttonText?: string;
  buttonStyles?: React.CSSProperties;
}

export function Image(props: ImageProps) {
  const { onImageChange, buttonText = 'Upload Image', buttonStyles } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBlob = new File([selectedFile], selectedFile.name, {
          type: selectedFile.type,
        });

        onImageChange(imageBlob);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleButtonClick} style={buttonStyles}>
        {buttonText}
      </StyledButton>
      <StyledHiddenInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      {imagePreview && (
        <StyledImagePreview src={imagePreview} alt="Selected Image" />
      )}
    </StyledContainer>
  );
}
export default Image;

const StyledContainer = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  /* Custom button styles */
  /* Add your desired button styles */
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* Other styles as needed */
`;

const StyledHiddenInput = styled.input`
  display: none;
`;

const StyledImagePreview = styled.img`
  /* Adjust the image preview styles */
  width: 200px;
  height: auto;
  margin-top: 10px;
`;
