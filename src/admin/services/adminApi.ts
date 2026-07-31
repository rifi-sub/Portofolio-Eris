const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://alilyback.duckdns.org/eris/api/portfolio';
  }
  return 'http://localhost:5000/api/portfolio';
};

const API_BASE = getApiBase();

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
    if (!res.ok) throw new Error('Error al crear obra');
    return res.json();
  },

  updateProject: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar obra');
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
  createProduct: async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear producto');
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
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
  }
};
