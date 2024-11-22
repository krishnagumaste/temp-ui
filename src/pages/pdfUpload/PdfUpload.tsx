/*This is the pdf upload page , add the things for pdf upload and uploading
status bar here
1. Pdf upload button funtioanlity should be there in this component
2. Drag and drop functionlity should also be there
3. Upload progess should also be there
*/
import React, { useState } from "react";
import FileList  from "./FileList"

interface File {
  name: string;
  size: string;
}

const PdfUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleFiles = (filesList: FileList) => {
    const selectedFiles = Array.from(filesList);
    const nonPdfFiles = selectedFiles.filter(
      (file) => file.type !== "application/pdf"
    );

    if (nonPdfFiles.length > 0) {
      setError("Only PDF files are allowed. Please upload valid files.");
    } else {
      const oversizedFile = selectedFiles.find((file) => file.size > 400 * 1024 * 1024);
      if (oversizedFile) {
        setError("File size should be less than 400 MB.");
      } else {
        setError("");
        const validFiles = selectedFiles.map((file) => ({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        }));
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      }
    }
  };

  const handleUpload = (index: number) => {
    alert(`Uploading: ${files[index].name}`);
  };

  const handleCancel = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className="w-[90%] max-w-[600px] mx-auto font-sans">
      {/* Upload Area */}
      <label
        className="text-center mb-2 p-5 border-2 border-dashed border-gray-300 rounded-lg block cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          hidden
        />
        <div className="text-2xl text-gray-600 mb-2">+</div>
        <p>Upload new file</p>
      </label>

      <p className="text-center mt-2 text-gray-500 text-sm">
        Click, drag, or drop files here to upload
      </p>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* File List */}
      <FileList
        files={files}
        onUpload={handleUpload}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default PdfUpload;
