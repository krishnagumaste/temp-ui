import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userDetailsContext';
import MareanaLogo from '../../assets/images/mareanaLogo.svg';
import { ModeToggle } from '../ThemeToggle';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'hero-shad';
import { Dialog } from '../dialog/Dialog';
import { APP_URL } from '../../../apiConstants/urlConstants';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(UserContext);
  const [openLogOut, setOpenLogOut] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogOut(!openLogOut);
  };

  const handleOk = () => {
    window.open(`/auth/logout?redirect_url=${APP_URL}/login`, '_self');
  };

  return (
    <header className='border-b sticky top-0 z-10 flex h-[53px] items-center justify-between bg-[var(--backgroundheader)] px-4'>
      <img width={110} height={32} src={MareanaLogo} alt='mareana-logo' />
      <div className='flex items-center gap-4'>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='overflow-hidden rounded-full'
            >
              <Avatar className='text-sm'>
                <AvatarImage src='' alt='Avatar' />
                <AvatarFallback>SY</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mt-1 w-[230px' align='end'>
            <div className='p-3 flex flex-col justify-center items-center'>
              <DropdownMenuLabel>
                <Avatar className='text-lg w-16 h-16'>
                  <AvatarImage src='' alt='Avatar' />
                  <AvatarFallback>
                    {user?.firstname?.substring?.(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuLabel>
              <DropdownMenuLabel className='p-0 px-1'>
                {user?.firstname} {user?.lastname}
              </DropdownMenuLabel>
              <DropdownMenuLabel className='p-0 px-1'>
                {user?.email_id}
              </DropdownMenuLabel>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutClick}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog
        isOpen={openLogOut}
        onOpenChange={setOpenLogOut}
        title='Logout'
        description='You are about to log out and terminate your session do you want to confirm?'
        footerContent={
          <div className='flex gap-2'>
            <Button variant='destructive' onClick={handleLogoutClick}>
              Cancel
            </Button>
            <Button onClick={handleOk}>Ok</Button>
          </div>
        }
      />
    </header>
  );
};

export default Header;
