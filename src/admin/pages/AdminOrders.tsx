import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const load = async () => setOrders(await adminApi.getOrders());
  useEffect(() => { load(); }, []);
  const update = async (id: string, status: string) => { await adminApi.updateOrderStatus(id, { status }); load(); };
  return <div><h1 style={{ color: '#F3D89D' }}>Pedidos de tienda</h1><p style={{ color: '#A3998D' }}>Gestiona pedidos recibidos desde la cesta.</p><div style={{ display: 'grid', gap: '1rem' }}>{orders.map(order => <article key={order.id} style={{ background: '#12100E', border: '1px solid rgba(197,160,89,.25)', padding: '1.25rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><strong style={{ color: '#F3D89D' }}>{order.orderNumber}</strong><span style={{ color: '#C5A059' }}>{order.totalAmount.toFixed(2)} €</span></div><p style={{ color: '#E5D6C5', marginBottom: '.4rem' }}>{order.customerName} · {order.customerEmail}</p><ul style={{ color: '#A3998D', fontSize: 12 }}>{order.items.map((item: any) => <li key={item.id}>{item.quantity} × {item.title}</li>)}</ul><select value={order.status} onChange={event => update(order.id, event.target.value)} style={{ padding: '.5rem', background: '#090807', color: '#fff', border: '1px solid rgba(197,160,89,.4)' }}><option value="PENDING">Pendiente</option><option value="PROCESSING">En preparación</option><option value="SHIPPED">Enviado</option><option value="COMPLETED">Completado</option><option value="CANCELLED">Cancelado</option></select></article>)}</div></div>;
};
