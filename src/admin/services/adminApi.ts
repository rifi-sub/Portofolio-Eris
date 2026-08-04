const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://alilyback.duckdns.org/eris/api/portfolio';
  }
  return 'http://localhost:5000/api/portfolio';
};

const API_BASE = getApiBase();

// Resuelve URLs de media relativas al dominio correcto del backend
export function getMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/api/') || url.startsWith('api/')) {
    const base = getApiBase().replace(/\/api\/portfolio\/?$/, '');
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${base}${cleanUrl}`;
  }
  return url;
}

function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const adminApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al iniciar sesión');
    }
    return res.json();
  },

  // Content Sections
  saveContentSection: async (sectionKey: string, payload: any) => {
    const res = await fetch(`${API_BASE}/admin/content/${sectionKey}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error al guardar sección');
    return res.json();
  },

  getContentSection: async (sectionKey: string) => {
    const res = await fetch(`${API_BASE}/content/${sectionKey}`);
    if (!res.ok) return null;
    return res.json();
  },

  // Projects CRUD
  createProject: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al crear obra');
    }
    return res.json();
  },

  updateProject: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al actualizar obra');
    }
    return res.json();
  },

  deleteProject: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al eliminar obra');
    return res.json();
  },

  // Services CRUD
  createService: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear servicio');
    return res.json();
  },

  updateService: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar servicio');
    return res.json();
  },

  deleteService: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al eliminar servicio');
    return res.json();
  },

  // Products CRUD
  getProducts: async () => {
    const res = await fetch(`${API_BASE}/admin/products`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al crear producto');
    }
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al actualizar producto');
    }
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
    return res.json();
  },

  // Media Library
  uploadMedia: async (files: FileList | File[], altText: string = '') => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('altText', altText);

    const res = await fetch(`${API_BASE}/admin/media/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    if (!res.ok) throw new Error('Error al subir archivos');
    return res.json();
  },

  getMediaItems: async () => {
    const res = await fetch(`${API_BASE}/admin/media`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return [];
    return res.json();
  },

  deleteMediaItem: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al borrar medio');
    return res.json();
  },

  // Reviews CRUD
  getReviews: async () => {
    const res = await fetch(`${API_BASE}/admin/reviews`, { headers: getAuthHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  createReview: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear reseña');
    return res.json();
  },

  updateReview: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/reviews/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar reseña');
    return res.json();
  },

  deleteReview: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/reviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al eliminar reseña');
    return res.json();
  },

  // Commissions Management
  getCommissions: async () => {
    const res = await fetch(`${API_BASE}/admin/commissions`, { headers: getAuthHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  updateCommissionStatus: async (id: string, status: string, notes?: string) => {
    const res = await fetch(`${API_BASE}/admin/commissions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Error al actualizar encargo');
    return res.json();
  },

  deleteCommission: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/commissions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al eliminar encargo');
    return res.json();
  },

  // Duplication & Visibility Helpers
  duplicateProject: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al duplicar obra');
    return res.json();
  },

  toggleProjectVisibility: async (id: string, active: boolean) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}/visibility`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ active })
    });
    if (!res.ok) throw new Error('Error al cambiar visibilidad');
    return res.json();
  },

  duplicateService: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/services/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al duplicar servicio');
    return res.json();
  },

  toggleServiceVisibility: async (id: string, active: boolean) => {
    const res = await fetch(`${API_BASE}/admin/services/${id}/visibility`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ active })
    });
    if (!res.ok) throw new Error('Error al cambiar visibilidad');
    return res.json();
  },

  duplicateProduct: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/products/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Error al duplicar producto');
    return res.json();
  },

  toggleProductVisibility: async (id: string, active: boolean) => {
    const res = await fetch(`${API_BASE}/admin/products/${id}/visibility`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ active })
    });
    if (!res.ok) throw new Error('Error al cambiar visibilidad');
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${API_BASE}/admin/categories`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener categorías');
    return res.json();
  },

  createCategory: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/categories`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al crear categoría');
    return res.json();
  },

  updateCategory: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    return res.json();
  },

  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/categories/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'Error al eliminar categoría');
    }
    return res.json();
  },

  reorderCategories: async (items: any[]) => {
    const res = await fetch(`${API_BASE}/admin/categories/reorder`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ items }) });
    if (!res.ok) throw new Error('Error al reordenar categorías');
    return res.json();
  },

  reorderProducts: async (items: any[]) => {
    const res = await fetch(`${API_BASE}/admin/products/reorder`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ items }) });
    if (!res.ok) throw new Error('Error al reordenar productos');
    return res.json();
  },

  uploadProductMedia: async (productId: string, files: FileList | File[]) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    const res = await fetch(`${API_BASE}/admin/products/${productId}/media`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    if (!res.ok) throw new Error('Error al subir multimedia del producto');
    return res.json();
  },

  updateProductMedia: async (productId: string, mediaId: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/products/${productId}/media/${mediaId}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al actualizar multimedia');
    return res.json();
  },

  deleteProductMedia: async (productId: string, mediaId: string) => {
    const res = await fetch(`${API_BASE}/admin/products/${productId}/media/${mediaId}`, { method: 'DELETE', headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al eliminar multimedia');
    return res.json();
  },

  getProductReviews: async () => {
    const res = await fetch(`${API_BASE}/admin/product-reviews`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener reseñas de productos');
    return res.json();
  },

  createProductReview: async (productId: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/products/${productId}/reviews`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al crear reseña de producto');
    return res.json();
  },

  updateProductReview: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/product-reviews/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al actualizar reseña de producto');
    return res.json();
  },

  deleteProductReview: async (id: string) => {
    const res = await fetch(`${API_BASE}/admin/product-reviews/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al eliminar reseña de producto');
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${API_BASE}/admin/orders`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al obtener pedidos');
    return res.json();
  },

  updateOrderStatus: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/orders/${id}/status`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Error al actualizar pedido');
    return res.json();
  }
};
