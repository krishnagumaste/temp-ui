import React, { useState } from 'react';
import { Input, Button, Pagination, Card, Space, message, Spin } from 'antd';
import {
  SearchOutlined,
  UploadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PDFItem {
  pdfName: string;
  pageNumbers: number[];
}

interface Item {
  image_name: string;
  page_number: number;
}

const { Search } = Input;

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullTextSearch, setIsFullTextSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfItems, setPdfItems] = useState<Record<string, PDFItem>>({}); // Dictionary to store grouped results
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      message.warning('Please enter a keyword to search.');
      return;
    }

    setSearchTerm(value);
    setLoading(true);

    try {
      const response = await axios.post(
        'http://0.0.0.0:9090/v1/search-pdf-service/search-query',
        { query: value }
      );

      if (response.status === 500) {
        throw new Error('Internal Server Error');
      }

      const results = response.data.results;

      // Use a dictionary to group by pdfName
      const groupedResults: Record<string, PDFItem> = {};

      results.forEach((item: Item) => {
        const { image_name, page_number } = item;

        // If the PDF name already exists, push the page number into the array
        if (groupedResults[image_name]) {
          groupedResults[image_name].pageNumbers.push(page_number);
        } else {
          // Otherwise, create a new entry with the pdfName and initial page number
          groupedResults[image_name] = {
            pdfName: image_name,
            pageNumbers: [page_number],
          };
        }
      });

      setPdfItems(groupedResults);
    } catch (error) {
      console.log(error);
      if (error) {
        message.error('Text not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTypeToggle = () => {
    setIsFullTextSearch(prevState => !prevState);
  };

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Convert pdfItems from a dictionary to an array for pagination
  const pdfItemsArray = Object.values(pdfItems);
  const displayedItems = pdfItemsArray.slice(startIndex, endIndex);

  const handleViewClick = (pdfName: string, pageNumbers: number[]) => {
    // Pass pdfName and pageNumbers as state when navigating to the PDFViewer
    navigate('/pdfViewer', { state: { pdfName, pageNumbers } });
  };

  const handleUploadClick = () => {
    navigate('/pdfUpload');
  };

  const handleRefresh = () => {
    setPdfItems({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className='flex justify-center items-start p-4 min-h-screen bg-gray-50 relative overflow-hidden'>
      <div className='w-full max-w-4xl flex flex-col h-full'>
        <div className='absolute top-4 right-4 z-10'>
          <Button
            icon={<UploadOutlined />}
            type='primary'
            onClick={handleUploadClick}
          >
            Upload PDF
          </Button>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mb-2 mt-6'>
          <div className='relative w-full md:w-3/4 lg:w-4/5 mb-2 md:mb-0'>
            <Search
              placeholder='Enter the keyword to search'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              className='w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
            />
          </div>

          <Space size={20} className='mt-2 md:mt-0'>
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
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              Refresh
            </Button>
          </Space>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-full'>
            <Spin size='large' />
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 flex-grow overflow-hidden'>
              {displayedItems.map(item => (
                <Card
                  key={item.pdfName}
                  title={item.pdfName}
                  extra={
                    <Button
                      onClick={() =>
                        handleViewClick(item.pdfName, item.pageNumbers)
                      }
                    >
                      View PDF
                    </Button>
                  }
                  style={{ width: '100%' }}
                  hoverable
                  className='shadow-lg rounded-lg'
                >
                  <p>{'Found in Page/s : ' + item.pageNumbers.join(', ')}</p>
                </Card>
              ))}
            </div>

            <div className='flex justify-center mt-2'>
              <Pagination
                current={currentPage}
                total={pdfItemsArray.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
