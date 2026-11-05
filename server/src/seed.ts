import Category from './models/Category';
import Product from './models/Product';

const categoriesData = [
  { name: 'Oud Collection', slug: 'oud-collection', description: 'Rich, opulent oud-based fragrances inspired by Pakistani heritage', sortOrder: 1 },
  { name: 'Fresh & Floral', slug: 'fresh-floral', description: 'Light, elegant florals and fresh compositions for everyday wear', sortOrder: 2 },
  { name: 'Signature Blends', slug: 'signature-blends', description: 'Exclusive masterpieces crafted for the discerning connoisseur', sortOrder: 3 },
];

interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  categorySlug: string;
  images?: string[];
  notes: { top: string[]; middle: string[]; base: string[] };
  size: number;
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
}

const productsData: SeedProduct[] = [
  // Oud Collection
  {
    name: 'Royal Oud',
    slug: 'royal-oud',
    description: 'A majestic blend of rare Cambodian oud, layered with saffron and Turkish rose. This commanding fragrance opens with a burst of bergamot and pink pepper before revealing its heart of aged oud wood and Damascus rose. The dry-down settles into an intoxicating base of amber, sandalwood, and musk that lingers for hours.',
    shortDescription: 'Majestic Cambodian oud with saffron and Turkish rose',
    price: 8500,
    comparePrice: 11000,
    categorySlug: 'oud-collection',
    images: ['uploads/1791519976291_ScentoraX_Purple_Luxury_Fragrance_Ad-upload.webp'],
    notes: { top: ['Bergamot', 'Pink Pepper'], middle: ['Oud Wood', 'Damascus Rose'], base: ['Amber', 'Sandalwood', 'Musk'] },
    size: 100,
    stock: 50,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
  },
  {
    name: 'Midnight Lahore',
    slug: 'midnight-lahore',
    description: 'Inspired by the mystique of Lahore at midnight. A dark, seductive fragrance that captures the essence of ancient streets lit by lanterns. Rich oud intertwines with smoky incense and sweet dates, creating an unforgettable olfactory journey through time.',
    shortDescription: 'Dark, seductive oud capturing the mystique of midnight Lahore',
    price: 7200,
    categorySlug: 'oud-collection',
    notes: { top: ['Black Pepper', 'Cardamom'], middle: ['Oud', 'Incense'], base: ['Dates', 'Vanilla', 'Patchouli'] },
    size: 100,
    stock: 35,
    rating: 4.6,
    numReviews: 89,
    isFeatured: true,
  },
  {
    name: 'Desert Amber',
    slug: 'desert-amber',
    description: 'Warm golden amber meets precious oud in this sun-kissed creation. Evoking vast desert landscapes at dusk, it blends rich resins with exotic spices and creamy woods for a scent that is both ancient and utterly modern.',
    shortDescription: 'Golden amber and precious oud evoking desert landscapes',
    price: 6800,
    comparePrice: 8500,
    categorySlug: 'oud-collection',
    notes: { top: ['Saffron', 'Cinnamon'], middle: ['Amber', 'Oud'], base: ['Benzoin', 'Cedarwood'] },
    size: 50,
    stock: 40,
    rating: 4.5,
    numReviews: 67,
    isFeatured: false,
  },
  {
    name: 'Kashmir Noir',
    slug: 'kashmir-noir',
    description: 'A mysterious, velvety composition inspired by the dark beauty of Kashmiri nights. Precious oud is wrapped in cashmere-like musks and black tea, with whispers of violet and iris adding an ethereal softness to the deep woody base.',
    shortDescription: 'Velvety oud with cashmere musks and black tea',
    price: 9200,
    categorySlug: 'oud-collection',
    notes: { top: ['Violet Leaf', 'Black Tea'], middle: ['Oud', 'Iris'], base: ['Cashmere Musk', 'Vetiver', 'Tonka Bean'] },
    size: 100,
    stock: 25,
    rating: 4.9,
    numReviews: 156,
    isFeatured: true,
  },
  // Fresh & Floral
  {
    name: 'Jasmine of Karachi',
    slug: 'jasmine-of-karachi',
    description: 'Pure jasmine sambac harvested at dawn, blended with delicate white tea and a whisper of sea breeze. This luminous fragrance captures the freshness of Karachi mornings, where flower markets overflow with jasmine garlands and the coastal air carries salt and sweetness.',
    shortDescription: 'Pure jasmine sambac with white tea and coastal freshness',
    price: 5500,
    categorySlug: 'fresh-floral',
    notes: { top: ['Sea Breeze', 'Lemon Zest'], middle: ['Jasmine Sambac', 'White Tea'], base: ['White Musk', 'Cedar'] },
    size: 100,
    stock: 60,
    rating: 4.7,
    numReviews: 98,
    isFeatured: true,
  },
  {
    name: 'Garden of Peshawar',
    slug: 'garden-of-peshawar',
    description: 'A lush floral bouquet reminiscent of Peshawar\'s legendary gardens. Layers of rose, peony, and magnolia are lifted by sparkling citrus and grounded by warm sandalwood, creating a fragrance as timeless as the city itself.',
    shortDescription: 'Lush floral bouquet of rose, peony, and magnolia',
    price: 4800,
    categorySlug: 'fresh-floral',
    notes: { top: ['Bergamot', 'Grapefruit'], middle: ['Rose', 'Peony', 'Magnolia'], base: ['Sandalwood', 'White Amber'] },
    size: 50,
    stock: 45,
    rating: 4.4,
    numReviews: 52,
    isFeatured: false,
  },
  {
    name: 'Silk Route',
    slug: 'silk-route',
    description: 'An enchanting blend that traces the ancient Silk Road through Pakistan. Exotic spices meet delicate florals in this sophisticated fragrance — cardamom and ginger open the way for a heart of osmanthus and tuberose, settling on a bed of creamy vanilla and silk-like musks.',
    shortDescription: 'Exotic spices and delicate florals tracing the Silk Road',
    price: 6200,
    comparePrice: 7800,
    categorySlug: 'fresh-floral',
    notes: { top: ['Cardamom', 'Ginger'], middle: ['Osmanthus', 'Tuberose'], base: ['Vanilla', 'Silk Musk', 'Amber'] },
    size: 100,
    stock: 38,
    rating: 4.6,
    numReviews: 73,
    isFeatured: false,
  },
  {
    name: 'White Lotus',
    slug: 'white-lotus',
    description: 'Ethereal and serene, White Lotus captures the tranquility of a still pond at sunrise. Clean aquatic notes merge with sacred lotus and green tea, resting on a base of smooth white woods and gentle musks.',
    shortDescription: 'Ethereal lotus with aquatic notes and green tea',
    price: 4500,
    categorySlug: 'fresh-floral',
    notes: { top: ['Water Lily', 'Green Tea'], middle: ['Lotus', 'Lily of the Valley'], base: ['White Cedar', 'Clean Musk'] },
    size: 50,
    stock: 55,
    rating: 4.3,
    numReviews: 41,
    isFeatured: false,
  },
  // Signature Blends
  {
    name: 'Emperor\'s Reserve',
    slug: 'emperors-reserve',
    description: 'The crown jewel of ScentoraX. A complex, multi-layered masterpiece blending the finest ingredients from across South Asia and the Middle East. Rare Taif rose, aged Assam oud, and precious saffron create an aura of absolute luxury and authority.',
    shortDescription: 'Crown jewel blend of Taif rose, Assam oud, and saffron',
    price: 15000,
    comparePrice: 18000,
    categorySlug: 'signature-blends',
    notes: { top: ['Saffron', 'Pink Pepper', 'Elemi'], middle: ['Taif Rose', 'Assam Oud', 'Jasmine Absolute'], base: ['Ambergris', 'Sandalwood', 'Oud Resin'] },
    size: 100,
    stock: 15,
    rating: 5.0,
    numReviews: 203,
    isFeatured: true,
  },
  {
    name: 'Noir Intense',
    slug: 'noir-intense',
    description: 'Bold, unapologetic, magnetic. Noir Intense is for those who command attention without speaking. Dark chocolate and espresso meet leather and tobacco leaf, softened by an unexpected heart of black orchid and iris.',
    shortDescription: 'Bold dark chocolate, espresso, and leather composition',
    price: 9800,
    categorySlug: 'signature-blends',
    notes: { top: ['Espresso', 'Dark Chocolate'], middle: ['Black Orchid', 'Iris'], base: ['Leather', 'Tobacco Leaf', 'Vetiver'] },
    size: 100,
    stock: 30,
    rating: 4.7,
    numReviews: 112,
    isFeatured: false,
  },
  {
    name: 'Velvet Dusk',
    slug: 'velvet-dusk',
    description: 'As day surrenders to night, Velvet Dusk emerges. A sensual, powdery oriental that wraps the wearer in luxurious warmth. Plum and raspberry add fruity depth to a heart of heliotrope and violet, while tonka bean and benzoin create a comforting, addictive dry-down.',
    shortDescription: 'Sensual powdery oriental with plum and heliotrope',
    price: 7500,
    categorySlug: 'signature-blends',
    notes: { top: ['Plum', 'Raspberry', 'Pink Pepper'], middle: ['Heliotrope', 'Violet', 'Jasmine'], base: ['Tonka Bean', 'Benzoin', 'Cashmeran'] },
    size: 100,
    stock: 42,
    rating: 4.8,
    numReviews: 87,
    isFeatured: false,
  },
  {
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Capturing that magical moment when sunlight turns everything to gold. Warm honey and mandarin orange sparkle over a heart of neroli and ylang-ylang, melting into liquid amber and golden sandalwood. Radiant, optimistic, unforgettable.',
    shortDescription: 'Warm honey and mandarin capturing the magic of golden hour',
    price: 8200,
    comparePrice: 10000,
    categorySlug: 'signature-blends',
    images: ['uploads/1791520854780_ScentoraX_Golden_Hour_Perfume_Ad-upload.webp'],
    notes: { top: ['Mandarin', 'Honey', 'Neroli'], middle: ['Ylang-Ylang', 'Orange Blossom'], base: ['Golden Sandalwood', 'Liquid Amber', 'Musk'] },
    size: 100,
    stock: 28,
    rating: 4.9,
    numReviews: 145,
    isFeatured: true,
  },
];

export async function seedProductsAndCategories(): Promise<void> {
  const existingCategories = await Category.countDocuments();
  if (existingCategories > 0) {
    console.log('[SEED] Categories already exist, skipping');
    return;
  }

  const createdCategories: Record<string, any> = {};
  for (const cat of categoriesData) {
    const created = await Category.create(cat);
    createdCategories[cat.slug] = created._id;
  }
  console.log(`[SEED] ${categoriesData.length} categories created`);

  for (const prod of productsData) {
    await Product.create({
      ...prod,
      category: createdCategories[prod.categorySlug],
      images: prod.images || [],
      isActive: true,
    });
  }
  console.log(`[SEED] ${productsData.length} products created`);
}
