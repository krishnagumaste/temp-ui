import { useLocation, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from 'hero-shad';

interface BreadcrumbItem {
  title: React.ReactNode;
  link?: string;
}

const DynamicBreadcrumb = () => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const defaultItems: BreadcrumbItem[] = [
      {
        title: 'Connect CMC',
        link: '/',
      },
      {
        title: 'Dashboard',
      },
    ];

    if (pathname === '/') {
      setItems(defaultItems);
    } else {
      const tempPathName = pathname
        .split('/')
        .filter((path: string) => path !== '');
      const finalPathNames = tempPathName.map((path: string, index: number) => {
        const paths = tempPathName.slice(0, index + 1);
        const fullPath = `/${paths.join('/')}`;
        const isLastPath = tempPathName.length - 1 === index;

        const breadcrumbItem: BreadcrumbItem = {
          title: formatTitle(path),
          link: isLastPath ? undefined : fullPath,
        };

        return breadcrumbItem;
      });

      if (finalPathNames.length > 0) {
        finalPathNames.unshift({
          title: 'Connect CMC',
          link: '/',
        });
      }

      setItems(finalPathNames);
    }
  }, [pathname]);

  const formatTitle = (title: string) => {
    return title
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <BreadcrumbItem>
                <Link to={item.link}>{item.title}</Link>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>{item.title}</BreadcrumbItem>
            )}
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
