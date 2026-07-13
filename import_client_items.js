import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectionString = process.env.DATABASE_URL;

// 19 categories from client productsanditems.md
const newCategories = [
  { slug: "raw-crystals", name: "Raw Crystals", productType: "Raw", imageFile: "image.png", desc: "Pure, unshaped raw crystals preserving maximum natural vibration." },
  { slug: "tumble-crystals", name: "Tumble Crystals", productType: "Raw", imageFile: "image-1.png", desc: "Polished, smooth pocket crystals perfect for carrying or healing grids." },
  { slug: "crystals-jwellery", name: "Crystals Jwellery", productType: "Jewelry", imageFile: "image-2.png", desc: "Handcrafted crystal jewelry to keep healing energies close to your pulse." },
  { slug: "crystals-anklet", name: "Crystals Anklet", productType: "Anklet", imageFile: "image-3.png", desc: "Grounding and manifesting anklets for lower chakra alignment." },
  { slug: "crystals-ganesha", name: "Crystals Ganesha", productType: "Raw", imageFile: "image-4.png", desc: "Idols of Lord Ganesha carved from natural crystals to remove Vastu defects." },
  { slug: "money-magnet-bowl", name: "Money Magnet Bowl", productType: "Bowl", imageFile: "image-5.png", desc: "Complete wealth-attracting bowl arrangements for homes and offices." },
  { slug: "crystals-combination-pyramid-for-vastu", name: "Crystals Combination Pyramid For Vastu", productType: "Pyramid", imageFile: "image-6.png", desc: "Vastu pyramids coordinating planetary powers to heal space defects." },
  { slug: "vastu-balancing-crystals-frames", name: "Vastu Balancing Crystals Frames", productType: "Frame", imageFile: "image-7.png", desc: "Auspicious Vastu frames embedded with raw crystal structures." },
  { slug: "selenite-charging-plate", name: "Selenite Charging Plate", productType: "Plate", imageFile: "image-8.png", desc: "Selenite plates to automatically clear and recharge other crystals." },
  { slug: "crystals-rakhis", name: "Crystals Rakhis", productType: "Rakhi", imageFile: "image-9.png", desc: "Sacred crystal rakhi threads to bless siblings with health and wealth." },
  { slug: "money-magnet-wallet-purse", name: "Money Magnet Wallet/Purse", productType: "Wallet", imageFile: "image-10.png", desc: "Energized wallets crafted to hold cash securely and avoid leakages." },
  { slug: "crystals-combination-keychains", name: "Crystals Combination Keychains", productType: "Keychain", imageFile: "image-11.png", desc: "High-vibration crystal keychains for safe travels and success." },
  { slug: "crystal-japamala", name: "Crystal Japamala", productType: "Mala", imageFile: "image-12.png", desc: "Traditional 108 beads chanting mala for spiritual attunement." },
  { slug: "crystal-tortoise", name: "Crystal Tortoise", productType: "Tortoise", imageFile: "image-13.png", desc: "Vastu tortoises carved from wealth-boosting crystals for stability." },
  { slug: "karungali-mala-bracelet", name: "Karungali Mala & Bracelet", productType: "Mala", imageFile: "image-14.png", desc: "Original black ebony wood beads for shielding from toxic vibes." },
  { slug: "rudraksha", name: "Rudraksha", productType: "Mala", imageFile: "image-15.png", desc: "Aura-clearing authentic Nepalese Rudraksha beads for heart protection." },
  { slug: "crystals-hair-comb", name: "Crystals Hair Comb", productType: "Comb", imageFile: "image-16.png", desc: "Unique crystal combs to energize scalp chakras during grooming." },
  { slug: "crystals-guasha-face-roller", name: "Crystals Guasha & Face Roller", productType: "Guasha/Roller", imageFile: "image-17.png", desc: "Facial massage tools to stimulate lymphatic drainage and reduce stress." },
  { slug: "zibu-coins", name: "Zibu Coins", productType: "Coin", imageFile: "image-18.png", desc: "Engraved Zibu symbols on crystal coins to manifest wealth and luck." },
];

