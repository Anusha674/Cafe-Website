export const menuCategories = [
  { id: 'all', name: 'All Eggless Delights', icon: 'Utensils' },
  { id: 'special', name: 'Chef Specials', icon: 'Sparkles' },
  { id: 'fast-food', name: 'Gourmet Entrees & Sides', icon: 'Sandwich' },
  { id: 'desserts', name: 'Decadent Desserts', icon: 'Cake' },
  { id: 'beverages', name: 'Craft Beverages', icon: 'GlassWater' },
  { id: 'coffee', name: 'Coffee & Teas', icon: 'Coffee' }
];

export const menuItems = [
  // CHEF SPECIALS (100% EGGLESS & VEGETARIAN)
  {
    id: 's2',
    name: 'Wild Forest Mushroom & Saffron Risotto',
    category: 'special',
    price: 19.90,
    description: 'Creamy Italian Arborio rice infused with saffron, sautéed chanterelle & porcini mushrooms, aged parmesan crisp, and white truffle oil drizzle.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    reviewsCount: 280,
    prepTime: '16 mins',
    calories: '520 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Gluten-Free']
  },
  {
    id: 's3',
    name: 'Grilled Halloumi & Roasted Vegetable Stack',
    category: 'special',
    price: 17.50,
    description: 'Layers of golden grilled halloumi cheese, roasted zucchini, bell peppers, eggplant, and basil pesto over house-baked herb focaccia.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 195,
    prepTime: '12 mins',
    calories: '490 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Vegetarian']
  },

  // GOURMET EATS & FAST FOOD (100% EGGLESS & VEGETARIAN)
  {
    id: 'f1',
    name: 'Crispy French Fries with Ketchup & Mayonnaise',
    category: 'fast-food',
    price: 7.50,
    description: 'Hand-cut golden crispy french fries seasoned with sea salt & truffle herbs, served with homemade tomato ketchup and creamy garlic herb mayonnaise dips.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    reviewsCount: 520,
    prepTime: '8 mins',
    calories: '420 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Vegetarian', 'Crispy Favorite']
  },
  {
    id: 'f3',
    name: 'Gourmet Beyond Truffle & Cheddar Burger',
    category: 'fast-food',
    price: 15.80,
    description: 'Juicy 100% plant-based Beyond patty, melted 18-month aged cheddar, caramelized balsamic onions, and garlic herb aioli on brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 450,
    prepTime: '10 mins',
    calories: '580 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Plant-Based']
  },
  {
    id: 'f4',
    name: 'Mediterranean Pesto & Mozzarella Panini',
    category: 'fast-food',
    price: 10.50,
    description: 'Artisan ciabatta pressed with roasted red peppers, fresh buffalo mozzarella, sun-dried tomatoes, and house cashew basil pesto.',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 180,
    prepTime: '7 mins',
    calories: '390 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegetarian']
  },

  // DECADENT DESSERTS (100% EGGLESS)
  {
    id: 'd1',
    name: 'Valrhona Triple Chocolate Eggless Lava Cake',
    category: 'desserts',
    price: 8.90,
    description: 'Warm French dark chocolate eggless molten cake, served with Madagascar vanilla bean gelato & fresh raspberries.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    reviewsCount: 380,
    prepTime: '8 mins',
    calories: '430 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Vegetarian']
  },
  {
    id: 'd2',
    name: 'Classic Venetian Eggless Tiramisu',
    category: 'desserts',
    price: 8.20,
    description: 'Eggless sponge fingers soaked in dark espresso & vanilla, layered with light whipped mascarpone cream & dark cocoa dusting.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 310,
    prepTime: '5 mins',
    calories: '320 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegetarian']
  },
  {
    id: 'd3',
    name: 'Pistachio Rose & Blackberry Tart',
    category: 'desserts',
    price: 7.90,
    description: 'Eggless buttery pastry shell filled with Sicilian pistachio cream, topped with fresh blackberries and edible organic rose petals.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
    rating: 4.85,
    reviewsCount: 165,
    prepTime: '4 mins',
    calories: '310 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Vegetarian']
  },

  // CRAFT BEVERAGES (100% EGGLESS & VEGAN)
  {
    id: 'b1',
    name: 'Passionfruit Elderflower Spritz',
    category: 'beverages',
    price: 6.50,
    description: 'Fresh yellow passionfruit pulp shaken with elderflower cordial, sparkling mineral water, and fresh mint leaves.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    rating: 4.85,
    reviewsCount: 190,
    prepTime: '4 mins',
    calories: '110 kcal',
    isSpecial: true,
    dietary: ['100% Eggless', 'Vegan']
  },
  {
    id: 'b2',
    name: 'Uji Matcha Citrus Tonic',
    category: 'beverages',
    price: 6.20,
    description: 'Ceremonial grade Japanese green tea whisked ice cold, infused with artisan tonic water and blood orange syrup.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 140,
    prepTime: '5 mins',
    calories: '95 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegan']
  },

  // COFFEE & TEAS (100% EGGLESS)
  {
    id: 'c1',
    name: 'Artisan Hazelnut Espresso Latte',
    category: 'coffee',
    price: 5.25,
    description: 'Double shot of dark roasted Arabica infused with organic roasted hazelnut syrup & velvet microfoam.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 220,
    prepTime: '4 mins',
    calories: '140 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegetarian']
  },
  {
    id: 'c2',
    name: 'Spiced Cardamom & Oat Latte',
    category: 'coffee',
    price: 5.60,
    description: 'House blend espresso combined with crushed green cardamom, cinnamon leaf, and creamy steamed oat milk.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 175,
    prepTime: '5 mins',
    calories: '160 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegan']
  },

  // LAST CARD IN MENU
  {
    id: 'f2',
    name: 'Truffle Avocado & Heirloom Tomato Sourdough',
    category: 'fast-food',
    price: 12.50,
    description: 'Smashed Hass avocado on toasted country sourdough, topped with sliced heirloom tomatoes, roasted pumpkin seeds, microgreens & white truffle glaze.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 310,
    prepTime: '8 mins',
    calories: '380 kcal',
    isSpecial: false,
    dietary: ['100% Eggless', 'Vegan']
  }
];
