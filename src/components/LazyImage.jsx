import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      setError(false);
    };
    img.onerror = () => {
      setError(true);
      setIsLoaded(true);
    };
  }, [src]);

  const fallbackSrc = `https://via.placeholder.com/${width || 300}x${height || 200}?text=${encodeURIComponent(alt || 'Image Placeholder')}`;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {error ? (
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      )}
    </motion.div>
  );
};

export default LazyImage;