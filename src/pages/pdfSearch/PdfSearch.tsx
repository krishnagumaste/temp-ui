import { FC } from 'react';

interface NewPageProps {}

const PdfSearch: FC<NewPageProps> = () => {
  return (
    <>
      This is the search page , add the things for <br />
      <br />
      <hr />
      1. Create a component for full text search
      <hr />
      2. Create a component for semantic text search
    </>
  );
};

export default PdfSearch;
