// Mock data for products
export const featuredProducts = [
  {
    id: '1',
    name: 'Modern Lounge Chair',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg',
    description: 'A modern lounge chair with soft fabric upholstery and wooden legs. Perfect for your living room or reading nook.',
    rating: 4.5,
    categoryId: 'chairs',
    colors: ['#3C4043', '#E9EBED', '#D3A28C'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg',
      'https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg'
    ]
  },
  {
    id: '2',
    name: 'Minimalist Coffee Table',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    description: 'A sleek minimalist coffee table with a sturdy wooden top and metal legs. The perfect centerpiece for your living room.',
    rating: 4.2,
    categoryId: 'tables',
    colors: ['#CBAE89', '#3C4043', '#E9EBED'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg',
      'https://images.pexels.com/photos/4846461/pexels-photo-4846461.jpeg'
    ]
  },
  {
    id: '3',
    name: 'Scandinavian Sofa',
    price: 599.99,
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
    description: 'A comfortable three-seater sofa with Scandinavian design principles. Features high-quality fabric upholstery and solid wood frame.',
    rating: 4.7,
    categoryId: 'sofas',
    colors: ['#E9EBED', '#3C4043', '#B8BDAB'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/6580227/pexels-photo-6580227.jpeg',
      'https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg'
    ]
  },
  {
    id: '4',
    name: 'Elegant Dining Table',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg',
    description: 'An elegant dining table that seats six people comfortably. Made from solid oak with a natural finish that showcases the wood grain.',
    rating: 4.3,
    categoryId: 'tables',
    colors: ['#CBAE89', '#3C4043'],
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/6207764/pexels-photo-6207764.jpeg',
      'https://images.pexels.com/photos/6207818/pexels-photo-6207818.jpeg'
    ]
  },
  {
    id: '5',
    name: 'Modern Platform Bed',
    price: 499.99,
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
    description: 'A modern platform bed with a padded headboard and minimalist design. Includes sturdy slats, eliminating the need for a box spring.',
    rating: 4.6,
    categoryId: 'beds',
    colors: ['#3C4043', '#E9EBED', '#CBAE89'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg',
      'https://images.pexels.com/photos/6585602/pexels-photo-6585602.jpeg'
    ]
  }
];

export const categories = [
  {
    id: 'sofas',
    name: 'Sofas',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'
  },
  {
    id: 'chairs',
    name: 'Chairs',
    image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg'
  },
  {
    id: 'tables',
    name: 'Tables',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
  },
  {
    id: 'beds',
    name: 'Beds',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
  },
  {
    id: 'storage',
    name: 'Storage',
    image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg'
  }
];

// Combine featured products with additional products for the full catalog
export const allProducts = [
  ...featuredProducts,
  {
    id: '6',
    name: 'Wingback Armchair',
    price: 299.99,
    image: 'https://images.pexels.com/photos/6539772/pexels-photo-6539772.jpeg',
    description: 'A classic wingback armchair with modern touches. Features high-quality fabric upholstery and comfortable padding.',
    rating: 4.4,
    categoryId: 'chairs',
    colors: ['#E9EBED', '#3C4043', '#D3A28C'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/6489096/pexels-photo-6489096.jpeg',
      'https://images.pexels.com/photos/6489097/pexels-photo-6489097.jpeg'
    ]
  },
  {
    id: '7',
    name: 'Modern Sideboard',
    price: 399.99,
    image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
    description: 'A spacious sideboard with plenty of storage for your dining room or living room. Features clean lines and minimalist hardware.',
    rating: 4.2,
    categoryId: 'storage',
    colors: ['#CBAE89', '#3C4043', '#E9EBED'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg',
      'https://images.pexels.com/photos/4210809/pexels-photo-4210809.jpeg'
    ]
  },
  {
    id: '8',
    name: 'Pendant Light',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg',
    description: 'A stylish pendant light with a clean, modern design. Perfect for dining rooms, kitchens, or entryways.',
    rating: 4.0,
    categoryId: 'lighting',
    colors: ['#3C4043', '#CBAE89', '#E9EBED'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/6492398/pexels-photo-6492398.jpeg',
      'https://images.pexels.com/photos/6492401/pexels-photo-6492401.jpeg'
    ]
  },
  {
    id: '9',
    name: 'Modern Sectional Sofa',
    price: 899.99,
    image: 'https://images.pexels.com/photos/6489118/pexels-photo-6489118.jpeg',
    description: 'A spacious sectional sofa perfect for family rooms and entertainment spaces. Features modular design and high-quality upholstery.',
    rating: 4.8,
    categoryId: 'sofas',
    colors: ['#3C4043', '#E9EBED', '#B8BDAB'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/6489104/pexels-photo-6489104.jpeg',
      'https://images.pexels.com/photos/6489105/pexels-photo-6489105.jpeg'
    ]
  },
  {
    id: '10',
    name: 'Bedside Table',
    price: 149.99,
    image: 'https://images.pexels.com/photos/6207827/pexels-photo-6207827.jpeg',
    description: 'A stylish bedside table with drawer storage. The perfect companion to your bed, with room for all your nighttime essentials.',
    rating: 4.3,
    categoryId: 'tables',
    colors: ['#CBAE89', '#3C4043', '#E9EBED'],
    featured: false,
    gallery: [
      'https://images.pexels.com/photos/6207826/pexels-photo-6207826.jpeg',
      'https://images.pexels.com/photos/6207828/pexels-photo-6207828.jpeg'
    ]
  }
];