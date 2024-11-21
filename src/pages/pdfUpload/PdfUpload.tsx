import { FC } from 'react';

interface NewPageProps {}

const PdfUpload: FC<NewPageProps> = () => {
  return (
    <>
      This is the pdf upload page , add the things for pdf upload and uploading
      status bar here
      <br />
      <br />
      <hr />
      1. Pdf upload button funtioanlity should be there in this component
      <hr />
      2. Drag and drop functionlity should also be there
      <hr />
      3. Upload progess should also be there
    </>
  );
};

export default PdfUpload;
