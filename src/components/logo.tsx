import React from 'react';

const Logo: React.FC = () => {
  const logoStyle: React.CSSProperties = {
    display: 'inline-block'
  };

  const logoImageStyle: React.CSSProperties = {
    width: '125px', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    dark: { invert: '1' } // Invert the logo color in dark mode
  };

  return (
    <div style={logoStyle}>
      <img src="/logo.png" alt="Logo" className="w-[125px] h-auto dark:invert display" />
    </div>
  );
}

export default Logo;
