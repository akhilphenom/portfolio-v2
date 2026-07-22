import React, { ReactNode } from 'react';

interface BackgroundImageProps {
  src: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt = 'background',
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-[100vh] ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 transition-all duration-300" />
    </div>
  );
};

export default BackgroundImage;
