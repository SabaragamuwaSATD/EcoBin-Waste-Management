// src/components/ui/avatar.tsx
import React from "react";

interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ className, children }) => {
  return <div className={`relative inline-block ${className}`}>{children}</div>;
};

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  ...props
}) => {
  return (
    <img
      className="h-full w-full object-cover rounded-full -mb-10"
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-full">
      {children}
    </div>
  );
};
