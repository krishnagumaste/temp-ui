import { FC } from 'react';
import { Button, Input } from 'hero-shad';
import { useTheme } from '../../theme/ThemeProvider';

interface NewPageProps {}

const NewPage: FC<NewPageProps> = () => {
  const { setTheme } = useTheme();
  return (
    <>
      <h3>
        This is sample page, you cannot create a pages under page folder and
        create routes according to that.
        <Button variant='destructive' onClick={() => setTheme('dark')}>
          Dark
        </Button>
        <Button variant='destructive' onClick={() => setTheme('light')}>
          Light
        </Button>
        <Button variant='destructive' onClick={() => setTheme('system')}>
          System
        </Button>
        <Input />
      </h3>
    </>
  );
};

export default NewPage;
