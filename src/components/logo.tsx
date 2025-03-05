import React from 'react';

const Logo: React.FC = () => {
  const logoStyle: React.CSSProperties = {
    display: 'inline-block'
  };

  return (
    <div style={logoStyle}>
      <img src="/logo.png" alt="Logo" className="w-[125px] h-auto dark:invert display" />
    </div>
  );
}

export default Logo;
