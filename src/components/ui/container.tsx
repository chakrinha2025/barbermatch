
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = ({
  children,
  className,
  size = 'lg',
  ...props
}: ContainerProps) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return 'max-w-screen-sm';
      case 'md': return 'max-w-screen-md';
      case 'lg': return 'max-w-screen-lg';
      case 'xl': return 'max-w-screen-xl';
      case 'full': return 'max-w-full';
      default: return 'max-w-screen-lg';
    }
  };

  return (
    <div
      className={cn(
        'px-4 mx-auto w-full',
        getSize(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
