import React, { useEffect, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Button, Layout, Typography, Spin, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const PDFViewer: React.FC = () => {
  const location = useLocation();
  const { pdfName } = location.state || { pdfName: '' };
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://0.0.0.0:9090/v1/search-pdf-service/generate-single-presigned-url-for-download',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: pdfName }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch presigned URL');
        }

        const data = await response.json();
        const presignedUrl = data.url;

        // Download the PDF using the presigned URL
        const pdfResponse = await fetch(presignedUrl);

        if (!pdfResponse.ok) {
          throw new Error('Failed to download PDF');
        }

        const blob = await pdfResponse.blob();
        const fileUrl = URL.createObjectURL(blob);

        setPdfUrl(fileUrl);
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error({
          message: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
        });
        setLoading(false);
      }
    };

    if (pdfName) {
      fetchPresignedUrl();
    }
  }, [pdfName]);

  const handleNavigateToSearch = () => {
    navigate('/pdfSearch');
  };

  return (
    <Layout className='h-screen'>
      <Header className='bg-white shadow-md'>
        <div className='flex items-center justify-center relative'>
          <Title
            level={3}
            className='absolute left-1/2 transform -translate-x-1/2'
          >
            PDF Viewer - {pdfName || 'No PDF Selected'}
          </Title>
          <div className='ml-auto'>
            <Button
              type='primary'
              icon={<SearchOutlined />}
              htmlType='button'
              onClick={handleNavigateToSearch}
            >
              Go to PDF Search
            </Button>
          </div>
        </div>
      </Header>
      <Content className='flex items-center justify-center h-full'>
        {loading ? (
          <Spin tip='Loading PDF...' size='large' />
        ) : pdfUrl ? (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
            <div className='w-[60%] border-2 border-gray-300 rounded-md shadow-md h-full'>
              <Viewer
                fileUrl={pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <Title level={4}>No PDF file selected</Title>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default PDFViewer;
