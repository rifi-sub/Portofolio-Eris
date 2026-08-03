import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { ProductMedia } from '../../types';
import { getMediaUrl } from '../../services/portfolioApi';

export const ProductGallery: React.FC<{ title: string; coverImage: string; media?: ProductMedia[] }> = ({ title, coverImage, media = [] }) => {
  const entries = media.length ? media : [{ url: coverImage, type: 'IMAGE' as const }];
  const [index, setIndex] = useState(0);
  const current = entries[index] || entries[0];
  const move = (amount: number) => setIndex((index + amount + entries.length) % entries.length);
  return <div style={{ background: '#fff', border: '1px solid rgba(197,160,89,.35)', padding: '1.25rem' }}>
    <div style={{ position: 'relative', height: '440px', background: '#f5f2eb', overflow: 'hidden' }}>
      {current.type === 'VIDEO' ? <video src={getMediaUrl(current.url)} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <img src={getMediaUrl(current.url)} alt={current.altText || title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      {entries.length > 1 && <>
        <button aria-label="Anterior" onClick={() => move(-1)} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', border: 0, borderRadius: '50%', padding: '.5rem', background: 'rgba(20,15,10,.7)', color: '#fff', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
        <button aria-label="Siguiente" onClick={() => move(1)} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', border: 0, borderRadius: '50%', padding: '.5rem', background: 'rgba(20,15,10,.7)', color: '#fff', cursor: 'pointer' }}><ChevronRight size={18} /></button>
      </>}
    </div>
    {entries.length > 1 && <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem', overflowX: 'auto' }}>{entries.map((item, itemIndex) => <button key={`${item.url}-${itemIndex}`} onClick={() => setIndex(itemIndex)} aria-label={`Ver elemento ${itemIndex + 1}`} style={{ position: 'relative', flex: '0 0 72px', height: 72, padding: 0, border: itemIndex === index ? '2px solid #C5A059' : '1px solid rgba(197,160,89,.3)', background: '#f5f2eb', cursor: 'pointer' }}>{item.type === 'VIDEO' ? <><video src={getMediaUrl(item.url)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><Play size={18} color="#fff" style={{ position: 'absolute', inset: '50% auto auto 50%', transform: 'translate(-50%, -50%)' }} /></> : <img src={getMediaUrl(item.url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</button>)}</div>}
  </div>;
};
