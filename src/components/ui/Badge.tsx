import React from 'react';
import './Badge.css';

export interface BadgeProps {
  variant?: 'terracotta' | 'amber' | 'emerald' | 'dark' | 'rose';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'terracotta',
  children,
  icon,
  className = '',
  style,
}) => {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`} style={style}>
      {icon && <span className="ui-badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
