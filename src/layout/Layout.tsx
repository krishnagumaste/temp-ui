import React from 'react';
import { Button } from 'hero-shad';
import { SquareTerminal, LucideIcon } from 'lucide-react';
import DynamicBreadcrumb from '../components/breadcrumbs/Breadcrumb';
import Header from '../components/header/Header';

interface NavItemWithTooltipProps {
  label: string;
  icon: React.ReactElement<LucideIcon>;
}

const NavItemWithTooltip = ({
  label,
  icon,
  ...props
}: NavItemWithTooltipProps) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='rounded-lg bg-muted'
      aria-label={label}
      {...props}
    >
      {icon}
    </Button>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />

      {/* Main Content and Sidebar */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <aside className='fixed top-[53px] left-0 z-20 flex h-[calc(100%-53px)] flex-col border-r'>
          <nav className='grid gap-1 p-2'>
            <NavItemWithTooltip
              label='Playground'
              icon={<SquareTerminal className='size-5' />}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className='flex-1 overflow-auto pl-[53px] m-[12px]'>
          <DynamicBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