const newProducts = [
  // Raw Crystals
  { slug: "natural-raw-crystals-set", name: "Natural Raw Crystals Set", category: "raw-crystals", desc: "Pure and unshaped energized raw crystals to maintain high-vibration spiritual aura.", price: 49, comparePrice: 65, problemSlug: "peace-stress-relief", benefits: ["Emits strong ground energy fields", "Ideal for altar space charging", "Cleanses space of low frequencies"] },
  // Tumble Crystals
  { slug: "polished-tumble-crystals-pack", name: "Polished Tumble Crystals Pack", category: "tumble-crystals", desc: "Smooth, polished pocket crystals designed to be carried or used in energy layouts.", price: 35, comparePrice: 45, problemSlug: "peace-stress-relief", benefits: ["Convenient for pocket carrying", "Smooth texture for anxiety relief", "Cleanses personal aura daily"] },
  // Crystals Jwellery
  { slug: "handcrafted-crystal-spiritual-jewelry", name: "Handcrafted Crystal Spiritual Jewelry", category: "crystals-jwellery", desc: "Elegant spiritual jewelry handcrafted with authentic energized crystal elements.", price: 55, comparePrice: 75, problemSlug: "love-relationships", benefits: ["Constant alignment with skin contact", "Aesthetically pleasing design", "Healer activated and blessed"] },
  // Crystals Anklet
  { slug: "maha-dhan-yog-anklet", name: "Maha Dhan Yog Anklet", category: "crystals-anklet", desc: "A specialized anklet to attract extreme wealth, business success, and financial opportunities.", price: 39, comparePrice: 50, problemSlug: "wealth-abundance", benefits: ["Attracts massive wealth opportunities", "Balances base chakra nodes", "Shields against financial drains"] },
  { slug: "raw-pyrite-anklet", name: "Raw Pyrite Anklet", category: "crystals-anklet", desc: "Bring the golden energy of Pyrite to your path. Worn to attract career success and positive leadership.", price: 42, comparePrice: 55, problemSlug: "wealth-abundance", benefits: ["Boosts manifestation of goals", "Shields from negative peer pressure", "Invokes positive cash flow"] },
  { slug: "love-relationship-anklet", name: "Love & Relationship Anklet", category: "crystals-anklet", desc: "Infused with Rose Quartz and Morganite to heal emotional blockages and attract soul relationships.", price: 38, comparePrice: 48, problemSlug: "love-relationships", benefits: ["Attracts harmonized partners", "Heals past emotional baggage", "Encourages deep self-worth"] },
  { slug: "7-chakra-balancing-anklet", name: "7 Chakra Balancing Anklet", category: "crystals-anklet", desc: "Brings harmony and vital alignment to all major energy vortexes of the body.", price: 36, comparePrice: 45, problemSlug: "health-wellbeing", benefits: ["Coordinates and vitalizes body chakras", "Dispels physical fatigue and blockages", "Encourages mental clarity"] },
  // Crystals Ganesha
  { slug: "aura-clearing-crystal-ganesha", name: "Aura Clearing Crystal Ganesha", category: "crystals-ganesha", desc: "Beautifully carved crystal Ganesha to clear obstacles, align Vastu energy, and bring divine protection to your home or office.", price: 79, comparePrice: 99, problemSlug: "confidence-success", benefits: ["Eliminates Vastu energy blocks", "Invites wisdom and new beginnings", "Carved from premium quartz stone"] },
  // Money Magnet Bowl
  { slug: "prosperity-money-magnet-bowl", name: "Prosperity Money Magnet Bowl", category: "money-magnet-bowl", desc: "A comprehensive wealth-attracting combination featuring Pyrite, Citrine, and Green Aventurine to place in your cash locker or office table.", price: 85, comparePrice: 110, problemSlug: "wealth-abundance", benefits: ["Magnetizes continuous cash flow", "Enhances office wealth corner energy", "Ideal for business storefronts"] },
  // Crystals Combination Pyramid For Vastu
  { slug: "vastu-correction-crystal-pyramid", name: "Vastu Correction Crystal Pyramid", category: "crystals-combination-pyramid-for-vastu", desc: "A highly complex crystal pyramid configuration that neutralizes geopathic stress and directional Vastu errors.", price: 95, comparePrice: 125, problemSlug: "protection-positivity", benefits: ["Mitigates severe geopathic stress", "Harmonizes household relationships", "Creates an energy dome shield"] },
  // Vastu Balancing Crystals Frames
  { slug: "raw-pyrite-7-horses-frame", name: "Raw Pyrite 7 Horses Frame", category: "vastu-balancing-crystals-frames", desc: "Representing speed, progress, and financial victory, embedded with raw pyrite chunks for maximum financial draw.", price: 120, comparePrice: 150, problemSlug: "wealth-abundance", benefits: ["Accelerates delayed career projects", "Attracts massive wealth growth", "Improves power dynamics at work"] },
  { slug: "vyapar-vriddhi-yantra-pyrite-frame", name: "Vyapar Vriddhi Yantra Pyrite Frame", category: "vastu-balancing-crystals-frames", desc: "A sacred geometric yantra paired with raw pyrite to ensure continuous business sales and customer inflow.", price: 130, comparePrice: 165, problemSlug: "confidence-success", benefits: ["Boosts retail customer footprint", "Protects business from competitors' envy", "Aids in settling unpaid dues"] },
  // Selenite Charging Plate
  { slug: "natural-selenite-charging-plate", name: "Natural Selenite Charging Plate", category: "selenite-charging-plate", desc: "An essential tool for any crystal collector. Never needs cleansing itself, and cleanses any crystal placed on it within hours.", price: 40, comparePrice: 50, problemSlug: "protection-positivity", benefits: ["Automatically purifies other crystals", "Never holds negative vibrations", "Calms bedroom space ambiance"] },
  // Crystals Rakhis
  { slug: "money-magnet-rakhi", name: "Money Magnet Rakhi", category: "crystals-rakhis", desc: "Infused with Pyrite, Green Aventurine, and Citrine to draw success and money.", price: 18, comparePrice: 25, problemSlug: "wealth-abundance", benefits: ["Attracts success and luck", "Healer-activated for prosperity", "Comfortable cotton weaving"] },
  { slug: "pyrite-zibu-rakhi", name: "Pyrite Zibu Rakhi", category: "crystals-rakhis", desc: "Combines powerful Pyrite energy with the Zibu symbol of abundance.", price: 19, comparePrice: 28, problemSlug: "wealth-abundance", benefits: ["Amplifies cash inflow", "Zibu symbol raises success aura", "Cleanses financial hurdles"] },
  { slug: "green-jade-zibu-rakhi", name: "Green Jade Zibu Rakhi", category: "crystals-rakhis", desc: "Brings long-term fortune, health, and career opportunities.", price: 18, comparePrice: 25, problemSlug: "wealth-abundance", benefits: ["Nurtures business luck", "Shields physical health", "Encourages logical business minds"] },
  { slug: "all-purpose-rakhi", name: "All Purpose Rakhi", category: "crystals-rakhis", desc: "A complete combination for health, wealth, relationship harmony, and evil eye shielding.", price: 22, comparePrice: 30, problemSlug: "protection-positivity", benefits: ["Provides holistic spiritual cover", "Aligns all minor chakras", "Brings absolute inner peace"] },
  { slug: "dhan-yog-rakhi", name: "Dhan Yog Rakhi", category: "crystals-rakhis", desc: "Targeted specifically to create planetary alignments for financial gains.", price: 20, comparePrice: 28, problemSlug: "wealth-abundance", benefits: ["Creates auspicious wealth flows", "Balances energy of wealth nodes", "Promotes career advancements"] },
  { slug: "good-lucky-rakhi", name: "Good Lucky Rakhi", category: "crystals-rakhis", desc: "A bright lucky charm to clear misfortune and bring high-vibration opportunities.", price: 17, comparePrice: 24, problemSlug: "confidence-success", benefits: ["Clears negative karma blocks", "Invites fortune into new jobs", "Improves overall confidence"] },
  { slug: "triple-protection-rakhi", name: "Triple Protection Rakhi", category: "crystals-rakhis", desc: "Combines Hematite, Tiger's Eye, and Black Obsidian to shield against all negative eyes and energies.", price: 21, comparePrice: 30, problemSlug: "protection-positivity", benefits: ["Powerful shield from toxic thoughts", "Absorbs psychic attacks or stress", "Increases grounding and patience"] },
  { slug: "7-chakra-balancing-rakhi", name: "7 Chakra Balancing Rakhi", category: "crystals-rakhis", desc: "Balances all seven energy centers of the body for complete wellbeing.", price: 18, comparePrice: 25, problemSlug: "health-wellbeing", benefits: ["Keeps body centers in rhythm", "Supports physical health", "Encourages positive mental flows"] },
  // Money Magnet Wallet/Purse
  { slug: "abundance-money-magnet-wallet", name: "Abundance Money Magnet Wallet", category: "money-magnet-wallet-purse", desc: "Specially designed wallet featuring a hidden chamber holding small Pyrite chips and an engraved Zibu wealth coin.", price: 65, comparePrice: 85, problemSlug: "wealth-abundance", benefits: ["Attracts regular income streams", "Prevents unnecessary expense leakages", "Keeps cash energy high and clean"] },
  // Crystals Combination Keychains
  { slug: "money-magnet-zibu-keychain", name: "Money Magnet Zibu Keychain", category: "crystals-combination-keychains", desc: "Features Pyrite and Aventurine beads alongside a mini brass Zibu symbol.", price: 15, comparePrice: 22, problemSlug: "wealth-abundance", benefits: ["Draws luck to your transport", "Keeps wealth energy active", "Highly durable brass clip"] },
  { slug: "success-keychain", name: "Success Keychain", category: "crystals-combination-keychains", desc: "A combination of Citrine and Clear Quartz to bring success in exams, interviews, and pitches.", price: 14, comparePrice: 20, problemSlug: "confidence-success", benefits: ["Aids clarity during stress", "Maintains sharp mental focus", "Invites high-vibrational outcomes"] },
  { slug: "triple-protection-keychain", name: "Triple Protection Keychain", category: "crystals-combination-keychains", desc: "Combines Black Obsidian, Tiger's Eye, and Hematite for safe travel and EMF shield.", price: 16, comparePrice: 24, problemSlug: "protection-positivity", benefits: ["Shields against road mishaps", "Grounds emotional outbursts", "Wards off malicious intents"] },
  { slug: "prosperity-keychain", name: "Prosperity Keychain", category: "crystals-combination-keychains", desc: "Green Aventurine and Jade beads for constant business luck and investments.", price: 15, comparePrice: 22, problemSlug: "wealth-abundance", benefits: ["Invites profit-making client links", "Attracts general good fortune", "Excellent gift for business owners"] },
  { slug: "abundance-keychain", name: "Abundance Keychain", category: "crystals-combination-keychains", desc: "Pyrite and Citrine beads to attract financial stability and job growth.", price: 15, comparePrice: 22, problemSlug: "wealth-abundance", benefits: ["Magnifies daily income paths", "Supports promotion discussions", "Activates personal goals"] },
  // Crystal Japamala
  { slug: "108-beads-energized-crystal-japamala", name: "108 Beads Energized Crystal Japamala", category: "crystal-japamala", desc: "Hand-knotted 108 authentic crystal beads, perfect for Japa meditation, clearing deep karma, and aligning cosmic frequencies.", price: 50, comparePrice: 70, problemSlug: "peace-stress-relief", benefits: ["Enhances meditation depth", "Clears head congestion and stress", "Stretched with premium durable threads"] },
  // Crystal Tortoise
  { slug: "raw-pyrite-tortoise", name: "Raw Pyrite Tortoise", category: "crystal-tortoise", desc: "Combines the longevity and grounding of the tortoise with the fast manifestation properties of Pyrite.", price: 58, comparePrice: 75, problemSlug: "wealth-abundance", benefits: ["Brings stable long-term wealth", "Neutralizes negative home energies", "Ideal for North-East placement"] },
  { slug: "dhan-yog-tortoise", name: "Dhan Yog Tortoise", category: "crystal-tortoise", desc: "A dual-crystal tortoise carved from Green Aventurine to attract financial luck and robust health.", price: 52, comparePrice: 68, problemSlug: "wealth-abundance", benefits: ["Attracts sound investments", "Protects health of family members", "Improves overall Vastu score"] },
  // Karungali Mala & Bracelet
  { slug: "original-karungali-ebony-mala-bracelet-set", name: "Original Karungali Ebony Mala & Bracelet Set", category: "karungali-mala-bracelet", desc: "Ethically sourced high-grade black ebony wood (Karungali). Provides complete protection from negative spirits, builds courage, and balances Mars.", price: 45, comparePrice: 60, problemSlug: "protection-positivity", benefits: ["Protects from dark magic/evil eye", "Wards off depression and anxiety", "Balances weak Mars alignments"] },
  // Rudraksha
  { slug: "sacred-nepalese-rudraksha-mala", name: "Sacred Nepalese Rudraksha Mala", category: "rudraksha", desc: "Indian-sourced authentic Rudraksha beads strung in traditional threads. Lowers blood pressure, grounds active nerves, and creates a clean energetic shell.", price: 38, comparePrice: 50, problemSlug: "health-wellbeing", benefits: ["Soothes nervous stress and panic", "Lowers physical hyper-activity", "Brings absolute divine peace"] },
  // Crystals Hair Comb
  { slug: "rose-quartz-hair-comb", name: "Rose Quartz Hair Comb", category: "crystals-hair-comb", desc: "A self-care comb made of Rose Quartz to nurture feelings of self-love while stimulating the crown chakra.", price: 29, comparePrice: 38, problemSlug: "love-relationships", benefits: ["Activates deep relaxation nodes", "Invokes warm feelings of self-love", "Gently detangles scalp energies"] },
  { slug: "green-jade-hair-comb", name: "Green Jade Hair Comb", category: "crystals-hair-comb", desc: "Promotes scalp health, good luck, and general vitality during your morning routine.", price: 29, comparePrice: 38, problemSlug: "health-wellbeing", benefits: ["Stimulates hair follicles healthily", "Clears morning sluggishness", "Attracts abundance energies"] },
  // Crystals Guasha & Face Roller
  { slug: "rose-quartz-guasha-face-roller-set", name: "Rose Quartz Guasha & Face Roller Set", category: "crystals-guasha-face-roller", desc: "Improves blood flow, helps drain lymphatic fluids, and reduces facial stress using cooling rose quartz.", price: 35, comparePrice: 48, problemSlug: "love-relationships", benefits: ["Boosts lymphatic detoxification", "Cools down inflamed skin tissues", "Relieves jaw tension and headaches"] },
  { slug: "green-jade-guasha-face-roller-set", name: "Green Jade Guasha & Face Roller Set", category: "crystals-guasha-face-roller", desc: "Authentic Green Jade stone to sculpt features, ease facial tension, and align skin vitality.", price: 35, comparePrice: 48, problemSlug: "health-wellbeing", benefits: ["Soothes cellular muscle stress", "Enhances blood circulation", "Aligns healthy skin energy"] },
  // Zibu Coins
  { slug: "green-jade-zibu-coins", name: "Green Jade Zibu Coins", category: "zibu-coins", desc: "Features the Zibu abundance symbol engraved on polished Green Jade. Excellent for placing in purses or cash registers.", price: 15, comparePrice: 22, problemSlug: "wealth-abundance", benefits: ["Draws luck to financial investments", "Prevents money from blocking", "Highly portable lucky charm"] },
  { slug: "raw-pyrite-zibu-coins", name: "Raw Pyrite Zibu Coins", category: "zibu-coins", desc: "The absolute wealth magnet. Pyrite properties doubled with the Zibu abundance geometry.", price: 17, comparePrice: 25, problemSlug: "wealth-abundance", benefits: ["Accelerates wealth manifestation", "Wards off jealousy in retail spaces", "Draws high-value client deals"] },
];

