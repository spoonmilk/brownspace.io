import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/bse_logo.png" alt="BSE Logo" className="w-[50px] h-[50px]" />
      <span className="text-xl font-bold">BSE</span>
    </div>
  );
}

export default Logo;
