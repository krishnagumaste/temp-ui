import React, { useState } from 'react';
import { Input, Button, Pagination, Card, Space, Upload, message } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

interface PDFItem {
  id: string;
  pdfName: string;
  pageNumbers: string;
  viewCount: number;
}

const { Search } = Input;

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullTextSearch, setIsFullTextSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfItems] = useState<PDFItem[]>(generateDummyData(30));
  const itemsPerPage = 9;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchTypeToggle = () => {
    setIsFullTextSearch((prevState) => !prevState);
  };

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredPdfItems = pdfItems.filter((item) =>
    item.pdfName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredPdfItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPdfItems.length / itemsPerPage);

  // Function to handle the View PDF
  const handleViewClick = (pdfName: string) => {
    alert(`You are viewing the PDF: ${pdfName}`);
  };

  // Upload handle function
  const handleUpload = (file: any) => {
    // Only allow PDF files
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
      return false;
    }
    message.success(`${file.name} file uploaded successfully`);
    return false; 
  };

  return (
    <div className="flex justify-center items-start p-4 min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col h-full">
        
        <div className="absolute top-4 right-4 z-10">
          <Upload
            beforeUpload={handleUpload} // Handle file before upload
            showUploadList={false} // Disable default upload list
            accept=".pdf" // Only allow PDF files
          >
            <Button icon={<UploadOutlined />} type="primary">
              Upload PDF
            </Button>
          </Upload>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 mt-6">
          <div className="relative w-full md:w-3/4 lg:w-4/5 mb-2 md:mb-0">
            
            <Search
              placeholder="Enter the keyword to search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              onSearch={handleSearch} 
              enterButton={<SearchOutlined />}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

         
          <Space size={20} className="mt-2 md:mt-0">
            <Button
              onClick={handleSearchTypeToggle}
              type={isFullTextSearch ? 'primary' : 'default'}
            >
              Full Text Search
            </Button>
            <Button
              onClick={handleSearchTypeToggle}
              type={!isFullTextSearch ? 'primary' : 'default'}
            >
              Semantic Search
            </Button>
          </Space>
        </div>

        {/* Cards Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 flex-grow overflow-hidden">
          {displayedItems.map((item) => (
            <Card
              key={item.id}
              title={item.pdfName}
              extra={<Button onClick={() => handleViewClick(item.pdfName)}>View PDF</Button>}
              style={{ width: '100%' }}
              hoverable
              className="shadow-lg rounded-lg"
            >
              <p>{item.pageNumbers}</p>
            </Card>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center mt-2">
          <Pagination
            current={currentPage}
            total={filteredPdfItems.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};


function generateDummyData(numItems: number): PDFItem[] {
  return Array.from({ length: numItems }, (_, i) => ({
    id: `pdf-item-${i + 1}`,
    pdfName: `PDF Document ${i + 1}`,
    pageNumbers: `Page no ${Math.floor(Math.random() * 100) + 1}, ${Math.floor(Math.random() * 100) + 1}`,
    viewCount: Math.floor(Math.random() * 100) + 10,
  }));
}

export default SearchPage;
