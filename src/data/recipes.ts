import { Recipe } from '../types/recipe';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'spk-1',
    slug: 'million-dollar-spaghetti-casserole',
    title: 'Million Dollar Spaghetti Casserole',
    tagline: 'Rich, creamy baked spaghetti loaded with seasoned beef, melted cheeses, and homemade comfort.',
    category: 'Casseroles',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-03-15',
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    totalTimeMinutes: 55,
    servings: 8,
    servingUnit: 'generous slices',
    difficulty: 'Easy',
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    trending: true,
    tags: ['Dinner', 'Casserole', 'Beef', 'Pasta', 'Cheese', 'Family Favorite'],
    ingredients: [
      { item: 'Spaghetti pasta', amount: 16, unit: 'oz', metricAmount: 450, metricUnit: 'g', note: 'cooked al dente' },
      { item: 'Lean ground beef', amount: 1.5, unit: 'lbs', metricAmount: 680, metricUnit: 'g' },
      { item: 'Italian sausage', amount: 0.5, unit: 'lbs', metricAmount: 225, metricUnit: 'g', note: 'casings removed' },
      { item: 'Marinara or pasta sauce', amount: 48, unit: 'oz', metricAmount: 1360, metricUnit: 'g', note: 'approx. 2 standard jars' },
      { item: 'Cream cheese', amount: 8, unit: 'oz', metricAmount: 225, metricUnit: 'g', note: 'softened at room temp' },
      { item: 'Sour cream', amount: 8, unit: 'oz', metricAmount: 240, metricUnit: 'g' },
      { item: 'Ricotta or cottage cheese', amount: 8, unit: 'oz', metricAmount: 225, metricUnit: 'g' },
      { item: 'Unsalted butter', amount: 0.5, unit: 'cup', metricAmount: 115, metricUnit: 'g', note: 'melted' },
      { item: 'Shredded mozzarella cheese', amount: 3, unit: 'cups', metricAmount: 340, metricUnit: 'g' },
      { item: 'Grated Parmesan cheese', amount: 0.5, unit: 'cup', metricAmount: 50, metricUnit: 'g' },
      { item: 'Italian seasoning', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' },
      { item: 'Garlic powder', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Preheat Oven and Boil Pasta',
        text: 'Preheat your oven to 350°F (175°C). Lightly grease a deep 9x13-inch baking dish. Cook spaghetti in salted boiling water until al dente, about 8-9 minutes. Drain well and toss with melted butter in a large bowl.',
        suggestedMinutes: 10
      },
      {
        step: 2,
        title: 'Brown Meat & Simmer Sauce',
        text: 'In a large skillet over medium-high heat, brown the ground beef and Italian sausage until completely cooked through. Drain excess fat. Pour in the marinara sauce, Italian seasoning, and garlic powder. Simmer gently for 5 minutes.',
        suggestedMinutes: 10
      },
      {
        step: 3,
        title: 'Blend the Cream Cheese Filling',
        text: 'In a medium bowl, beat together softened cream cheese, sour cream, and ricotta until smooth and creamy.'
      },
      {
        step: 4,
        title: 'Assemble the Casserole Layers',
        text: 'Spread half of the buttered spaghetti into the prepared baking dish. Spread the velvety cream cheese mixture evenly over the pasta. Top with the remaining spaghetti. Pour the hot meat sauce over the top, then sprinkle generously with mozzarella and Parmesan cheese.'
      },
      {
        step: 5,
        title: 'Bake to Golden Perfection',
        text: 'Bake uncovered for 30 to 35 minutes until the cheese is melted, bubbly, and lightly golden brown on edges. Let stand for 10 minutes before slicing to allow layers to set.',
        suggestedMinutes: 35
      }
    ],
    nutrition: {
      calories: 580,
      fat: '32g',
      saturatedFat: '16g',
      cholesterol: '115mg',
      sodium: '890mg',
      carbohydrates: '44g',
      fiber: '3g',
      sugar: '7g',
      protein: '31g'
    },
    chefTips: [
      'For best results, soften your cream cheese on the counter for 30 minutes before mixing so it blends easily with no lumps.',
      'You can assemble this casserole up to 24 hours in advance! Just cover tightly with foil and refrigerate until ready to bake. Add 10 extra minutes if baking straight from the fridge.'
    ],
    storageTips: 'Store leftovers in an airtight container in the refrigerator for up to 4 days, or freeze baked portions for up to 3 months.',
    comments: [
      {
        id: 'c1',
        author: 'Margaret S.',
        date: '2024-04-12',
        rating: 5,
        content: 'Made this for Sunday family dinner with my grandkids. There was not a single noodle left in the pan! The cream cheese layer is heavenly.'
      },
      {
        id: 'c2',
        author: 'David H.',
        date: '2024-05-03',
        rating: 5,
        content: 'Hands down the best spaghetti casserole recipe on the internet. My wife asks for this every single week now.'
      }
    ]
  },
  {
    id: 'spk-2',
    slug: 'slow-cooker-crack-chicken',
    title: 'Slow Cooker Crack Chicken',
    tagline: 'Tender shredded chicken bathed in creamy ranch, cheddar cheese, and crisp bacon crumbles.',
    category: 'Slow Cooker',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-02-18',
    prepTimeMinutes: 10,
    cookTimeMinutes: 360,
    totalTimeMinutes: 370,
    servings: 6,
    servingUnit: 'servings',
    difficulty: 'Easy',
    rating: 4.9,
    reviewsCount: 98,
    featured: true,
    trending: true,
    tags: ['Slow Cooker', 'Chicken', 'Bacon', 'Keto Friendly', 'Dinner', 'Easy Weeknight'],
    ingredients: [
      { item: 'Boneless skinless chicken breasts', amount: 2, unit: 'lbs', metricAmount: 900, metricUnit: 'g' },
      { item: 'Cream cheese', amount: 16, unit: 'oz', metricAmount: 450, metricUnit: 'g', note: 'two 8-oz blocks' },
      { item: 'Ranch seasoning mix packet', amount: 1, unit: 'packet (1 oz)', metricAmount: 28, metricUnit: 'g' },
      { item: 'Cooked crisp bacon', amount: 8, unit: 'slices', metricAmount: 8, metricUnit: 'slices', note: 'crumbled' },
      { item: 'Sharp cheddar cheese', amount: 1.5, unit: 'cups', metricAmount: 170, metricUnit: 'g', note: 'freshly shredded' },
      { item: 'Chopped green onions', amount: 0.5, unit: 'cup', metricAmount: 50, metricUnit: 'g', note: 'for garnish' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Place in Slow Cooker',
        text: 'Arrange chicken breasts in the bottom of your slow cooker. Sprinkle the ranch seasoning packet evenly over the chicken, then place the blocks of cream cheese right on top.'
      },
      {
        step: 2,
        title: 'Slow Cook on Low',
        text: 'Cover and cook on LOW for 6 to 7 hours (or on HIGH for 3.5 to 4 hours) until chicken is fall-apart tender and reads at least 165°F on a meat thermometer.',
        suggestedMinutes: 360
      },
      {
        step: 3,
        title: 'Shred and Stir',
        text: 'Using two forks, shred the chicken directly in the slow cooker. Stir vigorously until the chicken and melted cream cheese form a thick, silky sauce.'
      },
      {
        step: 4,
        title: 'Add Bacon and Cheddar',
        text: 'Fold in the shredded sharp cheddar cheese and half of the crumbled bacon. Cover for 5 minutes until cheese melts. Garnish with remaining bacon and sliced green onions. Serve warm on hamburger buns, over rice, or with crackers!'
      }
    ],
    nutrition: {
      calories: 495,
      fat: '33g',
      saturatedFat: '17g',
      cholesterol: '155mg',
      sodium: '820mg',
      carbohydrates: '4g',
      fiber: '0g',
      sugar: '3g',
      protein: '42g'
    },
    chefTips: [
      'Serve on soft Hawaiian rolls for game day sliders, or wrap in low-carb tortillas for an easy keto lunch.',
      'Do not add extra water or liquid! The chicken and cream cheese release plenty of delicious natural moisture.'
    ],
    storageTips: 'Keep in an airtight container in the fridge for up to 4 days. Reheat on low in the microwave with a splash of milk to loosen.',
    comments: [
      {
        id: 'c3',
        author: 'Evelyn P.',
        date: '2024-03-22',
        rating: 5,
        content: 'This earned its name! Truly addictive. My husband piled it high on toasted ciabatta rolls.'
      }
    ]
  },
  {
    id: 'spk-3',
    slug: 'southern-banana-pudding-scratch',
    title: "Paula's Best Southern Banana Pudding",
    tagline: 'Velvety vanilla custard layered with crisp vanilla wafers, fresh sweet bananas, and cloud-like whipped cream.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-01-20',
    prepTimeMinutes: 25,
    cookTimeMinutes: 0,
    totalTimeMinutes: 25,
    servings: 12,
    servingUnit: 'large dessert servings',
    difficulty: 'Easy',
    rating: 5.0,
    reviewsCount: 215,
    featured: true,
    trending: true,
    tags: ['Dessert', 'Southern', 'No-Bake', 'Pudding', 'Banana', 'Potluck'],
    ingredients: [
      { item: 'French Vanilla instant pudding mix', amount: 2, unit: 'boxes (3.4 oz each)', metricAmount: 190, metricUnit: 'g' },
      { item: 'Cold whole milk', amount: 3, unit: 'cups', metricAmount: 710, metricUnit: 'ml' },
      { item: 'Sweetened condensed milk', amount: 14, unit: 'oz', metricAmount: 396, metricUnit: 'g', note: '1 can' },
      { item: 'Heavy whipping cream', amount: 2, unit: 'cups', metricAmount: 480, metricUnit: 'ml', note: 'chilled' },
      { item: 'Powdered sugar', amount: 0.33, unit: 'cup', metricAmount: 40, metricUnit: 'g' },
      { item: 'Pure vanilla extract', amount: 1.5, unit: 'tsp', metricAmount: 7, metricUnit: 'ml' },
      { item: 'Vanilla wafers (Nilla Wafers)', amount: 12, unit: 'oz', metricAmount: 340, metricUnit: 'g', note: 'approx. 1 standard box' },
      { item: 'Ripe bananas', amount: 5, unit: 'large', metricAmount: 5, metricUnit: 'whole', note: 'sliced into 1/4-inch coins' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Whisk the Pudding Base',
        text: 'In a large mixing bowl, beat together the cold whole milk, sweetened condensed milk, and French vanilla pudding mix for 2 minutes until slightly thickened. Set in the refrigerator for 5 minutes.'
      },
      {
        step: 2,
        title: 'Whip Fresh Cream',
        text: 'In a separate chilled bowl, beat heavy whipping cream, powdered sugar, and vanilla extract with an electric mixer until stiff peaks form. Gently fold half of the whipped cream into the chilled pudding mixture.'
      },
      {
        step: 3,
        title: 'Assemble the Trifle Layers',
        text: 'In a 9x13-inch glass dish or a large trifle bowl, arrange a layer of vanilla wafers across the bottom. Top with a layer of banana slices, then spread one-third of the pudding mixture over the fruit. Repeat layers twice more.'
      },
      {
        step: 4,
        title: 'Top & Chill',
        text: 'Spread the remaining fresh whipped cream over the top. Garnish with crushed vanilla wafers. Cover and refrigerate for at least 4 hours (or overnight) so the cookies soften to cake-like perfection.'
      }
    ],
    nutrition: {
      calories: 410,
      fat: '19g',
      saturatedFat: '11g',
      cholesterol: '55mg',
      sodium: '290mg',
      carbohydrates: '56g',
      fiber: '2g',
      sugar: '41g',
      protein: '6g'
    },
    chefTips: [
      'To prevent banana slices from browning, toss them lightly in a tablespoon of fresh lemon or pineapple juice before layering.',
      'The pudding tastes even better on day 2 once the wafers have absorbed the luscious vanilla custard.'
    ],
    storageTips: 'Refrigerate covered with plastic wrap for up to 3 days. Do not freeze.',
    comments: [
      {
        id: 'c4',
        author: 'Betty Lou',
        date: '2024-02-14',
        rating: 5,
        content: 'Just like my mama made in Georgia. Folding in real homemade whipped cream makes all the difference in the world!'
      }
    ]
  },
  {
    id: 'spk-4',
    slug: 'amish-country-casserole',
    title: 'Old-Fashioned Amish Country Casserole',
    tagline: 'Hearty ground beef and egg noodles baked in a creamy mushroom-tomato sauce with sweet corn and melted cheddar.',
    category: 'Casseroles',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-03-01',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    totalTimeMinutes: 45,
    servings: 8,
    servingUnit: 'portions',
    difficulty: 'Easy',
    rating: 4.8,
    reviewsCount: 84,
    tags: ['Amish', 'Casserole', 'Beef', 'Noodles', 'Budget Friendly', 'Dinner'],
    ingredients: [
      { item: 'Wide egg noodles', amount: 8, unit: 'oz', metricAmount: 225, metricUnit: 'g' },
      { item: 'Ground beef', amount: 1.5, unit: 'lbs', metricAmount: 680, metricUnit: 'g' },
      { item: 'Yellow onion', amount: 1, unit: 'medium', metricAmount: 1, metricUnit: 'medium', note: 'finely diced' },
      { item: 'Condensed cream of mushroom soup', amount: 10.5, unit: 'oz', metricAmount: 298, metricUnit: 'g', note: '1 can' },
      { item: 'Condensed tomato soup', amount: 10.5, unit: 'oz', metricAmount: 298, metricUnit: 'g', note: '1 can' },
      { item: 'Whole milk', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml' },
      { item: 'Canned whole kernel sweet corn', amount: 15, unit: 'oz', metricAmount: 425, metricUnit: 'g', note: 'drained' },
      { item: 'Sharp cheddar cheese', amount: 2, unit: 'cups', metricAmount: 225, metricUnit: 'g', note: 'shredded' },
      { item: 'Paprika', amount: 0.5, unit: 'tsp', metricAmount: 0.5, metricUnit: 'tsp' },
      { item: 'Salt and black pepper', amount: 1, unit: 'tsp each', metricAmount: 1, metricUnit: 'tsp each' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Boil Noodles',
        text: 'Preheat oven to 350°F (175°C). Cook egg noodles according to package directions until al dente (about 6 minutes). Drain thoroughly.',
        suggestedMinutes: 6
      },
      {
        step: 2,
        title: 'Cook Meat & Onion',
        text: 'In a large skillet, brown ground beef with diced onion, salt, and black pepper until meat is no longer pink. Drain grease.',
        suggestedMinutes: 8
      },
      {
        step: 3,
        title: 'Combine Everything',
        text: 'In a large mixing bowl, combine cooked noodles, browned beef mixture, cream of mushroom soup, tomato soup, milk, drained sweet corn, and 1 cup of shredded cheddar. Stir thoroughly to coat.'
      },
      {
        step: 4,
        title: 'Bake with Cheesy Crust',
        text: 'Transfer into a greased 9x13-inch baking dish. Top with remaining 1 cup cheddar cheese and a dusting of paprika. Bake uncovered for 25 to 30 minutes until bubbling hot and golden.',
        suggestedMinutes: 25
      }
    ],
    nutrition: {
      calories: 470,
      fat: '22g',
      saturatedFat: '10g',
      cholesterol: '95mg',
      sodium: '760mg',
      carbohydrates: '38g',
      fiber: '3g',
      sugar: '6g',
      protein: '29g'
    },
    chefTips: [
      'A true Midwest classic! Feel free to toss in a cup of thawed green peas or diced bell peppers for extra color.',
      'Freezes wonderfully: assemble without baking, wrap in aluminum foil, and freeze for up to 2 months.'
    ],
    storageTips: 'Refrigerate leftovers in a sealed container for up to 4 days. Reheats easily in the microwave or toaster oven.',
    comments: [
      {
        id: 'c5',
        author: 'Clara W.',
        date: '2024-03-10',
        rating: 5,
        content: 'This reminded me of church potlucks in Ohio 40 years ago. So comforting and simple.'
      }
    ]
  },
  {
    id: 'spk-5',
    slug: 'mississippi-pot-roast',
    title: 'Award-Winning Mississippi Pot Roast',
    tagline: 'Fork-tender chuck roast slow-braised with ranch, au jus, and tangy pepperoncini peppers with a buttery gravy.',
    category: 'Slow Cooker',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-02-05',
    prepTimeMinutes: 10,
    cookTimeMinutes: 480,
    totalTimeMinutes: 490,
    servings: 8,
    servingUnit: 'hearty servings',
    difficulty: 'Easy',
    rating: 4.95,
    reviewsCount: 167,
    featured: true,
    trending: true,
    tags: ['Beef', 'Slow Cooker', 'Keto', 'Dinner', 'Pot Roast', 'Comfort Food'],
    ingredients: [
      { item: 'Beef chuck roast', amount: 3.5, unit: 'lbs', metricAmount: 1.6, metricUnit: 'kg', note: 'well-marbled' },
      { item: 'Dry Ranch dressing mix', amount: 1, unit: 'packet (1 oz)', metricAmount: 28, metricUnit: 'g' },
      { item: 'Au Jus gravy mix packet', amount: 1, unit: 'packet (1 oz)', metricAmount: 28, metricUnit: 'g' },
      { item: 'Unsalted butter', amount: 0.5, unit: 'cup', metricAmount: 115, metricUnit: 'g', note: '1 stick, cut into slices' },
      { item: 'Whole pepperoncini peppers', amount: 6, unit: 'whole', metricAmount: 6, metricUnit: 'whole' },
      { item: 'Pepperoncini juice from jar', amount: 0.25, unit: 'cup', metricAmount: 60, metricUnit: 'ml' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Place Roast in Slow Cooker',
        text: 'Pat chuck roast dry with paper towels and place directly into the bottom of a 6-quart slow cooker. (Optional: sear in a screaming hot cast iron skillet for 3 minutes per side for extra flavor crust).'
      },
      {
        step: 2,
        title: 'Add Seasonings and Peppers',
        text: 'Sprinkle the dry Ranch seasoning packet and dry Au Jus packet over the top of the beef. Place the stick of sliced butter on top of the seasoning. Scatter the pepperoncinis and pour in the pepperoncini juice.'
      },
      {
        step: 3,
        title: 'Slow Cook on Low',
        text: 'Cover and cook on LOW for 8 hours. Resist lifting the lid! The meat will tenderize and create its own luscious natural gravy.',
        suggestedMinutes: 480
      },
      {
        step: 4,
        title: 'Shred and Serve',
        text: 'Transfer roast to a cutting board and shred effortlessly with two forks into large chunks. Discard any excess fat. Return beef to the slow cooker to soak in the savory butter-pepper sauce. Serve over creamy mashed potatoes.'
      }
    ],
    nutrition: {
      calories: 520,
      fat: '36g',
      saturatedFat: '17g',
      cholesterol: '140mg',
      sodium: '790mg',
      carbohydrates: '3g',
      fiber: '0g',
      sugar: '1g',
      protein: '45g'
    },
    chefTips: [
      'Do not add any broth or water! The chuck roast and butter generate a rich, concentrated gravy all on their own.',
      'Use the leftovers for the best French dip roast beef sandwiches on hoagie rolls topped with provolone.'
    ],
    storageTips: 'Store in the refrigerator with its gravy for up to 5 days. Reheat gently in a saucepan or slow cooker.',
    comments: [
      {
        id: 'c6',
        author: 'Robert K.',
        date: '2024-02-28',
        rating: 5,
        content: 'The most tender roast beef you will ever eat in your life. The pepperoncini juice is the secret magic!'
      }
    ]
  },
  {
    id: 'spk-6',
    slug: 'creamy-tuscan-garlic-chicken',
    title: 'Creamy Tuscan Garlic Chicken',
    tagline: 'Pan-seared golden chicken cutlets simmered in a luscious garlic cream sauce with sun-dried tomatoes and spinach.',
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-03-08',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    servings: 4,
    servingUnit: 'servings',
    difficulty: 'Easy',
    rating: 4.9,
    reviewsCount: 112,
    tags: ['Chicken', 'Italian', 'Creamy', 'Dinner', '30-Minute Meal', 'Restaurant Style'],
    ingredients: [
      { item: 'Boneless chicken breasts', amount: 1.5, unit: 'lbs', metricAmount: 680, metricUnit: 'g', note: 'sliced in half horizontally into thin cutlets' },
      { item: 'Olive oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml' },
      { item: 'Butter', amount: 2, unit: 'tbsp', metricAmount: 28, metricUnit: 'g' },
      { item: 'Garlic cloves', amount: 6, unit: 'cloves', metricAmount: 6, metricUnit: 'cloves', note: 'minced' },
      { item: 'Sun-dried tomatoes in oil', amount: 0.5, unit: 'cup', metricAmount: 90, metricUnit: 'g', note: 'drained and sliced' },
      { item: 'Heavy whipping cream', amount: 1, unit: 'cup', metricAmount: 240, metricUnit: 'ml' },
      { item: 'Chicken broth', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml' },
      { item: 'Fresh baby spinach', amount: 3, unit: 'cups', metricAmount: 90, metricUnit: 'g' },
      { item: 'Freshly grated Parmesan', amount: 0.75, unit: 'cup', metricAmount: 75, metricUnit: 'g' },
      { item: 'Italian herbs', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Pan Sear Chicken Cutlets',
        text: 'Season chicken cutlets with salt, pepper, and Italian herbs. Heat olive oil and 1 tbsp butter in a large skillet over medium-high heat. Cook chicken 5 minutes per side until golden brown and cooked through (165°F). Transfer to a plate.',
        suggestedMinutes: 10
      },
      {
        step: 2,
        title: 'Sauté Garlic and Sun-Dried Tomatoes',
        text: 'In the same skillet, melt remaining butter over medium heat. Add minced garlic and sun-dried tomatoes; sauté for 1 minute until fragrant.',
        suggestedMinutes: 2
      },
      {
        step: 3,
        title: 'Build the Cream Sauce',
        text: 'Pour in the chicken broth and heavy cream. Bring to a gentle simmer for 3 to 4 minutes until slightly thickened. Stir in the grated Parmesan cheese until melted and smooth.'
      },
      {
        step: 4,
        title: 'Wilt Spinach & Return Chicken',
        text: 'Add fresh baby spinach and stir until wilted (about 2 minutes). Return cooked chicken cutlets and any resting juices back to the skillet. Spoon sauce over the chicken and simmer for 2 minutes before serving over pasta or garlic bread.'
      }
    ],
    nutrition: {
      calories: 510,
      fat: '34g',
      saturatedFat: '17g',
      cholesterol: '165mg',
      sodium: '620mg',
      carbohydrates: '8g',
      fiber: '2g',
      sugar: '4g',
      protein: '43g'
    },
    chefTips: [
      'Cutting the thick chicken breasts horizontally into cutlets helps them cook twice as fast and stay super juicy!',
      'Serve over angel hair pasta or with a warm baguette to soak up every drop of that velvety sauce.'
    ],
    storageTips: 'Keep in an airtight container for up to 3 days in the fridge. Reheat over low heat in a skillet with a splash of cream.',
    comments: [
      {
        id: 'c7',
        author: 'Dorothy M.',
        date: '2024-03-19',
        rating: 5,
        content: 'Tastes like an expensive restaurant meal made in under 35 minutes! My family was so impressed.'
      }
    ]
  },
  {
    id: 'spk-7',
    slug: 'easy-loaded-potato-bacon-soup',
    title: 'Easy Loaded Potato Bacon Soup',
    tagline: 'Ultra thick and creamy potato chowder simmered with sharp cheddar, sour cream, and crispy smoked bacon.',
    category: 'Soups & Salads',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-01-14',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    totalTimeMinutes: 45,
    servings: 6,
    servingUnit: 'bowls',
    difficulty: 'Easy',
    rating: 4.9,
    reviewsCount: 133,
    tags: ['Soup', 'Potatoes', 'Bacon', 'Comfort Food', 'Winter', 'Cheese'],
    ingredients: [
      { item: 'Russet potatoes', amount: 5, unit: 'large', metricAmount: 1.1, metricUnit: 'kg', note: 'peeled and cut into 1/2-inch cubes' },
      { item: 'Thick cut bacon', amount: 8, unit: 'slices', metricAmount: 8, metricUnit: 'slices', note: 'chopped' },
      { item: 'Butter', amount: 4, unit: 'tbsp', metricAmount: 56, metricUnit: 'g' },
      { item: 'All-purpose flour', amount: 0.33, unit: 'cup', metricAmount: 42, metricUnit: 'g' },
      { item: 'Yellow onion', amount: 1, unit: 'medium', metricAmount: 1, metricUnit: 'medium', note: 'finely diced' },
      { item: 'Garlic cloves', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', note: 'minced' },
      { item: 'Low-sodium chicken broth', amount: 4, unit: 'cups', metricAmount: 960, metricUnit: 'ml' },
      { item: 'Whole milk or half & half', amount: 2, unit: 'cups', metricAmount: 480, metricUnit: 'ml' },
      { item: 'Sour cream', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'g' },
      { item: 'Shredded sharp cheddar cheese', amount: 2, unit: 'cups', metricAmount: 225, metricUnit: 'g' },
      { item: 'Sliced chives or green onions', amount: 0.33, unit: 'cup', metricAmount: 30, metricUnit: 'g' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Crisp the Bacon',
        text: 'In a large heavy-bottomed Dutch oven, fry chopped bacon over medium heat until crispy. Use a slotted spoon to transfer bacon to a paper towel-lined plate. Keep 1 tablespoon of bacon drippings in the pot.',
        suggestedMinutes: 8
      },
      {
        step: 2,
        title: 'Sauté Aromatics & Make Roux',
        text: 'Add butter and diced onion to the pot. Sauté 4 minutes until soft. Stir in minced garlic for 1 minute. Sprinkle flour over the vegetables and stir constantly for 2 minutes to cook out raw flour taste.'
      },
      {
        step: 3,
        title: 'Simmer the Potatoes',
        text: 'Slowly pour in chicken broth and milk while whisking to avoid lumps. Add diced potatoes. Bring to a boil, then reduce heat to medium-low. Cover and simmer for 15 to 18 minutes until potatoes are fork-tender.',
        suggestedMinutes: 18
      },
      {
        step: 4,
        title: 'Mash, Stir & Finish',
        text: 'Use a potato masher to lightly mash about half the potatoes right in the pot (leaving nice tender chunks). Turn off heat. Stir in sour cream, 1.5 cups cheddar cheese, and half the cooked bacon until melted. Season with salt and pepper to taste. Top each bowl with remaining cheddar, bacon, and chives.'
      }
    ],
    nutrition: {
      calories: 460,
      fat: '28g',
      saturatedFat: '15g',
      cholesterol: '80mg',
      sodium: '740mg',
      carbohydrates: '38g',
      fiber: '3g',
      sugar: '5g',
      protein: '15g'
    },
    chefTips: [
      'Russet potatoes are best for this recipe because their high starch content naturally thickens the soup to restaurant-quality consistency.',
      'Always remove soup from heat before stirring in sour cream to prevent curdling!'
    ],
    storageTips: 'Refrigerate for up to 4 days. When reheating, stir in a splash of warm milk as potato soup thickens considerably when chilled.',
    comments: [
      {
        id: 'c8',
        author: 'Nancy T.',
        date: '2024-02-01',
        rating: 5,
        content: 'Better than Panera Bread by a mile! Creamy, rich, and the bacon flavor runs through every single spoonful.'
      }
    ]
  },
  {
    id: 'spk-8',
    slug: 'grandmas-old-fashioned-meatloaf',
    title: "Grandma's Glazed Homestyle Meatloaf",
    tagline: 'Juicy, tender meatloaf wrapped with sweet brown sugar tomato glaze that never dries out.',
    category: 'Main Dishes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-02-24',
    prepTimeMinutes: 15,
    cookTimeMinutes: 60,
    totalTimeMinutes: 75,
    servings: 8,
    servingUnit: 'thick slices',
    difficulty: 'Easy',
    rating: 4.88,
    reviewsCount: 105,
    tags: ['Meatloaf', 'Beef', 'Traditional', 'Grandma Recipe', 'Comfort Food', 'Dinner'],
    ingredients: [
      { item: 'Ground chuck (80/20)', amount: 2, unit: 'lbs', metricAmount: 900, metricUnit: 'g' },
      { item: 'Crushed buttery Ritz crackers or breadcrumbs', amount: 1, unit: 'cup', metricAmount: 90, metricUnit: 'g' },
      { item: 'Whole milk', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml' },
      { item: 'Large eggs', amount: 2, unit: 'large', metricAmount: 2, metricUnit: 'large', note: 'beaten' },
      { item: 'Yellow onion', amount: 1, unit: 'medium', metricAmount: 1, metricUnit: 'medium', note: 'finely grated' },
      { item: 'Worcestershire sauce', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml' },
      { item: 'Garlic powder', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' },
      { item: 'Italian seasoning', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' },
      { item: 'Ketchup (for glaze)', amount: 0.75, unit: 'cup', metricAmount: 180, metricUnit: 'ml' },
      { item: 'Brown sugar (for glaze)', amount: 3, unit: 'tbsp', metricAmount: 40, metricUnit: 'g' },
      { item: 'Apple cider vinegar (for glaze)', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Prep and Soak Crackers',
        text: 'Preheat oven to 375°F (190°C). In a small bowl, combine crushed crackers and milk. Let sit for 5 minutes to form a panade (this is the secret to a melt-in-your-mouth tender meatloaf!).'
      },
      {
        step: 2,
        title: 'Mix Meatloaf Base Gently',
        text: 'In a large bowl, combine ground chuck, soaked cracker mixture, beaten eggs, grated onion, Worcestershire sauce, garlic powder, Italian seasoning, 1 tsp salt, and 1/2 tsp pepper. Mix with clean hands just until combined—do NOT overmix!'
      },
      {
        step: 3,
        title: 'Shape the Loaf',
        text: 'Line a rimmed baking sheet with aluminum foil. Form the meat mixture into a 9x5-inch loaf in the center of the baking sheet. (Baking on a sheet lets the edges caramelize beautifully rather than boiling in grease in a loaf pan).'
      },
      {
        step: 4,
        title: 'Whisk Glaze & Bake',
        text: 'In a small bowl, stir together ketchup, brown sugar, and apple cider vinegar. Bake meatloaf for 40 minutes, then brush glaze all over the top and sides. Return to oven for another 15 to 20 minutes until internal temperature hits 160°F. Rest 10 minutes before slicing.',
        suggestedMinutes: 60
      }
    ],
    nutrition: {
      calories: 420,
      fat: '22g',
      saturatedFat: '9g',
      cholesterol: '130mg',
      sodium: '690mg',
      carbohydrates: '18g',
      fiber: '1g',
      sugar: '11g',
      protein: '34g'
    },
    chefTips: [
      'Grate your onion on a box grater directly into the bowl! The onion juice adds unbeatable moisture and no raw crunchy bits.',
      'Letting the meatloaf rest for 10 full minutes allows the flavorful juices to redistribute throughout so slices stay intact.'
    ],
    storageTips: 'Wrap leftovers tightly in foil and keep refrigerated for up to 4 days. Cold meatloaf sandwiches on white bread with mayo are legendary!',
    comments: [
      {
        id: 'c9',
        author: 'Carolyn B.',
        date: '2024-03-05',
        rating: 5,
        content: 'The cracker and milk trick made this the juiciest meatloaf I have ever baked in 50 years of cooking.'
      }
    ]
  },
  {
    id: 'spk-9',
    slug: 'cinnamon-roll-apple-pie',
    title: 'Homemade Cinnamon Roll Apple Pie',
    tagline: 'Warm spiced autumn apples baked inside a flaky crust made entirely of rolled cinnamon rolls with vanilla glaze.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-03-25',
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    totalTimeMinutes: 70,
    servings: 8,
    servingUnit: 'slices',
    difficulty: 'Medium',
    rating: 4.96,
    reviewsCount: 189,
    featured: true,
    tags: ['Pie', 'Apple', 'Cinnamon Roll', 'Dessert', 'Fall Favorite', 'Holiday Baking'],
    ingredients: [
      { item: 'Refrigerated cinnamon roll tubes (with icing)', amount: 2, unit: 'cans (12.4 oz each)', metricAmount: 700, metricUnit: 'g' },
      { item: 'Granny Smith apples', amount: 5, unit: 'medium', metricAmount: 5, metricUnit: 'medium', note: 'peeled, cored, and thinly sliced' },
      { item: 'Honeycrisp apples', amount: 2, unit: 'medium', metricAmount: 2, metricUnit: 'medium', note: 'peeled, cored, and thinly sliced' },
      { item: 'Light brown sugar', amount: 0.5, unit: 'cup', metricAmount: 100, metricUnit: 'g' },
      { item: 'Granulated sugar', amount: 0.25, unit: 'cup', metricAmount: 50, metricUnit: 'g' },
      { item: 'Ground cinnamon', amount: 1.5, unit: 'tsp', metricAmount: 1.5, metricUnit: 'tsp' },
      { item: 'Ground nutmeg', amount: 0.25, unit: 'tsp', metricAmount: 0.25, metricUnit: 'tsp' },
      { item: 'Cornstarch', amount: 2, unit: 'tbsp', metricAmount: 16, metricUnit: 'g' },
      { item: 'Lemon juice', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml' },
      { item: 'Butter', amount: 2, unit: 'tbsp', metricAmount: 28, metricUnit: 'g', note: 'cut into small cubes' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare Cinnamon Roll Crust',
        text: 'Preheat oven to 375°F (190°C). Set icing tubs aside for later. Open one can of cinnamon rolls. Place rolls on a floured sheet of parchment paper touching each other. Roll out with a rolling pin into a 12-inch circle. Gently transfer into a 9-inch pie dish, pressing into corners.'
      },
      {
        step: 2,
        title: 'Toss Spiced Apple Filling',
        text: 'In a large bowl, toss sliced apples with lemon juice, brown sugar, white sugar, cinnamon, nutmeg, and cornstarch until apples are well coated.'
      },
      {
        step: 3,
        title: 'Fill & Top with Cinnamon Lattice',
        text: 'Pour apples into the prepared bottom cinnamon roll crust and dot with butter cubes. Roll out the second can of cinnamon rolls into a circle or slice into strips to create a rustic cinnamon roll lattice crust on top. Crimp edges.'
      },
      {
        step: 4,
        title: 'Bake & Drizzle with Icing',
        text: 'Cover edges loosely with foil to prevent overbrowning. Bake for 40 to 45 minutes until apples are bubbly and crust is deep golden brown. Let cool for 20 minutes, then drizzle with the reserved vanilla icing tubs. Serve warm with vanilla ice cream!',
        suggestedMinutes: 45
      }
    ],
    nutrition: {
      calories: 440,
      fat: '16g',
      saturatedFat: '7g',
      cholesterol: '15mg',
      sodium: '410mg',
      carbohydrates: '72g',
      fiber: '4g',
      sugar: '46g',
      protein: '4g'
    },
    chefTips: [
      'Combining tart Granny Smith apples with sweet Honeycrisp gives the ideal balance of tartness and texture that won’t turn mushy.',
      'Place a foil-lined baking sheet on the rack below the pie in case any cinnamon juices bubble over.'
    ],
    storageTips: 'Store covered at room temperature for up to 2 days, or in the refrigerator for up to 5 days. Warm in the oven before serving.',
    comments: [
      {
        id: 'c10',
        author: 'Janice R.',
        date: '2024-03-27',
        rating: 5,
        content: 'This was the star of our Thanksgiving dessert table! Everyone asked for the recipe.'
      }
    ]
  },
  {
    id: 'spk-10',
    slug: 'southern-fried-cabbage-bacon',
    title: 'Southern Fried Cabbage with Bacon and Onion',
    tagline: 'Sweet caramelized cabbage, tender onions, and crispy smoky bacon skillet-fried in savory Southern drippings.',
    category: 'Side Dishes' as any,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-02-10',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    servings: 6,
    servingUnit: 'servings',
    difficulty: 'Easy',
    rating: 4.92,
    reviewsCount: 76,
    tags: ['Side Dish', 'Southern', 'Bacon', 'Cabbage', 'Keto', 'Quick Meal'],
    ingredients: [
      { item: 'Green cabbage', amount: 1, unit: 'large head', metricAmount: 1, metricUnit: 'head', note: 'cored and chopped into 1.5-inch pieces' },
      { item: 'Thick cut bacon', amount: 8, unit: 'slices', metricAmount: 8, metricUnit: 'slices', note: 'chopped into bite-size pieces' },
      { item: 'Sweet Vidalia onion', amount: 1, unit: 'large', metricAmount: 1, metricUnit: 'large', note: 'sliced thin' },
      { item: 'Garlic cloves', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', note: 'minced' },
      { item: 'Apple cider vinegar', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml' },
      { item: 'Brown sugar', amount: 1, unit: 'tsp', metricAmount: 4, metricUnit: 'g' },
      { item: 'Cajun or Creole seasoning', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' },
      { item: 'Crushed red pepper flakes', amount: 0.25, unit: 'tsp', metricAmount: 0.25, metricUnit: 'tsp' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Fry Bacon to Crisp',
        text: 'In a large deep skillet or cast iron pan over medium heat, fry the chopped bacon until browned and crispy. Transfer crispy bacon to a small plate, leaving the hot drippings in the skillet.',
        suggestedMinutes: 8
      },
      {
        step: 2,
        title: 'Caramelize the Onions',
        text: 'Add sliced Vidalia onion to the bacon drippings. Cook over medium heat for 5 minutes until soft and golden around edges. Stir in minced garlic and cook for 1 minute.',
        suggestedMinutes: 6
      },
      {
        step: 3,
        title: 'Add Cabbage and Seasonings',
        text: 'Add chopped cabbage in batches (it will cook down quickly!). Sprinkle with Cajun seasoning, apple cider vinegar, brown sugar, red pepper flakes, 1/2 tsp salt, and fresh black pepper.'
      },
      {
        step: 4,
        title: 'Cover and Cook to Tender',
        text: 'Toss thoroughly to coat in seasoned bacon fat. Cover skillet with a lid and cook for 8 to 10 minutes, stirring occasionally, until cabbage is tender with caramelized browned edges. Stir crisp bacon back in and serve warm!',
        suggestedMinutes: 10
      }
    ],
    nutrition: {
      calories: 195,
      fat: '13g',
      saturatedFat: '4.5g',
      cholesterol: '25mg',
      sodium: '480mg',
      carbohydrates: '14g',
      fiber: '5g',
      sugar: '7g',
      protein: '7g'
    },
    chefTips: [
      'The touch of apple cider vinegar cuts through the rich bacon fat and brings out the natural sweet flavors of the cabbage.',
      'Pair this side dish with pork chops, cornbread, or roasted chicken.'
    ],
    storageTips: 'Keeps wonderfully in the fridge for up to 4 days. Reheats nicely in a hot skillet.',
    comments: [
      {
        id: 'c11',
        author: 'George L.',
        date: '2024-03-01',
        rating: 5,
        content: 'Even people who say they don’t like cabbage eat seconds and thirds of this. Outstanding flavor.'
      }
    ]
  },
  {
    id: 'spk-11',
    slug: 'warm-spinach-artichoke-dip',
    title: 'Ultimate Warm Spinach Artichoke Dip',
    tagline: 'Creamy, bubbly restaurant-style dip loaded with tender artichokes, spinach, mozzarella, and Parmesan.',
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-01-28',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    servings: 10,
    servingUnit: 'party servings',
    difficulty: 'Easy',
    rating: 4.93,
    reviewsCount: 91,
    tags: ['Appetizer', 'Dip', 'Party Food', 'Game Day', 'Vegetarian', 'Cheese'],
    ingredients: [
      { item: 'Frozen chopped spinach', amount: 10, unit: 'oz', metricAmount: 280, metricUnit: 'g', note: 'thawed and squeezed completely dry' },
      { item: 'Canned artichoke hearts', amount: 14, unit: 'oz', metricAmount: 400, metricUnit: 'g', note: 'drained and coarsely chopped' },
      { item: 'Cream cheese', amount: 8, unit: 'oz', metricAmount: 225, metricUnit: 'g', note: 'softened' },
      { item: 'Sour cream', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'g' },
      { item: 'Mayonnaise', amount: 0.25, unit: 'cup', metricAmount: 60, metricUnit: 'g' },
      { item: 'Garlic cloves', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', note: 'finely minced' },
      { item: 'Shredded mozzarella cheese', amount: 1.5, unit: 'cups', metricAmount: 170, metricUnit: 'g' },
      { item: 'Grated Parmesan cheese', amount: 0.75, unit: 'cup', metricAmount: 75, metricUnit: 'g' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Prep Ingredients & Dish',
        text: 'Preheat oven to 375°F (190°C). Grease a 1.5-quart shallow baking dish or 9-inch cast iron skillet.'
      },
      {
        step: 2,
        title: 'Combine Creamy Base',
        text: 'In a medium mixing bowl, beat softened cream cheese, sour cream, mayonnaise, minced garlic, 1/2 tsp salt, and black pepper until smooth.'
      },
      {
        step: 3,
        title: 'Fold Vegetables and Cheeses',
        text: 'Fold in the squeezed dry spinach, chopped artichoke hearts, 1 cup of mozzarella cheese, and 1/2 cup of Parmesan cheese.'
      },
      {
        step: 4,
        title: 'Bake to Bubbly Golden',
        text: 'Spread mixture into the prepared baking dish. Top with remaining mozzarella and Parmesan. Bake uncovered for 20 minutes until hot and bubbly, then broil on high for 2 minutes for a golden toasted cheese crust. Serve with warm tortilla chips or sliced baguette.',
        suggestedMinutes: 20
      }
    ],
    nutrition: {
      calories: 220,
      fat: '18g',
      saturatedFat: '9g',
      cholesterol: '45mg',
      sodium: '360mg',
      carbohydrates: '6g',
      fiber: '2g',
      sugar: '2g',
      protein: '9g'
    },
    chefTips: [
      'The #1 secret to a non-watery dip: squeeze the thawed spinach in a clean kitchen towel until bone dry before mixing.',
      'Can be made up to 2 days ahead! Cover with foil and refrigerate until ready to bake.'
    ],
    storageTips: 'Store in the fridge for up to 4 days. Reheat in the microwave or oven until bubbly.',
    comments: [
      {
        id: 'c12',
        author: 'Samantha D.',
        date: '2024-02-11',
        rating: 5,
        content: 'This was the first dish to disappear at our Super Bowl gathering. Everyone asked for the recipe!'
      }
    ]
  },
  {
    id: 'spk-12',
    slug: 'lemon-blueberry-pound-cake',
    title: 'Glazed Lemon Blueberry Pound Cake',
    tagline: 'Moist, buttery Southern pound cake bursting with sweet blueberries and topped with a bright lemon glaze.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80',
    author: 'Sweet Pea',
    datePublished: '2024-03-12',
    prepTimeMinutes: 20,
    cookTimeMinutes: 55,
    totalTimeMinutes: 75,
    servings: 10,
    servingUnit: 'thick slices',
    difficulty: 'Easy',
    rating: 4.94,
    reviewsCount: 124,
    tags: ['Cake', 'Dessert', 'Lemon', 'Blueberry', 'Baking', 'Southern', 'Breakfast'],
    ingredients: [
      { item: 'All-purpose flour', amount: 2.5, unit: 'cups', metricAmount: 310, metricUnit: 'g' },
      { item: 'Unsalted butter', amount: 1, unit: 'cup', metricAmount: 225, metricUnit: 'g', note: 'softened at room temp' },
      { item: 'Granulated sugar', amount: 1.5, unit: 'cups', metricAmount: 300, metricUnit: 'g' },
      { item: 'Large eggs', amount: 4, unit: 'large', metricAmount: 4, metricUnit: 'large', note: 'room temperature' },
      { item: 'Baking powder', amount: 1, unit: 'tsp', metricAmount: 1, metricUnit: 'tsp' },
      { item: 'Fresh lemon juice', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'ml' },
      { item: 'Fresh lemon zest', amount: 2, unit: 'tbsp', metricAmount: 2, metricUnit: 'tbsp' },
      { item: 'Sour cream', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'g' },
      { item: 'Fresh blueberries', amount: 2, unit: 'cups', metricAmount: 300, metricUnit: 'g' },
      { item: 'Powdered sugar (for glaze)', amount: 1, unit: 'cup', metricAmount: 120, metricUnit: 'g' },
      { item: 'Fresh lemon juice (for glaze)', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Preheat Oven and Loaf Pan',
        text: 'Preheat oven to 350°F (175°C). Grease and flour a 9x5-inch loaf pan or line with parchment paper with an overhang.'
      },
      {
        step: 2,
        title: 'Cream Butter and Sugar',
        text: 'In a large stand mixer, beat softened butter, granulated sugar, and fresh lemon zest on medium-high speed for 4 minutes until pale, light, and fluffy. Add eggs one at a time, beating well after each addition.',
        suggestedMinutes: 5
      },
      {
        step: 3,
        title: 'Alternating Additions & Toss Berries',
        text: 'In a bowl, whisk flour, baking powder, and 1/2 tsp salt. In a separate bowl, whisk sour cream and 3 tbsp lemon juice. Alternate adding flour mixture and sour cream to the butter mixture on low speed until just combined. Toss blueberries in 1 tablespoon of extra flour (this prevents them from sinking!) and gently fold into batter.'
      },
      {
        step: 4,
        title: 'Bake to Golden & Glaze',
        text: 'Pour batter into prepared loaf pan and smooth top. Bake for 55 to 65 minutes until a toothpick inserted into center comes out clean. Cool 20 minutes in pan, then transfer to wire rack. Whisk powdered sugar with 2 tbsp lemon juice and drizzle over cooled cake.',
        suggestedMinutes: 60
      }
    ],
    nutrition: {
      calories: 395,
      fat: '17g',
      saturatedFat: '10g',
      cholesterol: '105mg',
      sodium: '190mg',
      carbohydrates: '57g',
      fiber: '2g',
      sugar: '38g',
      protein: '5g'
    },
    chefTips: [
      'Tossing blueberries in 1 tablespoon of flour coats the skins so they float evenly suspended throughout the batter instead of sinking to the bottom.',
      'Allow the cake to cool fully before pouring the glaze, or the glaze will melt right off into a pool.'
    ],
    storageTips: 'Wrap tightly in foil or store in a cake dome for up to 4 days at room temperature.',
    comments: [
      {
        id: 'c13',
        author: 'Eleanor H.',
        date: '2024-03-20',
        rating: 5,
        content: 'The crumb is so velvety and tender! The lemon flavor is bright and pairs so well with afternoon coffee.'
      }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Casseroles',
  'Main Dishes',
  'Slow Cooker',
  'Desserts',
  'Soups & Salads',
  'Appetizers'
] as const;
