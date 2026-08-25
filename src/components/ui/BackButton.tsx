import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Volver',
  className = '',
  style = {}
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`btn-back ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'transparent',
        border: '1px solid rgba(197, 160, 89, 0.4)',
        color: '#C5A059',
        padding: '0.4rem 0.85rem',
        borderRadius: '4px',
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        ...style
      }}
    >
      <ArrowLeft size={14} />
      <span>{label}</span>
    </button>
  );
};
