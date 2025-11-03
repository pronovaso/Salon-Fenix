import React from 'react';

type Props = {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  alt?: string;
};

const ImagePlaceholder: React.FC<Props> = ({
  width = 400,
  height = 300,
  text = 'Placeholder',
  bgColor = 'e5e7eb',
  textColor = '6b7280',
  className = '',
  alt,
}) => {
  const placeholderUrl = `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
    text
  )}`;
  return (
    <img
      src={placeholderUrl}
      alt={alt || text}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

export default ImagePlaceholder;
