import React from "react";

interface File {
  name: string;
  size: string;
}

interface FileListProps {
  files: File[];
  onUpload: (index: number) => void;
  onCancel: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onUpload, onCancel }) => {
  return (
    <div className="mt-5">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-5"
        >
          <div className="flex-1">
            <span className="text-base">{file.name}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="text-sm px-3 py-1 bg-transparent border border-gray-300 rounded transition-colors duration-300 hover:border-red-500 hover:text-red-500"
              onClick={() => onCancel(index)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-1 bg-transparent border border-gray-300 rounded transition-colors duration-300 hover:border-green-500 hover:text-green-500"
              onClick={() => onUpload(index)}
            >
              Upload
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
