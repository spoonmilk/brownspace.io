import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/transparent_bse_logo.svg" alt="BSE Logo" className="w-[60px] h-[60px] invert dark:invert-0"/>
      <span className="text-2xl font-bold">BSE</span>
    </div>
  );
}

export default Logo;