async function main() {
  // Ensure fallback folder exists
  const fallbackDir = path.join(__dirname, 'public', 'images', 'products');
  if (!fs.existsSync(fallbackDir)) {
    console.log(`Creating local directory for image fallbacks: ${fallbackDir}`);
    fs.mkdirSync(fallbackDir, { recursive: true });
  }

  const categoryImageMap = {};

  console.log(`Processing images and fallbacks for ${newCategories.length} categories...`);
  for (const cat of newCategories) {
    const localImagePath = path.join(__dirname, cat.imageFile);
    const fallbackImagePath = path.join(fallbackDir, cat.imageFile);
    let imageUrl = `/images/products/${cat.imageFile}`; // Default to local path

    // Copy file to local fallback folder
    if (fs.existsSync(localImagePath)) {
      console.log(`Copying fallback image for ${cat.name} to ${fallbackImagePath}...`);
      fs.copyFileSync(localImagePath, fallbackImagePath);
    } else {
      console.warn(`Warning: Local image file ${cat.imageFile} not found at root.`);
    }

    // Try to upload to Cloudinary if configured
    if (process.env.CLOUDINARY_API_KEY && fs.existsSync(localImagePath)) {
      try {
        console.log(`Uploading ${cat.imageFile} for ${cat.name} to Cloudinary...`);
        const uploadRes = await cloudinary.uploader.upload(localImagePath, {
          folder: 'crystalseer/products',
          quality: 'auto',
          fetch_format: 'auto',
        });
        if (uploadRes && uploadRes.secure_url) {
          imageUrl = uploadRes.secure_url;
          console.log(`✓ Cloudinary Upload success: ${imageUrl}`);
        }
      } catch (err) {
        console.error(`Cloudinary upload failed for ${cat.name}, using local fallback:`, err.message);
      }
    }

    categoryImageMap[cat.slug] = imageUrl;
  }

  // Database Connection & Seeding
  if (!connectionString) {
    console.warn("Warning: DATABASE_URL not found in .env.local. Skipping database operations.");
  } else {
    const client = new pg.Client({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    try {
      console.log("Connecting to Supabase PostgreSQL database to seed new products...");
      await client.connect();
      console.log("Connected successfully!");

      console.log(`Database: Seeding ${newCategories.length} categories...`);
      for (const cat of newCategories) {
        const insertCatSql = `
          INSERT INTO categories (id, name, description, icon)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO UPDATE 
          SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
        `;
        await client.query(insertCatSql, [cat.slug, cat.name, cat.desc, cat.productType]);
      }
      console.log("✓ Categories inserted in DB.");

      console.log(`Database: Seeding ${newProducts.length} products...`);
      for (const prod of newProducts) {
        const categoryImage = categoryImageMap[prod.category] || "";
        const sku = `CS-${prod.slug.substring(0, 4).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
        const howToUse = "Cleanse under running water or place on a Selenite charging plate. Program with your specific intentions during a quiet meditation.";
        
        const specsJson = {
          price: prod.price.toString(),
          compareAtPrice: prod.comparePrice.toString(),
          rating: "4.8"
        };

        const insertProdSql = `
          INSERT INTO products (
            id, name, category, sku, short_benefit, description, how_to_use, 
            is_best_seller, image, benefits, ingredients, specs, has_details,
            problem_category_slug
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE 
          SET name = EXCLUDED.name,
              category = EXCLUDED.category,
              sku = EXCLUDED.sku,
              short_benefit = EXCLUDED.short_benefit,
              description = EXCLUDED.description,
              how_to_use = EXCLUDED.how_to_use,
              is_best_seller = EXCLUDED.is_best_seller,
              image = EXCLUDED.image,
              benefits = EXCLUDED.benefits,
              ingredients = EXCLUDED.ingredients,
              specs = EXCLUDED.specs,
              has_details = EXCLUDED.has_details,
              problem_category_slug = EXCLUDED.problem_category_slug;
        `;

        await client.query(insertProdSql, [
          prod.slug,
          prod.name,
          prod.category,
          sku,
          prod.benefits[0] || "",
          prod.desc,
          howToUse,
          false,
          categoryImage,
          JSON.stringify(prod.benefits),
          JSON.stringify([]),
          JSON.stringify(specsJson),
          true,
          prod.problemSlug
        ]);
      }
      console.log("✓ Products inserted in DB.");

    } catch (error) {
      console.error("Database seeding failed:", error.message);
      console.log("We will proceed to update the local files so that the website can run locally on static fallback data.");
    } finally {
      try { await client.end(); } catch (e) {}
    }
  }

  // 4. Update the local JS files
  console.log("Updating local JS files...");
  const categoriesFile = path.resolve(__dirname, 'src/data/crystalCategories.js');
  const productsFile = path.resolve(__dirname, 'src/data/products.js');

  let localCategoriesCount = 0;
  if (fs.existsSync(categoriesFile)) {
    let content = fs.readFileSync(categoriesFile, 'utf8');
    const insertList = newCategories.map((c, idx) => {
      return `  {
    id: ${100 + idx},
    name: "${c.name}",
    slug: "${c.slug}",
    productType: "${c.productType}",
    imageUrl: "${categoryImageMap[c.slug]}"
  }`;
    }).join(',\n');

    // Find the last closing square bracket of the array
    const lastIndex = content.lastIndexOf('];');
    if (lastIndex !== -1) {
      const updated = content.substring(0, lastIndex) + ',\n' + insertList + '\n];\n';
      fs.writeFileSync(categoriesFile, updated, 'utf8');
      console.log("✓ Updated crystalCategories.js locally!");
      localCategoriesCount = newCategories.length;
    }
  }

  let localProductsCount = 0;
  if (fs.existsSync(productsFile)) {
    let content = fs.readFileSync(productsFile, 'utf8');
    const insertList = newProducts.map((p, idx) => {
      const imageUrl = categoryImageMap[p.category] || "";
      return `  {
    id: ${100 + idx},
    name: "${p.name}",
    slug: "${p.slug}",
    description: "${p.desc.replace(/"/g, '\\"')}",
    price: ${p.price}.00,
    compareAtPrice: ${p.comparePrice}.00,
    imageUrls: ["${imageUrl}"],
    problemCategorySlug: "${p.problemSlug}",
    crystalCategorySlug: "${p.category}",
    benefits: ${JSON.stringify(p.benefits)},
    rating: 4.8,
    isBestseller: false
  }`;
    }).join(',\n');

    const lastIndex = content.lastIndexOf('];');
    if (lastIndex !== -1) {
      const updated = content.substring(0, lastIndex) + ',\n' + insertList + '\n];\n';
      fs.writeFileSync(productsFile, updated, 'utf8');
      console.log("✓ Updated products.js locally!");
      localProductsCount = newProducts.length;
    }
  }

  console.log(`Summary: Imported ${localCategoriesCount} categories and ${localProductsCount} products locally.`);
}

main();
