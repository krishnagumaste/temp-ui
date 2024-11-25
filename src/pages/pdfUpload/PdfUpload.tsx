import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FileUpload {
  file: File;
  progress: number;
  status: string;
}

const PdfUpload: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

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
    const fileSize = fileToUpload.file.size;
    const partSize = 5 * 1024 * 1024; // 5 MB
    const partNumbers = Math.ceil(fileSize / partSize);

    setFiles(prev =>
      prev.map((f, i) =>
        i === index ? { ...f, status: 'Uploading', progress: 0 } : f
      )
    );

    try {
      // Step 1: Start Multipart Upload
      const startResponse = await axios.post(
        'http://0.0.0.0:9090/v1/search-pdf-service/start-multipart-upload',
        { fileName: fileToUpload.file.name }
      );
      const { uploadId } = startResponse.data;

      // Step 2: Generate Presigned URLs for Parts
      const generateUrlsResponse = await axios.post(
        'http://0.0.0.0:9090/v1/search-pdf-service/generate-presigned-url',
        {
          fileName: fileToUpload.file.name,
          uploadId,
          partNumbers,
        }
      );
      const presignedUrls = generateUrlsResponse.data.presignedUrls;

      // Step 3: Upload Each Part
      const parts = [];
      for (let partNumber = 1; partNumber <= partNumbers; partNumber++) {
        const start = (partNumber - 1) * partSize;
        const end = Math.min(partNumber * partSize, fileSize);
        const filePart = fileToUpload.file.slice(start, end);

        console.log(presignedUrls[partNumber - 1]);

        const uploadResponse = await axios.put(
          presignedUrls[partNumber - 1],
          filePart,
          {
            headers: { 'Content-Type': 'application/pdf' },
            onUploadProgress: progressEvent => {
              if (progressEvent.total) {
                const partProgress =
                  (progressEvent.loaded / progressEvent.total) * 100;
                const overallProgress = Math.min(
                  ((partNumber - 1 + partProgress / 100) / partNumbers) * 100,
                  100
                );

                setFiles(prev =>
                  prev.map((f, i) =>
                    i === index ? { ...f, progress: overallProgress } : f
                  )
                );
              }
            },
          }
        );

        parts.push({
          ETag: uploadResponse.headers.etag,
          PartNumber: partNumber,
        });
      }

      // Step 4: Complete Multipart Upload
      await axios.post(
        'http://0.0.0.0:9090/v1/search-pdf-service/complete-multipart-upload',
        {
          fileName: fileToUpload.file.name,
          uploadId,
          parts,
        }
      );

      setFiles(prev =>
        prev.map((f, i) =>
          i === index ? { ...f, status: 'Completed', progress: 100 } : f
        )
      );
    } catch (error) {
      console.error('Error during file upload', error);
      setFiles(prev =>
        prev.map((f, i) =>
          i === index ? { ...f, status: 'Failed', progress: 0 } : f
        )
      );
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
      <h1 className='text-2xl font-bold text-center mb-6'>Upload PDF</h1>

      <div className='absolute top-4 right-4'>
        <button
          onClick={() => navigate('/pdfSearch')}
          className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Go to PDF Search
        </button>
      </div>

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
                  style={{ width: `${Math.min(file.progress, 100)}%` }}
                ></div>
              </div>
              <p className='text-xs text-gray-500 mt-1'>{`${file.status} - ${Math.min(file.progress, 100).toFixed(2)}%`}</p>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => removeFile(index)}
                disabled={file.status === 'Completed'}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50'
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
