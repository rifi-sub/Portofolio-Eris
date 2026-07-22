import React from 'react';
import './Tag.css';

export interface TagProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  active = false,
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`ui-tag ${active ? 'ui-tag--active' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
