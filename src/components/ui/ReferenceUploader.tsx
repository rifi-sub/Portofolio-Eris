import React, { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';

export interface ReferenceFile {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  file?: File;
}

interface ReferenceUploaderProps {
  maxFiles?: number;
  maxSizeBytes?: number; // default 20MB
  onFilesChange: (files: ReferenceFile[]) => void;
}

export const ReferenceUploader: React.FC<ReferenceUploaderProps> = ({
  maxFiles = 8,
  maxSizeBytes = 20 * 1024 * 1024, // 20 MB
  onFilesChange,
}) => {
  const [files, setFiles] = useState<ReferenceFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setErrorMessage(null);

    const newFiles: ReferenceFile[] = [...files];
    const fileArray = Array.from(selectedFiles);

    for (const file of fileArray) {
      if (newFiles.length >= maxFiles) {
        setErrorMessage(`Máximo ${maxFiles} archivos permitidos por encargo.`);
        break;
      }

      if (file.size > maxSizeBytes) {
        setErrorMessage(`El archivo "${file.name}" supera el tamaño máximo permitido de 20 MB.`);
        continue;
      }

      const isImage = file.type.startsWith('image/');
      const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

      newFiles.push({
        id: `ref-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl,
        file,
      });
    }

    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleRemoveFile = (id: string) => {
    const fileToRemove = files.find((f) => f.id === id);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onFilesChange(updated);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ marginTop: '1.25rem' }}>
      <label
        style={{
          fontFamily: 'var(--font-sans, sans-serif)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: '#5c5247',
          textTransform: 'uppercase',
          fontWeight: 600,
          display: 'block',
          marginBottom: '0.5rem',
        }}
      >
        Archivos de Referencia (Fotos, Moodboards, Pose, PDF, PSD)
      </label>

      {/* Upload Dropzone Box */}
      <div
        style={{
          border: '2px dashed rgba(197, 160, 89, 0.4)',
          borderRadius: '6px',
          padding: '1.5rem',
          textAlign: 'center',
          backgroundColor: '#faf8f5',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          position: 'relative',
        }}
        onClick={() => document.getElementById('ref-file-input')?.click()}
      >
        <input
          id="ref-file-input"
          type="file"
          multiple
          accept="image/*,.pdf,.psd,.procreate"
          style={{ display: 'none' }}
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(197, 160, 89, 0.12)',
            color: '#C5A059',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto',
          }}
        >
          <Upload size={20} />
        </div>

        <p style={{ fontSize: '11px', color: '#1a1510', margin: '0 0 0.25rem 0', fontWeight: 600 }}>
          Haz clic o arrastra aquí tus archivos de referencia
        </p>
        <p style={{ fontSize: '9px', color: '#8c8073', margin: 0 }}>
          Hasta {maxFiles} archivos · Máximo 20 MB por archivo · JPG, PNG, WEBP, PDF, PSD, Procreate
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '4px',
            padding: '0.5rem 0.75rem',
            marginTop: '0.75rem',
            color: '#dc2626',
            fontSize: '10px',
          }}
        >
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected Files List Grid */}
      {files.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem',
            marginTop: '1rem',
          }}
        >
          {files.map((file) => (
            <div
              key={file.id}
              style={{
                position: 'relative',
                background: '#ffffff',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '6px',
                padding: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              {file.previewUrl ? (
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    color: '#C5A059',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {file.type.includes('image') ? <ImageIcon size={18} /> : <FileText size={18} />}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#1a1510',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {file.name}
                </p>
                <span style={{ fontSize: '8px', color: '#8c8073' }}>{formatSize(file.size)}</span>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFile(file.id)}
                aria-label="Eliminar archivo"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
