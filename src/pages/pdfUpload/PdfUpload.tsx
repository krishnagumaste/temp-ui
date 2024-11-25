import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

interface FileUpload {
  file: File;
  progress: number;
  status: string;
}

const PdfUpload: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      addFiles(selectedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const selectedFiles = Array.from(event.dataTransfer.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (selectedFiles: File[]) => {
    const pdfFiles = selectedFiles.filter(
      file => file.type === 'application/pdf'
    );

    const newFiles = pdfFiles.map(file => ({
      file,
      progress: 0,
      status: 'Pending',
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const uploadFile = async (index: number) => {
    const fileToUpload = files[index];
    const url = 'YOUR_BACKEND_ENDPOINT'; // Replace with your backend endpoint

    // Update the status to "Uploading"
    setFiles(prev =>
      prev.map((f, i) =>
        i === index ? { ...f, status: 'Uploading', progress: 0 } : f
      )
    );

    const formData = new FormData();
    formData.append('file', fileToUpload.file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setFiles(prev =>
              prev.map((f, i) => (i === index ? { ...f, progress } : f))
            );
          }
        },
      });

      if (response.status === 200) {
        setFiles(prev =>
          prev.map((f, i) => (i === index ? { ...f, status: 'Completed' } : f))
        );
      } else {
        setFiles(prev =>
          prev.map((f, i) => (i === index ? { ...f, status: 'Failed' } : f))
        );
      }
    } catch (error) {
      setFiles(prev =>
        prev.map((f, i) => (i === index ? { ...f, status: 'Error' } : f))
      );
      console.error('Error uploading file', error);
    }
  };

  const uploadAllFiles = () => {
    files.forEach((_, index) => {
      if (files[index].status === 'Pending') {
        uploadFile(index);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto p-4'>
      {/* Heading */}
      <h1 className='text-2xl font-bold text-center mb-6'>Upload PDF</h1>

      {/* Button to navigate to /pdfSearch */}
      <div className='absolute top-4 right-4'>
        <button
          onClick={() => navigate('/pdfSearch')} // Navigate to /pdfSearch
          className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Go to PDF Search
        </button>
      </div>

      {/* Drag-and-Drop Area */}
      <div
        className='border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer'
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className='text-gray-400 text-4xl font-bold mb-2'>+</div>
        <p className='text-gray-600 text-center'>
          Click or drag and drop PDF files here
        </p>
        <input
          type='file'
          multiple
          accept='application/pdf'
          className='hidden'
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Upload All Button */}
      {files.length > 0 && (
        <div className='mt-4 text-right'>
          <button
            onClick={uploadAllFiles}
            className='px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
          >
            Upload All
          </button>
        </div>
      )}

      {/* File List */}
      <div className='mt-4 max-h-72 overflow-y-auto border border-gray-200 rounded-lg shadow-md bg-gray-50 py-5 px-5'>
        {files.map((file, index) => (
          <div
            key={index}
            className='flex items-center justify-between mb-3 bg-white shadow rounded-lg p-4'
          >
            <div className='w-1/2'>
              <p className='text-gray-700 truncate'>{file.file.name}</p>
              <div className='bg-gray-200 rounded-full h-2 mt-2 w-full'>
                <div
                  className={`h-2 rounded-full ${
                    file.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => removeFile(index)}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
              >
                Cancel
              </button>
              <button
                onClick={() => uploadFile(index)}
                disabled={
                  file.status === 'Uploading' || file.status === 'Completed'
                }
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50'
              >
                Upload
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfUpload;
