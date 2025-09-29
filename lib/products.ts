export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  ingredients: string;
  benefits: string;
  packSizes: PackSize[];
  selectedPackSize: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stock: number;
  sku: string;
  weight: number; // in grams
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PackSize {
  size: string;
  price: number;
  weight: number;
  stock: number;
  sku: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  quantity: number;
  packSize: string;
  sku: string;
  weight: number;
  maxQuantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Saadambara Chilli Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 450,
    originalPrice: 550,
    image: "/sri-lankan-spices.png",
    images: [
      "/sri-lankan-spices.png",
      "/ceylon-turmeric-powder.png",
      "/sri-lankan-spice-market.png"
    ],
    description: "Finely ground from premium-quality sun-ripened chillies, delivering vibrant color, rich aroma, and bold flavor to your curries and stir-fries. Our chilli powder is carefully processed to maintain its natural heat and nutritional value.",
    shortDescription: "Premium quality sun-ripened chillies with vibrant color and bold flavor.",
    ingredients: "100% Dried Chillies (Capsicum annuum)",
    benefits: "Rich in vitamins A & C for immunity, contains capsaicin to aid digestion and metabolism, supports cardiovascular health",
    packSizes: [
      { size: "50g", price: 250, weight: 50, stock: 100, sku: "CHP-50" },
      { size: "100g", price: 450, weight: 100, stock: 150, sku: "CHP-100" },
      { size: "250g", price: 1000, weight: 250, stock: 80, sku: "CHP-250" },
      { size: "500g", price: 1800, weight: 500, stock: 60, sku: "CHP-500" },
      { size: "1kg", price: 3200, weight: 1000, stock: 40, sku: "CHP-1000" }
    ],
    selectedPackSize: "100g",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stock: 150,
    sku: "CHP-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["spicy", "premium", "authentic", "sri-lankan"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    discount: 18,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 2,
    name: "Saadambara Turmeric Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 380,
    originalPrice: 450,
    image: "/ceylon-turmeric-powder.png",
    images: [
      "/ceylon-turmeric-powder.png",
      "/sri-lankan-spices.png",
      "/sri-lankan-herbal-plants.png"
    ],
    description: "Golden and fragrant, ground from the finest rhizomes to bring warmth and color to your dishes. Our turmeric powder is known for its high curcumin content and therapeutic properties.",
    shortDescription: "Golden and fragrant turmeric with high curcumin content.",
    ingredients: "100% Turmeric Rhizomes (Curcuma longa)",
    benefits: "Anti-inflammatory properties, supports joint health, aids digestion, natural antioxidant, boosts immunity",
    packSizes: [
      { size: "25g", price: 120, weight: 25, stock: 200, sku: "TUR-25" },
      { size: "50g", price: 220, weight: 50, stock: 180, sku: "TUR-50" },
      { size: "100g", price: 380, weight: 100, stock: 120, sku: "TUR-100" },
      { size: "250g", price: 850, weight: 250, stock: 90, sku: "TUR-250" },
      { size: "500g", price: 1600, weight: 500, stock: 70, sku: "TUR-500" },
      { size: "1kg", price: 3000, weight: 1000, stock: 50, sku: "TUR-1000" }
    ],
    selectedPackSize: "100g",
    rating: 4.9,
    reviews: 98,
    inStock: true,
    stock: 120,
    sku: "TUR-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["healthy", "anti-inflammatory", "golden", "therapeutic"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    discount: 16,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 3,
    name: "Saadambara Curry Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 520,
    originalPrice: 620,
    image: "/sri-lankan-spices.png",
    images: [
      "/sri-lankan-spices.png",
      "/sri-lankan-spice-market.png",
      "/ceylon-turmeric-powder.png"
    ],
    description: "A perfect blend of roasted and ground spices, giving your dishes authentic Sri Lankan flavor. This traditional curry powder is made from a secret family recipe passed down through generations.",
    shortDescription: "Traditional blend of roasted spices for authentic Sri Lankan flavor.",
    ingredients: "Coriander, Cumin, Fennel, Fenugreek, Mustard, Turmeric, Cinnamon, Cardamom, Cloves, Black Pepper",
    benefits: "Enhances flavor, aids digestion, contains antioxidants, supports metabolism, traditional recipe",
    packSizes: [
      { size: "50g", price: 280, weight: 50, stock: 120, sku: "CUR-50" },
      { size: "100g", price: 520, weight: 100, stock: 100, sku: "CUR-100" },
      { size: "250g", price: 1200, weight: 250, stock: 80, sku: "CUR-250" },
      { size: "500g", price: 2200, weight: 500, stock: 60, sku: "CUR-500" },
      { size: "1kg", price: 4000, weight: 1000, stock: 40, sku: "CUR-1000" }
    ],
    selectedPackSize: "100g",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stock: 100,
    sku: "CUR-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["traditional", "blend", "authentic", "family-recipe"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    discount: 16,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 4,
    name: "Saadambara Cinnamon Sticks (C5 Grade)",
    brand: "Saadambara",
    category: "Spices",
    price: 680,
    originalPrice: 780,
    image: "/ceylon-cinnamon-sticks.png",
    images: [
      "/ceylon-cinnamon-sticks.png",
      "/sri-lankan-spices.png",
      "/sri-lankan-tea-plantation.png"
    ],
    description: "Delicately rolled from the finest Sri Lankan cinnamon bark, prized for their sweet aroma and smooth texture. Our C5 grade cinnamon is the highest quality available, perfect for both culinary and medicinal use.",
    shortDescription: "Premium C5 grade cinnamon sticks with sweet aroma and smooth texture.",
    ingredients: "100% Cinnamon Bark (Cinnamomum verum)",
    benefits: "Natural sweetener, anti-inflammatory, supports blood sugar control, antimicrobial properties, aids digestion",
    packSizes: [
      { size: "25g", price: 350, weight: 25, stock: 80, sku: "CIN-25" },
      { size: "50g", price: 680, weight: 50, stock: 60, sku: "CIN-50" },
      { size: "100g", price: 1200, weight: 100, stock: 40, sku: "CIN-100" }
    ],
    selectedPackSize: "50g",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    stock: 60,
    sku: "CIN-50",
    weight: 50,
    dimensions: { length: 12, width: 2, height: 1 },
    tags: ["premium", "c5-grade", "sweet", "medicinal"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    discount: 13,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 5,
    name: "Saadambara Cardamom",
    brand: "Saadambara",
    category: "Spices",
    price: 1200,
    originalPrice: 1400,
    image: "/sri-lankan-spices.png",
    images: [
      "/sri-lankan-spices.png",
      "/sri-lankan-herbal-plants.png",
      "/ceylon-cinnamon-sticks.png"
    ],
    description: "Known as the 'Queen of Spices,' offers a sweet, aromatic flavor that enriches curries, sweets, and teas. Our cardamom is handpicked from the finest plantations and carefully processed to maintain its essential oils.",
    shortDescription: "The 'Queen of Spices' with sweet, aromatic flavor for curries and teas.",
    ingredients: "100% Cardamom Pods (Elettaria cardamomum)",
    benefits: "Digestive aid, freshens breath, anti-inflammatory, supports respiratory health, natural flavor enhancer",
    packSizes: [
      { size: "25g", price: 600, weight: 25, stock: 50, sku: "CAR-25" },
      { size: "50g", price: 1200, weight: 50, stock: 40, sku: "CAR-50" },
      { size: "100g", price: 2200, weight: 100, stock: 30, sku: "CAR-100" }
    ],
    selectedPackSize: "25g",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    stock: 50,
    sku: "CAR-25",
    weight: 25,
    dimensions: { length: 6, width: 4, height: 1 },
    tags: ["queen-spices", "aromatic", "premium", "handpicked"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    discount: 14,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 6,
    name: "Saadambara Cloves",
    brand: "Saadambara",
    category: "Spices",
    price: 750,
    originalPrice: 850,
    image: "/sri-lankan-spices.png",
    images: [
      "/sri-lankan-spices.png",
      "/sri-lankan-spice-market.png",
      "/ceylon-cinnamon-sticks.png"
    ],
    description: "Handpicked from the best harvests, adding strong, sweet, and warming flavor to your curries and teas. Our cloves are known for their high eugenol content and medicinal properties.",
    shortDescription: "Handpicked cloves with strong, sweet, and warming flavor.",
    ingredients: "100% Clove Buds (Syzygium aromaticum)",
    benefits: "Antimicrobial properties, pain relief, supports dental health, aids digestion, natural preservative",
    packSizes: [
      { size: "25g", price: 400, weight: 25, stock: 100, sku: "CLO-25" },
      { size: "50g", price: 750, weight: 50, stock: 80, sku: "CLO-50" },
      { size: "100g", price: 1400, weight: 100, stock: 60, sku: "CLO-100" },
      { size: "250g", price: 3200, weight: 250, stock: 40, sku: "CLO-250" }
    ],
    selectedPackSize: "50g",
    rating: 4.6,
    reviews: 78,
    inStock: true,
    stock: 80,
    sku: "CLO-50",
    weight: 50,
    dimensions: { length: 6, width: 4, height: 1 },
    tags: ["handpicked", "medicinal", "warming", "antimicrobial"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    discount: 12,
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  }
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(product => product.featured);
}

export function getBestSellingProducts(): Product[] {
  return PRODUCTS.filter(product => product.bestSeller);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(product => product.newArrival);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getPackSizePrice(product: Product, packSize: string): number {
  const pack = product.packSizes.find(p => p.size === packSize);
  return pack ? pack.price : product.price;
}

export function getPackSizeStock(product: Product, packSize: string): number {
  const pack = product.packSizes.find(p => p.size === packSize);
  return pack ? pack.stock : product.stock;
}

export function isProductInStock(product: Product, packSize: string, quantity: number): boolean {
  const stock = getPackSizeStock(product, packSize);
  return stock >= quantity;
}
