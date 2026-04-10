import Hero from '@/app/components/home/Hero';
import Navbar from '@/app/components/shared/Navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
