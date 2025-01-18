import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt, className }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;