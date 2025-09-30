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
    price: 140,
    originalPrice: 160,
    image: "/product-images/chili-powder.png",
    images: [
      "/product-images/chili-powder.png"
    ],
    description: "Finely ground from premium-quality sun-ripened chillies, delivering vibrant color, rich aroma, and bold flavor to your curries and stir-fries. Our chilli powder is carefully processed to maintain its natural heat and nutritional value.",
    shortDescription: "Premium quality sun-ripened chillies with vibrant color and bold flavor.",
    ingredients: "100% Dried Chillies (Capsicum annuum)",
    benefits: "Rich in vitamins A & C for immunity, contains capsaicin to aid digestion and metabolism, supports cardiovascular health",
    packSizes: [
      { size: "50g", price: 75, weight: 50, stock: 100, sku: "CHP-50" },
      { size: "100g", price: 140, weight: 100, stock: 150, sku: "CHP-100" },
      { size: "250g", price: 340, weight: 250, stock: 80, sku: "CHP-250" },
      { size: "500g", price: 650, weight: 500, stock: 60, sku: "CHP-500" },
      { size: "1kg", price: 1280, weight: 1000, stock: 40, sku: "CHP-1000" }
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
    discount: 13,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 2,
    name: "Saadambara Turmeric Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 590,
    originalPrice: 650,
    image: "/product-images/tumeric-powder.png",
    images: [
      "/product-images/tumeric-powder.png"
    ],
    description: "Golden and fragrant, ground from the finest rhizomes to bring warmth and color to your dishes. Our turmeric powder is known for its high curcumin content and therapeutic properties.",
    shortDescription: "Golden and fragrant turmeric with high curcumin content.",
    ingredients: "100% Turmeric Rhizomes (Curcuma longa)",
    benefits: "Anti-inflammatory properties, supports joint health, aids digestion, natural antioxidant, boosts immunity",
    packSizes: [
      { size: "25g", price: 155, weight: 25, stock: 200, sku: "TUR-25" },
      { size: "50g", price: 300, weight: 50, stock: 180, sku: "TUR-50" },
      { size: "100g", price: 590, weight: 100, stock: 120, sku: "TUR-100" }
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
    discount: 9,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 3,
    name: "Saadambara Curry Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 210,
    originalPrice: 230,
    image: "/product-images/curry-powder.png",
    images: [
      "/product-images/curry-powder.png"
    ],
    description: "A perfect blend of roasted and ground spices, giving your dishes authentic Sri Lankan flavor. This traditional curry powder is made from a secret family recipe passed down through generations.",
    shortDescription: "Traditional blend of roasted spices for authentic Sri Lankan flavor.",
    ingredients: "Coriander, Cumin, Fennel, Fenugreek, Mustard, Turmeric, Cinnamon, Cardamom, Cloves, Black Pepper",
    benefits: "Enhances flavor, aids digestion, contains antioxidants, supports metabolism, traditional recipe",
    packSizes: [
      { size: "50g", price: 110, weight: 50, stock: 120, sku: "CUR-50" },
      { size: "100g", price: 210, weight: 100, stock: 100, sku: "CUR-100" },
      { size: "250g", price: 510, weight: 250, stock: 80, sku: "CUR-250" },
      { size: "500g", price: 1000, weight: 500, stock: 60, sku: "CUR-500" },
      { size: "1kg", price: 1980, weight: 1000, stock: 40, sku: "CUR-1000" }
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
    discount: 9,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 4,
    name: "Saadambara Cinnamon Sticks (C5 Grade)",
    brand: "Saadambara",
    category: "Spices",
    price: 530,
    originalPrice: 580,
    image: "/product-images/cinnamon.png",
    images: [
      "/product-images/cinnamon.png"
    ],
    description: "Delicately rolled from the finest Sri Lankan cinnamon bark, prized for their sweet aroma and smooth texture. Our C5 grade cinnamon is the highest quality available, perfect for both culinary and medicinal use.",
    shortDescription: "Premium C5 grade cinnamon sticks with sweet aroma and smooth texture.",
    ingredients: "100% Cinnamon Bark (Cinnamomum verum)",
    benefits: "Natural sweetener, anti-inflammatory, supports blood sugar control, antimicrobial properties, aids digestion",
    packSizes: [
      { size: "20g", price: 650, weight: 20, stock: 80, sku: "CIN-20" },
      { size: "50g", price: 530, weight: 50, stock: 60, sku: "CIN-50" }
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
    discount: 9,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 5,
    name: "Saadambara Cardamom",
    brand: "Saadambara",
    category: "Spices",
    price: 550,
    originalPrice: 600,
    image: "/product-images/cardamom.png",
    images: [
      "/product-images/cardamom.png"
    ],
    description: "Known as the 'Queen of Spices,' offers a sweet, aromatic flavor that enriches curries, sweets, and teas. Our cardamom is handpicked from the finest plantations and carefully processed to maintain its essential oils.",
    shortDescription: "The 'Queen of Spices' with sweet, aromatic flavor for curries and teas.",
    ingredients: "100% Cardamom Pods (Elettaria cardamomum)",
    benefits: "Digestive aid, freshens breath, anti-inflammatory, supports respiratory health, natural flavor enhancer",
    packSizes: [
      { size: "50g", price: 280, weight: 50, stock: 40, sku: "CAR-50" },
      { size: "100g", price: 550, weight: 100, stock: 30, sku: "CAR-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    stock: 30,
    sku: "CAR-100",
    weight: 100,
    dimensions: { length: 6, width: 4, height: 1 },
    tags: ["queen-spices", "aromatic", "premium", "handpicked"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    discount: 8,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 6,
    name: "Saadambara Cloves",
    brand: "Saadambara",
    category: "Spices",
    price: 550,
    originalPrice: 600,
    image: "/product-images/cloves.png",
    images: [
      "/product-images/cloves.png"
    ],
    description: "Handpicked from the best harvests, adding strong, sweet, and warming flavor to your curries and teas. Our cloves are known for their high eugenol content and medicinal properties.",
    shortDescription: "Handpicked cloves with strong, sweet, and warming flavor.",
    ingredients: "100% Clove Buds (Syzygium aromaticum)",
    benefits: "Antimicrobial properties, pain relief, supports dental health, aids digestion, natural preservative",
    packSizes: [
      { size: "50g", price: 280, weight: 50, stock: 80, sku: "CLO-50" },
      { size: "100g", price: 550, weight: 100, stock: 60, sku: "CLO-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.6,
    reviews: 78,
    inStock: true,
    stock: 60,
    sku: "CLO-100",
    weight: 100,
    dimensions: { length: 6, width: 4, height: 1 },
    tags: ["handpicked", "medicinal", "warming", "antimicrobial"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    discount: 8,
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 7,
    name: "Saadambara Coriander",
    brand: "Saadambara",
    category: "Spices",
    price: 140,
    originalPrice: 150,
    image: "/product-images/coriander.png",
    images: [
      "/product-images/coriander.png"
    ],
    description: "Freshly ground coriander seeds with a citrusy, slightly sweet flavor. Essential for Sri Lankan curries and marinades, adding depth and aroma to your dishes.",
    shortDescription: "Freshly ground coriander with citrusy, slightly sweet flavor.",
    ingredients: "100% Coriander Seeds (Coriandrum sativum)",
    benefits: "Digestive aid, anti-inflammatory, supports heart health, natural antioxidant, enhances flavor",
    packSizes: [
      { size: "50g", price: 80, weight: 50, stock: 120, sku: "COR-50" },
      { size: "100g", price: 140, weight: 100, stock: 100, sku: "COR-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    stock: 100,
    sku: "COR-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["aromatic", "citrusy", "premium", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    discount: 7,
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 8,
    name: "Saadambara Cumin",
    brand: "Saadambara",
    category: "Spices",
    price: 180,
    originalPrice: 200,
    image: "/product-images/cumin.png",
    images: [
      "/product-images/cumin.png"
    ],
    description: "Rich, earthy cumin seeds ground to perfection. Adds warm, nutty flavor to curries, rice dishes, and spice blends. Essential for authentic Sri Lankan cuisine.",
    shortDescription: "Rich, earthy cumin with warm, nutty flavor.",
    ingredients: "100% Cumin Seeds (Cuminum cyminum)",
    benefits: "Digestive aid, iron-rich, supports immune system, anti-inflammatory, enhances metabolism",
    packSizes: [
      { size: "50g", price: 90, weight: 50, stock: 100, sku: "CUM-50" },
      { size: "100g", price: 180, weight: 100, stock: 80, sku: "CUM-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.6,
    reviews: 78,
    inStock: true,
    stock: 80,
    sku: "CUM-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["earthy", "nutty", "premium", "sri-lankan"],
    featured: false,
    bestSeller: true,
    newArrival: false,
    discount: 10,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 9,
    name: "Saadambara Fennel",
    brand: "Saadambara",
    category: "Spices",
    price: 290,
    originalPrice: 320,
    image: "/product-images/fennel.png",
    images: [
      "/product-images/fennel.png"
    ],
    description: "Sweet, licorice-like fennel seeds that add a unique flavor to curries and rice dishes. Known for its digestive properties and aromatic qualities.",
    shortDescription: "Sweet, licorice-like fennel with digestive properties.",
    ingredients: "100% Fennel Seeds (Foeniculum vulgare)",
    benefits: "Digestive aid, freshens breath, supports respiratory health, natural diuretic, enhances flavor",
    packSizes: [
      { size: "50g", price: 140, weight: 50, stock: 90, sku: "FEN-50" },
      { size: "100g", price: 290, weight: 100, stock: 70, sku: "FEN-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.5,
    reviews: 62,
    inStock: true,
    stock: 70,
    sku: "FEN-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["sweet", "licorice", "digestive", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    discount: 9,
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 10,
    name: "Saadambara Garlic Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 300,
    originalPrice: 320,
    image: "/product-images/garlic-powder.png",
    images: [
      "/product-images/garlic-powder.png"
    ],
    description: "Intensely flavored garlic powder made from premium Sri Lankan garlic. Adds robust flavor to curries, marinades, and spice blends without the hassle of peeling fresh garlic.",
    shortDescription: "Intensely flavored garlic powder for robust taste.",
    ingredients: "100% Dried Garlic (Allium sativum)",
    benefits: "Immune support, antimicrobial properties, heart health, natural flavor enhancer, convenient cooking",
    packSizes: [
      { size: "50g", price: 300, weight: 50, stock: 150, sku: "GAR-50" }
    ],
    selectedPackSize: "50g",
    rating: 4.4,
    reviews: 88,
    inStock: true,
    stock: 150,
    sku: "GAR-50",
    weight: 50,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["robust", "convenient", "premium", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    discount: 6,
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 11,
    name: "Saadambara Black Pepper",
    brand: "Saadambara",
    category: "Spices",
    price: 430,
    originalPrice: 480,
    image: "/product-images/pepper.png",
    images: [
      "/product-images/pepper.png"
    ],
    description: "Premium black pepper from Sri Lankan plantations, known as the 'King of Spices.' Adds heat and depth to any dish with its bold, pungent flavor.",
    shortDescription: "Premium black pepper - the 'King of Spices' with bold flavor.",
    ingredients: "100% Black Pepper (Piper nigrum)",
    benefits: "Digestive aid, anti-inflammatory, supports metabolism, natural preservative, enhances flavor",
    packSizes: [
      { size: "50g", price: 220, weight: 50, stock: 80, sku: "PEP-50" },
      { size: "100g", price: 430, weight: 100, stock: 60, sku: "PEP-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.8,
    reviews: 105,
    inStock: true,
    stock: 60,
    sku: "PEP-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["bold", "pungent", "premium", "sri-lankan"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    discount: 10,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 12,
    name: "Saadambara Chilli Pieces",
    brand: "Saadambara",
    category: "Spices",
    price: 430,
    originalPrice: 480,
    image: "/product-images/chilli-pieces.png",
    images: [
      "/product-images/chilli-pieces.png"
    ],
    description: "Dried chilli pieces that add both heat and visual appeal to your dishes. Perfect for tempering, curries, and spice blends where you want to see the chilli pieces.",
    shortDescription: "Dried chilli pieces for heat and visual appeal.",
    ingredients: "100% Dried Chilli Pieces (Capsicum annuum)",
    benefits: "Rich in vitamins A & C, adds heat and color, natural preservative, enhances visual appeal",
    packSizes: [
      { size: "50g", price: 220, weight: 50, stock: 100, sku: "CHP-50" },
      { size: "100g", price: 430, weight: 100, stock: 80, sku: "CHP-100" }
    ],
    selectedPackSize: "100g",
    rating: 4.3,
    reviews: 72,
    inStock: true,
    stock: 80,
    sku: "CHP-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["spicy", "visual", "premium", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    discount: 10,
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 13,
    name: "Saadambara Curry Leaves Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 300,
    originalPrice: 320,
    image: "/product-images/curry-leaves-powder.png",
    images: [
      "/product-images/curry-leaves-powder.png"
    ],
    description: "Finely ground curry leaves that capture the authentic flavor of Sri Lankan cuisine. Essential for tempering and adding that distinctive curry leaf aroma to your dishes.",
    shortDescription: "Finely ground curry leaves for authentic Sri Lankan flavor.",
    ingredients: "100% Dried Curry Leaves (Murraya koenigii)",
    benefits: "Digestive aid, anti-inflammatory, supports hair health, natural flavor enhancer, traditional ingredient",
    packSizes: [
      { size: "30g", price: 300, weight: 30, stock: 120, sku: "CLP-30" }
    ],
    selectedPackSize: "30g",
    rating: 4.6,
    reviews: 58,
    inStock: true,
    stock: 120,
    sku: "CLP-30",
    weight: 30,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["traditional", "aromatic", "premium", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    discount: 6,
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 14,
    name: "Saadambara Pandan Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 300,
    originalPrice: 320,
    image: "/product-images/pandan-powder.png",
    images: [
      "/product-images/pandan-powder.png"
    ],
    description: "Fragrant pandan powder that adds a unique, sweet aroma to rice dishes, desserts, and beverages. A traditional Sri Lankan ingredient that enhances both flavor and color.",
    shortDescription: "Fragrant pandan powder with sweet aroma for rice and desserts.",
    ingredients: "100% Dried Pandan Leaves (Pandanus amaryllifolius)",
    benefits: "Natural flavor enhancer, adds color, traditional ingredient, sweet aroma, versatile cooking",
    packSizes: [
      { size: "30g", price: 300, weight: 30, stock: 80, sku: "PAN-30" }
    ],
    selectedPackSize: "30g",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    stock: 80,
    sku: "PAN-30",
    weight: 30,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["fragrant", "sweet", "traditional", "sri-lankan"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    discount: 6,
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-09-29T00:00:00Z"
  },
  {
    id: 15,
    name: "Saadambara Roasted Curry Powder",
    brand: "Saadambara",
    category: "Spices",
    price: 230,
    originalPrice: 250,
    image: "/product-images/roasted-curry-powder.png",
    images: [
      "/product-images/roasted-curry-powder.png"
    ],
    description: "Premium roasted curry powder with a deep, complex flavor profile. Made from carefully roasted spices that create a rich, aromatic blend perfect for traditional Sri Lankan curries.",
    shortDescription: "Premium roasted curry powder with deep, complex flavor.",
    ingredients: "Roasted Coriander, Cumin, Fennel, Fenugreek, Mustard, Turmeric, Cinnamon, Cardamom, Cloves, Black Pepper",
    benefits: "Rich flavor profile, aids digestion, contains antioxidants, traditional recipe, enhances taste",
    packSizes: [
      { size: "50g", price: 120, weight: 50, stock: 100, sku: "RCP-50" },
      { size: "100g", price: 230, weight: 100, stock: 80, sku: "RCP-100" },
      { size: "250g", price: 560, weight: 250, stock: 60, sku: "RCP-250" },
      { size: "500g", price: 1090, weight: 500, stock: 40, sku: "RCP-500" },
      { size: "1kg", price: 2080, weight: 1000, stock: 30, sku: "RCP-1000" }
    ],
    selectedPackSize: "100g",
    rating: 4.9,
    reviews: 112,
    inStock: true,
    stock: 80,
    sku: "RCP-100",
    weight: 100,
    dimensions: { length: 8, width: 6, height: 2 },
    tags: ["roasted", "complex", "premium", "sri-lankan"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    discount: 8,
    createdAt: "2024-01-25T00:00:00Z",
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
