import type { Service, Project, Product, WorkflowStep, FAQItem } from '../types';

export const mockServices: Service[] = [
  {
    id: 'srv-1',
    slug: 'ilustracion-editorial',
    title: 'Ilustración Editorial & Portadas',
    tagline: 'Arte cautivador para libros, revistas, novelas gráficas y publicaciones digitales.',
    description: 'Servicio especializado en crear piezas conceptuales impactantes para portadas de libros, artículos de prensa y publicaciones de alta calidad. Cada pieza sintetiza la narrativa esencial con un lenguaje visual rico y memorable.',
    category: 'editorial',
    priceFrom: 450,
    currency: '€',
    estimatedDelivery: '2 - 3 semanas',
    deliverables: [
      'Portada completa (Frontal, Lomo y Contraportada en alta resolución 300 DPI)',
      'Archivos TIFF, PDF y PNG listos para imprenta en CMYK',
      'Ilustración aislada en RGB para comunicación digital y promociones',
      'Mockup 3D hiperrealista del libro/revista',
      'Licencia editorial comercial estándar'
    ],
    coverImage: '/srv-editorial.png',
    iconName: 'BookOpen',
    featured: true,
    faq: [
      { question: '¿Incluye el diseño tipográfico del título?', answer: 'Sí, la maquetación tipográfica del título, autor y contraportada está incluida en el paquete completo de portada.' },
      { question: '¿Cuántas propuestas de bocetos recibiré?', answer: 'Entrego 3 conceptos iniciales en blanco y negro con variaciones de composición antes de proceder a la fase de color.' }
    ]
  },
  {
    id: 'srv-2',
    slug: 'branding-personaje',
    title: 'Diseño de Personajes & Mascotas de Marca',
    tagline: 'Crea una identidad inolvidable con un personaje icónico lleno de personalidad.',
    description: 'Desarrollo de personajes originales para marcas, videojuegos, publicaciones infantiles y campañas publicitarias. Construimos la personalidad visual, expresiones y guía de pose completa.',
    category: 'branding',
    priceFrom: 600,
    currency: '€',
    estimatedDelivery: '3 semanas',
    deliverables: [
      'Turnaround de personaje 360° (Frente, Perfil, 3/4, Espalda)',
      'Hoja de expresiones faciales (6 expresiones clave)',
      '3 Poses de acción vectoriales/alta resolución',
      'Guía visual de color y proporciones en PDF',
      'Licencia comercial global e ilimitada'
    ],
    coverImage: '/srv-character.png',
    iconName: 'UserCheck',
    featured: true,
    faq: [
      { question: '¿Recibiré archivos vectoriales?', answer: 'Sí, los personajes de marca se entregan tanto en formato vectorial SVG/AI como en imágenes de alta resolución en PNG sin fondo.' }
    ]
  },
  {
    id: 'srv-3',
    slug: 'arte-digital-concepto',
    title: 'Arte Digital & Concept Art',
    tagline: 'Entornos, ilustraciones clave y narrativa visual para audiovisual y videojuegos.',
    description: 'Creación de piezas conceptuales de alto impacto visual para ambientar producciones audiovisuales, juegos de mesa, colecciones NFT y universos de fantasía o ciencia ficción.',
    category: 'digital-art',
    priceFrom: 550,
    currency: '€',
    estimatedDelivery: '2 - 4 semanas',
    deliverables: [
      'Ilustración Key Art en resolución Ultra-HD 4K / 8K',
      'Desglose de capas organizadas (PSD / Procreate)',
      'Paleta cromática y estudios de iluminación',
      'Derechos de producción y adaptación'
    ],
    coverImage: '/srv-environment.png',
    iconName: 'Sparkles',
    featured: true
  },
  {
    id: 'srv-4',
    slug: 'encargo-personalizado',
    title: 'Comisiones de Arte & Retratos de Autor',
    tagline: 'Piezas únicas y personalizadas elaboradas con técnica mixta o pintura digital.',
    description: 'Ilustraciones únicas por encargo para coleccionistas privados, regalos especiales o retratos estilizados con la firma estética del estudio.',
    category: 'custom-commission',
    priceFrom: 300,
    currency: '€',
    estimatedDelivery: '10 - 15 días',
    deliverables: [
      'Ilustración en alta resolución para impresión artística de fine art',
      'Certificado digital de autenticidad firmado',
      'Vídeo timelapse del proceso de creación (opcional)'
    ],
    coverImage: '/srv-props.png',
    iconName: 'Palette',
    featured: false
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'la-flor-y-la-niebla',
    title: 'La Flor y la Niebla',
    subtitle: 'Portada para novela de fantasía histórica. Una historia sobre recuerdos que florecen incluso entre la niebla.',
    serviceIds: ['srv-1', 'srv-3'],
    coverImage: '/portfolio-hero.png',
    client: 'Editorial Planeta',
    year: '2023',
    software: ['Procreate', 'Adobe Photoshop', 'Clip Studio Paint'],
    role: 'Ilustrador de Portada & Artista Conceptual',
    gallery: [
      '/portfolio-hero.png',
      '/srv-editorial.png',
      '/srv-character.png'
    ],
    description: 'Proyecto integral de diseño de cubierta para la novela de fantasía histórica "La flor y la niebla". El desafío consistía en capturar la atmósfera mística y el contraste entre la luz dorada y las sombras del bosque ancestral.',
    conceptText: 'La protagonista de la historia lleva en su memoria un jardín que solo puede ver ella. La niebla representa lo que ha perdido, mientras que las flores doradas representan los recuerdos que aún la sostienen. Buscamos una atmósfera melancólica, delicada y etérea.',
    resultSummary: 'La primera edición vendió más de 25,000 ejemplares en sus primeros dos meses y fue nominada al Premio Nacional de Diseño Editorial.',
    testimonial: {
      author: 'Elena Rostova',
      role: 'Directora de Arte',
      company: 'Editorial Planeta',
      text: 'Trabajar con el estudio fue fluido, creativo e impecable. Logró transformar pasajes complejos del texto en una imagen de portada inolvidable.'
    },
    featured: true,
    tags: ['Fantástico', 'Editorial', 'Libros', 'Pintura Digital']
  },
  {
    id: 'proj-2',
    slug: 'cronicas-del-destino',
    title: 'Crónicas del Destino',
    subtitle: 'Ilustración interior para saga de fantasía épica',
    serviceIds: ['srv-1', 'srv-2'],
    coverImage: '/srv-environment.png',
    client: 'Editorial Hidra',
    year: '2022',
    software: ['Adobe Illustrator', 'Procreate'],
    role: 'Character Designer & Illustrator',
    gallery: [
      '/srv-environment.png',
      '/srv-concept.png'
    ],
    description: 'Ilustración interior narrativa de escenarios sagrados y templos antiguos.',
    conceptText: 'Líneas limpias y expresivas adaptables para maquetación interior.',
    resultSummary: 'Obra aclamada por la crítica literaria.',
    featured: true,
    tags: ['Character Design', 'Branding', 'Vector']
  },
  {
    id: 'proj-3',
    slug: 'el-jardin-de-los-susurros',
    title: 'El Jardín de los Susurros',
    subtitle: 'Ilustración editorial para revista cultural',
    serviceIds: ['srv-3'],
    coverImage: '/srv-concept.png',
    client: 'Revista Culturama',
    year: '2023',
    software: ['Photoshop', 'Blender 3D'],
    role: 'Key Concept Artist',
    gallery: [
      '/srv-concept.png'
    ],
    description: 'Arte conceptual principal utilizado para la portada de la edición especial N° 45.',
    featured: false,
    tags: ['Sci-Fi', 'Key Art', 'Videojuegos']
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    slug: 'print-bosque-etereo-giclee',
    title: 'Lámina Fine Art "La Flor y la Niebla"',
    price: 45,
    category: 'physical-print',
    isDigital: false,
    description: 'Edición limitada de 50 impresiones Giclée firmadas y numeradas a mano. Impreso en papel Hahnemühle German Etching de 310g con tintas pigmentadas resistentes a la luz.',
    images: [
      '/portfolio-hero.png',
      '/srv-editorial.png'
    ],
    coverImage: '/portfolio-hero.png',
    stock: 12,
    dimensions: 'A3 (29.7 x 42 cm)',
    paperType: 'Hahnemühle 310gsm Cotton Rag',
    featured: true,
    tags: ['Fine Art', 'Edición Limitada', 'Firmado']
  },
  {
    id: 'prod-2',
    slug: 'artbook-reinos-olvidados',
    title: 'Artbook Ilustrado: "Reinos Olvidados"',
    price: 38,
    category: 'physical-print',
    isDigital: false,
    description: 'Libro de arte de tapa dura con 160 páginas a todo color que recopila bocetos, estudios de color y conceptos de la última década del estudio.',
    images: [
      '/srv-editorial.png'
    ],
    coverImage: '/srv-editorial.png',
    stock: 25,
    dimensions: '21 x 28 cm (Hardcover)',
    featured: true,
    tags: ['Artbook', 'Tapa Dura', 'Coleccionista']
  },
  {
    id: 'prod-3',
    slug: 'pack-pinceles-procreate-artesanal',
    title: 'Procreate Brush Set "Master Textures & Ink"',
    price: 18,
    category: 'digital-brush',
    isDigital: true,
    description: 'Set exclusivo de 35 pinceles digitales creados a partir de escaneos de alta definición de grafito tradicional, tinta china y óleo sobre lienzo.',
    images: [
      '/srv-character.png'
    ],
    coverImage: '/srv-character.png',
    digitalFormat: '.brushset (compatible con Procreate 5+)',
    fileSize: '145 MB',
    featured: true,
    tags: ['Digital', 'Pinceles', 'Procreate']
  },
  {
    id: 'prod-4',
    slug: 'original-oil-study-astral',
    title: 'Pintura Original "El Cáliz Arcano"',
    price: 420,
    category: 'original-art',
    isDigital: false,
    description: 'Pieza única original al óleo y hoja de pan de oro sobre panel de madera de arce tratada. Firmado en el frontal y reverso.',
    images: [
      '/srv-props.png'
    ],
    coverImage: '/srv-props.png',
    stock: 1,
    dimensions: '30 x 40 cm',
    featured: false,
    tags: ['Original', 'Óleo', 'Pieza Única']
  }
];

