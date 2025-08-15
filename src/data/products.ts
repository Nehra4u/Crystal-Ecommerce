import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'raw-crystals',
    name: 'Raw Crystals',
    slug: 'raw-crystals',
    image: '/images/categories/raw-crystals.jpg',
    subcategories: [
      { id: 'quartz', name: 'Quartz', slug: 'quartz', image: '/images/categories/quartz.jpg' },
      { id: 'amethyst', name: 'Amethyst', slug: 'amethyst', image: '/images/categories/amethyst.jpg' },
      { id: 'citrine', name: 'Citrine', slug: 'citrine', image: '/images/categories/citrine.jpg' },
    ]
  },
  {
    id: 'polished-stones',
    name: 'Polished Stones',
    slug: 'polished-stones',
    image: '/images/categories/polished-stones.jpg',
    subcategories: [
      { id: 'spheres', name: 'Spheres', slug: 'spheres', image: '/images/categories/spheres.jpg' },
      { id: 'hearts', name: 'Hearts', slug: 'hearts', image: '/images/categories/hearts.jpg' },
      { id: 'pyramids', name: 'Pyramids', slug: 'pyramids', image: '/images/categories/pyramids.jpg' },
    ]
  },
  {
    id: 'jewelry',
    name: 'Crystal Jewelry',
    slug: 'jewelry',
    image: '/images/categories/jewelry.jpg',
    subcategories: [
      { id: 'necklaces', name: 'Necklaces', slug: 'necklaces', image: '/images/categories/necklaces.jpg' },
      { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', image: '/images/categories/bracelets.jpg' },
      { id: 'rings', name: 'Rings', slug: 'rings', image: '/images/categories/rings.jpg' },
    ]
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    slug: 'home-decor',
    image: '/images/categories/home-decor.jpg',
    subcategories: [
      { id: 'geodes', name: 'Geodes', slug: 'geodes', image: '/images/categories/geodes.jpg' },
      { id: 'bookends', name: 'Bookends', slug: 'bookends', image: '/images/categories/bookends.jpg' },
      { id: 'lamps', name: 'Crystal Lamps', slug: 'lamps', image: '/images/categories/lamps.jpg' },
    ]
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Velká ametystová drúza Brazílie',
    description: 'Nádherná velká ametystová drúza z Brazílie. Ideální pro meditaci a energetické léčení. Tento úžasný kus obsahuje hluboce fialové krystaly s vynikající čistotou.',
    price: 4890,
    originalPrice: 6450,
    discount: 24,
    images: [
      '/images/products/amethyst-cluster-1.jpg',
      '/images/products/amethyst-cluster-2.jpg',
      '/images/products/amethyst-cluster-3.jpg'
    ],
    category: 'raw-crystals',
    subcategory: 'amethyst',
    inStock: true,
    weight: '2.5kg',
    origin: 'Brazílie',
    properties: ['Duchovní růst', 'Uklidnění', 'Ochrana'],
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Růženínové srdce extra kvalita',
    description: 'Ručně vyřezané růženínové srdce, symbol bezpodmínečné lásky. Ideální pro vztahy a praktiky sebelásky.',
    price: 1190,
    images: [
      '/images/products/rose-quartz-heart-1.jpg',
      '/images/products/rose-quartz-heart-2.jpg'
    ],
    category: 'polished-stones',
    subcategory: 'hearts',
    inStock: true,
    weight: '350g',
    origin: 'Madagaskar',
    properties: ['Láska', 'Emoční léčení', 'Péče o sebe'],
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isFeatured: false
  },
  {
    id: '3',
    name: 'Křišťálová koule čirý křišťál AAA',
    description: 'Prémiová koule z čirého křišťálu s výjimečnou čistotou. Zesiluje energii a přináší jasnost myšlenkám a záměrům.',
    price: 2050,
    originalPrice: 2490,
    discount: 18,
    images: [
      '/images/products/clear-quartz-sphere-1.jpg',
      '/images/products/clear-quartz-sphere-2.jpg',
      '/images/products/clear-quartz-sphere-3.jpg'
    ],
    category: 'polished-stones',
    subcategory: 'spheres',
    inStock: true,
    weight: '1.2kg',
    origin: 'Arkansas, USA',
    properties: ['Zesílení', 'Jasnost', 'Léčení'],
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Citrínová pyramida zlatá Brazílie',
    description: 'Zlatá citrínová pyramida pro hojnost a prosperitu. Přírodní citrín z Brazílie s krásnými zlatými odstíny.',
    price: 3260,
    images: [
      '/images/products/citrine-pyramid-1.jpg',
      '/images/products/citrine-pyramid-2.jpg'
    ],
    category: 'polished-stones',
    subcategory: 'pyramids',
    inStock: true,
    weight: '800g',
    origin: 'Brazílie',
    properties: ['Hojnost', 'Prosperita', 'Radost'],
    rating: 4.6,
    reviews: 67,
    isNew: true,
    isFeatured: false
  },
  {
    id: '5',
    name: 'Ametystový náhrdelník stříbro 925',
    description: 'Elegantní ametystový přívěsek ve stříbře 925. Ideální pro každodenní nošení a duchovní ochranu.',
    price: 2330,
    originalPrice: 3140,
    discount: 26,
    images: [
      '/images/products/amethyst-necklace-1.jpg',
      '/images/products/amethyst-necklace-2.jpg'
    ],
    category: 'jewelry',
    subcategory: 'necklaces',
    inStock: true,
    weight: '25g',
    origin: 'Uruguay',
    properties: ['Ochrana', 'Intuice', 'Jasnost'],
    rating: 4.8,
    reviews: 203,
    isNew: false,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Black Tourmaline Bracelet',
    description: 'Protective black tourmaline bracelet with 8mm beads. Excellent for EMF protection and grounding.',
    price: 34.99,
    images: [
      '/images/products/black-tourmaline-bracelet-1.jpg',
      '/images/products/black-tourmaline-bracelet-2.jpg'
    ],
    category: 'jewelry',
    subcategory: 'bracelets',
    inStock: true,
    weight: '15g',
    origin: 'Brazil',
    properties: ['Protection', 'Grounding', 'EMF Shield'],
    rating: 4.5,
    reviews: 145,
    isNew: false,
    isFeatured: false
  },
  {
    id: '7',
    name: 'Labradorite Ring',
    description: 'Stunning labradorite ring with blue flash. Set in sterling silver with adjustable band.',
    price: 65.99,
    images: [
      '/images/products/labradorite-ring-1.jpg',
      '/images/products/labradorite-ring-2.jpg'
    ],
    category: 'jewelry',
    subcategory: 'rings',
    inStock: false,
    weight: '8g',
    origin: 'Madagascar',
    properties: ['Transformation', 'Magic', 'Protection'],
    rating: 4.7,
    reviews: 78,
    isNew: true,
    isFeatured: false
  },
  {
    id: '8',
    name: 'Achátové geody podpěry knih pár',
    description: 'Pár přírodních achátových geod jako podpěry knih. Krásné fialové a bílé krystaly ideální pro domov nebo kancelář.',
    price: 4070,
    originalPrice: 5190,
    discount: 22,
    images: [
      '/images/products/agate-bookends-1.jpg',
      '/images/products/agate-bookends-2.jpg',
      '/images/products/agate-bookends-3.jpg'
    ],
    category: 'home-decor',
    subcategory: 'bookends',
    inStock: true,
    weight: '3.2kg',
    origin: 'Brazílie',
    properties: ['Rovnováha', 'Stabilita', 'Soustředění'],
    rating: 4.9,
    reviews: 92,
    isNew: false,
    isFeatured: true
  }
];
