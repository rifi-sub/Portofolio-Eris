import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { adminApi } from '../services/adminApi';

interface ImageUploaderProps {
  onUploadSuccess?: (uploadedMedia: any[]) => void;
  multiple?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess, multiple = true }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = e.target.files;

    setIsUploading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const uploaded = await adminApi.uploadMedia(files);
      setSuccessMsg(`¡${uploaded.length} archivo(s) subido(s) con éxito!`);
      if (onUploadSuccess) onUploadSuccess(uploaded);
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      border: '2px dashed rgba(197,160,89,0.4)',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center',
      backgroundColor: 'rgba(197,160,89,0.03)',
      transition: 'border-color 0.2s',
      position: 'relative'
    }}>
      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          cursor: isUploading ? 'not-allowed' : 'pointer',
          width: '100%',
          height: '100%'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}>
        {isUploading ? (
          <Loader2 size={28} color="#C5A059" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <Upload size={28} color="#C5A059" />
        )}
        <div style={{ fontSize: '0.9rem', color: '#F3D89D', fontWeight: 600 }}>
          {isUploading ? 'Subiendo imagen...' : 'Arrastra o haz clic para subir imágenes'}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#A3998D' }}>
          Formatos soportados: PNG, JPG, WEBP, GIF, SVG (Máx. 20MB)
        </div>
      </div>

      {error && (
        <div style={{ marginTop: '0.75rem', color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div style={{ marginTop: '0.75rem', color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <CheckCircle size={14} />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
};
