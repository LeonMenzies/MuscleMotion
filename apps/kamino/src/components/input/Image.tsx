import React, { ChangeEvent, useState } from "react";

interface FileUploadProps {
  onFilesSelected: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
      if (fileList.length === 5) {
        onFilesSelected(files);
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      {selectedFiles.length === 5 && <p>Selected 5 images</p>}
    </div>
  );
};

export default FileUpload;
