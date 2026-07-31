import type { Service, Project, Product, WorkflowStep, FAQItem } from '../types';
import { mockServices, mockProjects, mockProducts, mockWorkflowSteps, mockFAQs } from '../data/mockData';

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'http://178.105.243.10:5000/api/portfolio';
  }
  return 'http://localhost:5000/api/portfolio';
};

const API_BASE = getApiBase();

// Helper genérico para peticiones con fallback
async function fetchWithFallback<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data as T;
  } catch (err) {
    console.warn(`[portfolioApi] Error cargando desde API (${url}), usando fallback datos locales:`, err);
    return fallback;
  }
}

export interface ContentSection {
  id: string;
  page: string;
  sectionKey: string;
  title?: string;
  subtitle?: string;
  content?: string;
  images?: string;
  metadata?: string;
}

// Transformadores para desempaquetar JSON strings de Prisma si aplica
function parseProject(p: any): Project {
  return {
    ...p,
    serviceIds: typeof p.serviceIds === 'string' ? JSON.parse(p.serviceIds || '[]') : (p.serviceIds || []),
    software: typeof p.software === 'string' ? JSON.parse(p.software || '[]') : (p.software || []),
    gallery: typeof p.gallery === 'string' ? JSON.parse(p.gallery || '[]') : (p.gallery || []),
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags || '[]') : (p.tags || []),
    testimonial: p.testimonialAuthor ? {
      author: p.testimonialAuthor,
      role: p.testimonialRole || '',
      company: p.testimonialCompany || '',
      text: p.testimonialText || ''
    } : p.testimonial
  };
}

function parseService(s: any): Service {
  return {
    ...s,
    deliverables: typeof s.deliverables === 'string' ? JSON.parse(s.deliverables || '[]') : (s.deliverables || [])
  };
}

function parseProduct(p: any): Product {
  return {
    ...p,
    images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : (p.images || []),
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags || '[]') : (p.tags || [])
  };
}

export const portfolioApi = {
  // --- PÚBLICO ---
  getProjects: async (): Promise<Project[]> => {
    const raw = await fetchWithFallback<any[]>(`${API_BASE}/projects`, mockProjects);
    return raw.map(parseProject);
  },

  getProjectBySlug: async (slug: string): Promise<Project | undefined> => {
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`);
      if (res.ok) {
        const raw = await res.json();
        return parseProject(raw);
      }
    } catch (e) {
      // ignore
    }
    return mockProjects.find(p => p.slug === slug);
  },

  getServices: async (): Promise<Service[]> => {
    const raw = await fetchWithFallback<any[]>(`${API_BASE}/services`, mockServices);
    return raw.map(parseService);
  },

  getServiceBySlug: async (slug: string): Promise<Service | undefined> => {
    try {
      const res = await fetch(`${API_BASE}/services/${slug}`);
      if (res.ok) {
        const raw = await res.json();
        return parseService(raw);
      }
    } catch (e) {
      // ignore
    }
    return mockServices.find(s => s.slug === slug);
  },

  getProducts: async (): Promise<Product[]> => {
    const raw = await fetchWithFallback<any[]>(`${API_BASE}/products`, mockProducts);
    return raw.map(parseProduct);
  },

  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (res.ok) {
        const raw = await res.json();
        return parseProduct(raw);
      }
    } catch (e) {
      // ignore
    }
    return mockProducts.find(p => p.slug === slug);
  },

  getWorkflowSteps: async (): Promise<WorkflowStep[]> => {
    return fetchWithFallback<WorkflowStep[]>(`${API_BASE}/workflow`, mockWorkflowSteps);
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    return fetchWithFallback<FAQItem[]>(`${API_BASE}/faqs`, mockFAQs);
  },

  getContentSection: async (sectionKey: string, defaultSection?: Partial<ContentSection>): Promise<Partial<ContentSection>> => {
    try {
      const res = await fetch(`${API_BASE}/content/${sectionKey}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
    return defaultSection || {};
  }
};
