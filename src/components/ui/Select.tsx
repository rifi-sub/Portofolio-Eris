import React from 'react';
import './Form.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  required,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="ui-form-group">
      {label && (
        <label htmlFor={selectId} className={`ui-form-label ${required ? 'ui-form-label--required' : ''}`}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`ui-select ${error ? 'ui-select--error' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="ui-form-error">{error}</span>}
    </div>
  );
};
