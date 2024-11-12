import styles from './BoilerplateInfo.module.scss';
import { Link } from 'react-router-dom';

const BoilerplateInfo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        React + TypeScript Application Boilerplate for Host application
      </h1>

      <p className={styles.paragraph}>
        <code>This repo has login setup, header and sidebar.</code>
      </p>
      <p className={styles.paragraph}>
        <code>
          Clone this repo, and just add you components/pages creating respected
          routes.
        </code>
      </p>

      <p className={styles.paragraph}>
        Write styles in tailwind scss. For more information, please refer to
        Tailwind CSS documentation:{' '}
        <Link
          to='https://tailwindcss.com/docs/installation'
          className={styles.link}
          target='_blank'
        >
          Tailwind Documentation
        </Link>
      </p>

      <p className={styles.paragraph}>
        <code className={styles.code}>Dark mode</code> and{' '}
        <code className={styles.code}>light mode</code> was set up in this
        application. All the colors are set up with variables in{' '}
        <code className={styles.code}>index.css</code> file. If you need specfic
        colors to change, you can change thier it will apply to whole
        application. Additionally, theme set up is also done, so you can add any
        color in to theme dropdown and configure colors according to
        requirement.
      </p>

      <p className={styles.paragraph}>
        This repo uses custom component library which was built on top of
        shadcn/ui. We need to use components from the custom library, since they
        support light/dark by default.
      </p>

      <p className={styles.paragraph}>
        We have used Jest + React Testing Library for test cases.
      </p>

      <ol className={styles.list}>
        <li className={styles.listItem}>
          <p className={styles.paragraph}>
            Create a folder named <code className={styles.code}>__tests__</code>{' '}
            under every folder, and you can write test cases for the pages you
            have created. Please try to maintain at least 80% code coverage.
          </p>
          <p className={styles.paragraph}>
            For normal test cases check without coverage you can do{' '}
            <code className={styles.code}>npm run test</code> and for checking
            coverage you need to run{' '}
            <code className={styles.code}>npm run test:coverage</code>
          </p>
          <span>For Reference:</span>{' '}
          <Link
            to='https://jestjs.io/docs/react-testing-library/intro'
            className={styles.link}
            target='_blank'
          >
            Jest with React
          </Link>
        </li>

        <li className={styles.listItem}>
          <p className={styles.paragraph}>
            For API integration, we have made the process very smooth. We are
            using React Query for all the API calls.
          </p>
          <p className={styles.paragraph}>
            We have written 4 custom hooks (GET, PUT, POST, DELETE) under custom
            hooks. Provide the URL in the{' '}
            <code className={styles.code}>apiConstants</code> file, import the
            hook, and pass the URL. The fetching hook will take care of
            everything and give you the response. You can write business logic
            according to the response.
          </p>
          <p className={styles.paragraph}>
            We have written one API call for getting sessions in{' '}
            <code className={styles.code}>App.tsx</code>, where you can take
            reference.
          </p>
          <span>For Reference:</span>{' '}
          <Link
            to='https://react-query.tanstack.com/docs/overview'
            className={styles.link}
            target='_blank'
          >
            React Query
          </Link>
        </li>

        <li className={styles.listItem}>
          <p className={styles.paragraph}>
            For routing, we have set up the{' '}
            <code className={styles.code}>createBrowserRouter</code> using{' '}
            <code className={styles.code}>react-router-dom</code> v6. There is a
            folder called <code className={styles.code}>routes</code>, under
            which we have defined all routes in an array. For new routes, add
            them to the array.
          </p>
          <p className={styles.paragraph}>
            We have created a sample route for one example new page:{' '}
            <Link to='/newPage' className={styles.link} target='_blank'>
              New Page
            </Link>
          </p>
          <span>For Reference:</span>{' '}
          <Link
            to='https://reactrouter.com/web/guides/quick-start'
            className={styles.link}
            target='_blank'
          >
            React Router
          </Link>
        </li>

        <li className={styles.listItem}>
          <p className={styles.paragraph}>
            We have done lint set up with the help of lint-staged, ESLint, and
            Prettier, and added them as checks before committing the code.
          </p>
          <p className={styles.paragraph}>
            This means whenever you commit code, there will be a lint check and
            test case check. If anything fails, you will not be able to commit
            the code.
          </p>
          <p className={styles.paragraph}>
            You can fix linting errors by running{' '}
            <code className={styles.code}>npm run lint:fix</code>.
          </p>
        </li>

        <li className={styles.listItem}>
          <p className={styles.paragraph}>
            Finally, this React application was created with a TypeScript
            template. It will check all prop types very strictly, so we need to
            define types correctly. I know it will be hard, but it will help you
            in the long run.
          </p>
          <p className={styles.paragraph}>
            P.S. Don&#39;t forget to have fun while coding! 😉
          </p>
        </li>
      </ol>
    </div>
  );
};

export default BoilerplateInfo;
