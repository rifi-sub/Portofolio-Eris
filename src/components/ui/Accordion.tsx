import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`ui-accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`ui-accordion__item ${isOpen ? 'ui-accordion__item--open' : ''}`}
          >
            <button
              className="ui-accordion__header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="ui-accordion__icon">
                <ChevronDown size={18} />
              </span>
            </button>
            {isOpen && <div className="ui-accordion__content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
