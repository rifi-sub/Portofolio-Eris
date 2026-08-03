// TypeScript Interfaces for Artisan Portfolio & Shop

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'editorial' | 'branding' | 'digital-art' | 'custom-commission' | 'mural';
  priceFrom: number;
  currency?: string;
  estimatedDelivery?: string;
  deliverables: string[];
  coverImage: string;
  iconName?: string;
  featured?: boolean;
  faq?: { question: string; answer: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  serviceIds: string[]; // Association to multiple services (many-to-many)
  coverImage: string;
  // Optional project fields (conditionally rendered in UI)
  subtitle?: string;
  client?: string;
  year?: string | number;
  software?: string[];
  role?: string;
  gallery?: string[];
  description?: string;
  conceptText?: string;
  resultSummary?: string;
  testimonial?: {
    author: string;
    role: string;
    company?: string;
    text: string;
    avatarUrl?: string;
  };
  featured?: boolean;
  tags?: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: string;
  isDigital: boolean;
  description: string;
  images: string[];
  coverImage: string;
  stock?: number;
  dimensions?: string;
  paperType?: string;
  digitalFormat?: string;
  fileSize?: string;
  featured?: boolean;
  tags?: string[];
  active?: boolean;
  order?: number;
  categoryId?: string;
  productCategory?: ProductCategory;
  media?: ProductMedia[];
  reviews?: ProductReview[];
  averageRating?: number;
  reviewCount?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active?: boolean;
  order?: number;
  _count?: { products: number };
}

export interface ProductMedia {
  id?: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  mimeType?: string;
  altText?: string;
  caption?: string;
  order?: number;
  isCover?: boolean;
}

export interface ProductReview {
  id: string;
  productId?: string;
  author: string;
  rating: number;
  text: string;
  active?: boolean;
  order?: number;
  createdAt?: string;
  media?: ProductMedia[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  deliverablesSummary: string;
  iconName?: string;
}

export interface ServiceQuoteRequest {
  clientName: string;
  email: string;
  companyName?: string;
  serviceId?: string;
  projectType: string;
  budgetRange: string;
  deadline?: string;
  description: string;
  attachmentsNote?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'portfolio' | 'store' | 'contracts' | 'process';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}
