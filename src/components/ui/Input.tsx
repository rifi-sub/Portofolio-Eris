import React from 'react';
import './Form.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  required,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="ui-form-group">
      {label && (
        <label htmlFor={inputId} className={`ui-form-label ${required ? 'ui-form-label--required' : ''}`}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`ui-input ${error ? 'ui-input--error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="ui-form-error">{error}</span>}
      {hint && !error && <span className="ui-form-hint">{hint}</span>}
    </div>
  );
};
