import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glass?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  interactive = false,
  glass = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const classes = [
    'ui-card',
    interactive ? 'ui-card--interactive' : '',
    glass ? 'ui-card--glass' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <div className={`ui-card__header ${className}`} style={style}>{children}</div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <div className={`ui-card__body ${className}`} style={style}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <div className={`ui-card__footer ${className}`} style={style}>{children}</div>
);
