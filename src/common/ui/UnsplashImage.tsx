import React, { useState } from 'react';

type Props = {
  query: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
};

const UnsplashImage: React.FC<Props> = ({
  query,
  width = 400,
  height = 300,
  className = '',
  alt,
}) => {
  const [src, setSrc] = useState(
    `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`
  );
  const fallback = `https://placehold.co/${width}x${height}/e5e7eb/6b7280?text=Image+Not+Found`;

  return (
    <img
      src={src}
      alt={alt || query}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setSrc(fallback)}
    />
  );
};

export default UnsplashImage;
