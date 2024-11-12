import React, { ReactNode } from 'react';
import {
  Dialog as DialogPrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogFooter as DialogFooterPrimitive,
  DialogHeader as DialogHeaderPrimitive,
  DialogTitle as DialogTitlePrimitive,
} from 'hero-shad';

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  content?: ReactNode;
  footerContent?: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  content,
  footerContent,
}) => {
  return (
    <DialogPrimitive open={isOpen} onOpenChange={onOpenChange}>
      <DialogContentPrimitive className='sm:max-w-[425px]'>
        <DialogHeaderPrimitive>
          <DialogTitlePrimitive>{title}</DialogTitlePrimitive>
          {description && (
            <DialogDescriptionPrimitive>
              {description}
            </DialogDescriptionPrimitive>
          )}
        </DialogHeaderPrimitive>
        {content}
        <DialogFooterPrimitive>{footerContent}</DialogFooterPrimitive>
      </DialogContentPrimitive>
    </DialogPrimitive>
  );
};
