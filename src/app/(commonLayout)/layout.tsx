import NavbarWrapper from '@/app/components/shared/nav/NavbarWrapper';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <NavbarWrapper />
      {children}
    </div>
  );
};

export default layout;
