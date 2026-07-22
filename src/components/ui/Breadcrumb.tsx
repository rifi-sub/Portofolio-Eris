import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`ui-breadcrumb ${className}`}>
      <ol className="ui-breadcrumb__list">
        <li className="ui-breadcrumb__item">
          <Link to="/" className="ui-breadcrumb__link" title="Inicio">
            <Home size={15} />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="ui-breadcrumb__item">
              <ChevronRight size={14} className="ui-breadcrumb__separator" />
              {isLast || !item.url ? (
                <span className="ui-breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.url} className="ui-breadcrumb__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