export const mockWorkflowSteps: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Briefing & Descubrimiento',
    duration: '2 - 3 Días',
    description: 'Analizamos tus necesidades visuales, público objetivo, valores de marca y narrativa clave mediante una reunión o cuestionario en profundidad.',
    deliverablesSummary: 'Moodboard de referencia y hoja de ruta del proyecto.'
  },
  {
    stepNumber: 2,
    title: 'Bocetos & Conceptos Iniciales',
    duration: '5 - 7 Días',
    description: 'Exploramos de 3 a 5 composiciones rápidas en blanco y negro (thumbnails) para validar la estructura narrativa y el punto focal.',
    deliverablesSummary: '3 Propuestas conceptuales claras para revisión.'
  },
  {
    stepNumber: 3,
    title: 'Estudio de Color & Detalle',
    duration: '5 - 7 Días',
    description: 'Definimos la paleta cromática exacta, la atmósfera luminosa y añadimos texturas y refinamiento al boceto seleccionado.',
    deliverablesSummary: 'Prueba de color completa en alta resolución.'
  },
  {
    stepNumber: 4,
    title: 'Arte Final & Entrega de Master',
    duration: '2 - 4 Días',
    description: 'Renderizado final en ultra alta definición, optimización para imprenta CMYK o medios digitales RGB y generación de archivos maestros.',
    deliverablesSummary: 'Paquete completo de archivos TIFF/PDF/PNG y licencias.'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'portfolio',
    question: '¿Cómo puedo solicitar un presupuesto para mi proyecto?',
    answer: 'Puedes rellenar directamente nuestro formulario interactivo en la sección "Solicitar Presupuesto" o enviarnos un email detallado a contacto@ilustrisimamaestra.com. Te responderemos en un plazo máximo de 24 a 48 horas laborables.'
  },
  {
    id: 'faq-2',
    category: 'contracts',
    question: '¿Quién posee los derechos de autor sobre la ilustración final?',
    answer: 'Como autor, mantengo los derechos morales sobre la obra. Al cliente se le otorga una licencia de explotación comercial exclusiva adaptada al soporte, territorio y duración acordados en el contrato firmado.'
  },
  {
    id: 'faq-3',
    category: 'process',
    question: '¿Cuántas revisiones están incluidas en cada encargo?',
    answer: 'Cada paquete incluye 2 rondas de revisiones mayores en la fase de boceto y 2 rondas de ajustes menores en la fase de color final. Cambios estructurales solicitados tras la aprobación del boceto se cotizan por separado.'
  },
  {
    id: 'faq-4',
    category: 'store',
    question: '¿Hacéis envíos internacionales para los productos físicos?',
    answer: '¡Sí! Realizamos envíos seguros con número de seguimiento a todo el mundo. Las láminas se envían protegidas en tubos rígidos de cartón kraft reforzado.'
  },
  {
    id: 'faq-5',
    category: 'store',
    question: '¿Cómo recibo los productos digitales comprados en la tienda?',
    answer: 'Tras completar el pago, recibirás de forma inmediata un enlace de descarga segura en tu correo electrónico con validez permanente.'
  }
];
