import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Error: DATABASE_URL not found in .env.local");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

// Cloudinary URLs from the previous upload run
const categoryImageUrls = {
  "raw-crystals": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968843/crystalseer/products/mqrzkhdjty1t4hsxrblu.jpg",
  "tumble-crystals": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968847/crystalseer/products/yjpab2ueu5jfdink0ige.jpg",
  "crystals-jwellery": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968851/crystalseer/products/eg3bwcqvnxeiu0fhcxbq.jpg",
  "crystals-anklet": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968855/crystalseer/products/zejbwzr0gksalvzzpx54.jpg",
  "crystals-ganesha": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968857/crystalseer/products/ajkcmaexy0ih1e6d3c4o.jpg",
  "money-magnet-bowl": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968859/crystalseer/products/hdz9jno2piiuu7yokelp.jpg",
  "crystals-combination-pyramid-for-vastu": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968861/crystalseer/products/q4olg6u7tp9j8n7mupbu.jpg",
  "vastu-balancing-crystals-frames": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968863/crystalseer/products/ccbc2pg73cysgk4lapah.jpg",
  "selenite-charging-plate": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968865/crystalseer/products/mxwljhbn1bveilquaaqv.jpg",
  "crystals-rakhis": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968866/crystalseer/products/dxmnmtrx6wvdw4wpsy0j.jpg",
  "money-magnet-wallet-purse": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968868/crystalseer/products/okxupyooal2feid01lqc.jpg",
  "crystals-combination-keychains": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968870/crystalseer/products/ghxdmzwunpaw1ol6elod.jpg",
  "crystal-japamala": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968872/crystalseer/products/uuvjkl6omxh96wckzszg.jpg",
  "crystal-tortoise": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968874/crystalseer/products/fnnpxuqjohn7qlxjyeip.jpg",
  "karungali-mala-bracelet": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968875/crystalseer/products/kpz7ickoua2opwenrp5j.jpg",
  "rudraksha": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968877/crystalseer/products/agng48pcylptghf3x9n9.jpg",
  "crystals-hair-comb": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968879/crystalseer/products/ldllkvwiqxea7jobkovh.jpg",
  "crystals-guasha-face-roller": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968881/crystalseer/products/q7pro7zsmlrmx3yo1cmm.jpg",
  "zibu-coins": "https://res.cloudinary.com/dfesm5wul/image/upload/v1783968883/crystalseer/products/y4lzowpfysl7wilotjaf.jpg",
};

const newCategories = [
  { slug: "raw-crystals",                           name: "Raw Crystals",                               productType: "Raw",          desc: "Pure, unshaped raw crystals preserving maximum natural vibration." },
  { slug: "tumble-crystals",                        name: "Tumble Crystals",                            productType: "Raw",          desc: "Polished, smooth pocket crystals perfect for carrying or healing grids." },
  { slug: "crystals-jwellery",                      name: "Crystals Jwellery",                          productType: "Jewelry",      desc: "Handcrafted crystal jewelry to keep healing energies close to your pulse." },
  { slug: "crystals-anklet",                        name: "Crystals Anklet",                            productType: "Anklet",       desc: "Grounding and manifesting anklets for lower chakra alignment." },
  { slug: "crystals-ganesha",                       name: "Crystals Ganesha",                          productType: "Raw",          desc: "Idols of Lord Ganesha carved from natural crystals to remove Vastu defects." },
  { slug: "money-magnet-bowl",                      name: "Money Magnet Bowl",                         productType: "Bowl",         desc: "Complete wealth-attracting bowl arrangements for homes and offices." },
  { slug: "crystals-combination-pyramid-for-vastu", name: "Crystals Combination Pyramid For Vastu",    productType: "Pyramid",      desc: "Vastu pyramids coordinating planetary powers to heal space defects." },
  { slug: "vastu-balancing-crystals-frames",        name: "Vastu Balancing Crystals Frames",           productType: "Frame",        desc: "Auspicious Vastu frames embedded with raw crystal structures." },
  { slug: "selenite-charging-plate",                name: "Selenite Charging Plate",                   productType: "Plate",        desc: "Selenite plates to automatically clear and recharge other crystals." },
  { slug: "crystals-rakhis",                        name: "Crystals Rakhis",                           productType: "Rakhi",        desc: "Sacred crystal rakhi threads to bless siblings with health and wealth." },
  { slug: "money-magnet-wallet-purse",              name: "Money Magnet Wallet/Purse",                 productType: "Wallet",       desc: "Energized wallets crafted to hold cash securely and avoid leakages." },
  { slug: "crystals-combination-keychains",         name: "Crystals Combination Keychains",            productType: "Keychain",     desc: "High-vibration crystal keychains for safe travels and success." },
  { slug: "crystal-japamala",                       name: "Crystal Japamala",                          productType: "Mala",         desc: "Traditional 108 beads chanting mala for spiritual attunement." },
  { slug: "crystal-tortoise",                       name: "Crystal Tortoise",                          productType: "Tortoise",     desc: "Vastu tortoises carved from wealth-boosting crystals for stability." },
  { slug: "karungali-mala-bracelet",                name: "Karungali Mala & Bracelet",                 productType: "Mala",         desc: "Original black ebony wood beads for shielding from toxic vibes." },
  { slug: "rudraksha",                              name: "Rudraksha",                                 productType: "Mala",         desc: "Aura-clearing authentic Nepalese Rudraksha beads for heart protection." },
  { slug: "crystals-hair-comb",                    name: "Crystals Hair Comb",                        productType: "Comb",         desc: "Unique crystal combs to energize scalp chakras during grooming." },
  { slug: "crystals-guasha-face-roller",            name: "Crystals Guasha & Face Roller",             productType: "Guasha/Roller",desc: "Facial massage tools to stimulate lymphatic drainage and reduce stress." },
  { slug: "zibu-coins",                             name: "Zibu Coins",                                productType: "Coin",         desc: "Engraved Zibu symbols on crystal coins to manifest wealth and luck." },
];

const newProducts = [
  { slug: "natural-raw-crystals-set",                  name: "Natural Raw Crystals Set",                    category: "raw-crystals",                           price: 49,  comparePrice: 65,  problemSlug: "peace-stress-relief",  desc: "Pure and unshaped energized raw crystals to maintain high-vibration spiritual aura.",                                                                                          benefits: ["Emits strong ground energy fields", "Ideal for altar space charging", "Cleanses space of low frequencies"] },
  { slug: "polished-tumble-crystals-pack",             name: "Polished Tumble Crystals Pack",               category: "tumble-crystals",                        price: 35,  comparePrice: 45,  problemSlug: "peace-stress-relief",  desc: "Smooth, polished pocket crystals designed to be carried or used in energy layouts.",                                                                                          benefits: ["Convenient for pocket carrying", "Smooth texture for anxiety relief", "Cleanses personal aura daily"] },
  { slug: "handcrafted-crystal-spiritual-jewelry",     name: "Handcrafted Crystal Spiritual Jewelry",       category: "crystals-jwellery",                      price: 55,  comparePrice: 75,  problemSlug: "love-relationships",   desc: "Elegant spiritual jewelry handcrafted with authentic energized crystal elements.",                                                                                             benefits: ["Constant alignment with skin contact", "Aesthetically pleasing design", "Healer activated and blessed"] },
  { slug: "maha-dhan-yog-anklet",                     name: "Maha Dhan Yog Anklet",                        category: "crystals-anklet",                        price: 39,  comparePrice: 50,  problemSlug: "wealth-abundance",     desc: "A specialized anklet to attract extreme wealth, business success, and financial opportunities.",                                                                              benefits: ["Attracts massive wealth opportunities", "Balances base chakra nodes", "Shields against financial drains"] },
  { slug: "raw-pyrite-anklet",                        name: "Raw Pyrite Anklet",                           category: "crystals-anklet",                        price: 42,  comparePrice: 55,  problemSlug: "wealth-abundance",     desc: "Bring the golden energy of Pyrite to your path. Worn to attract career success and positive leadership.",                                                                     benefits: ["Boosts manifestation of goals", "Shields from negative peer pressure", "Invokes positive cash flow"] },
  { slug: "love-relationship-anklet",                 name: "Love & Relationship Anklet",                  category: "crystals-anklet",                        price: 38,  comparePrice: 48,  problemSlug: "love-relationships",   desc: "Infused with Rose Quartz and Morganite to heal emotional blockages and attract soul relationships.",                                                                          benefits: ["Attracts harmonized partners", "Heals past emotional baggage", "Encourages deep self-worth"] },
  { slug: "7-chakra-balancing-anklet",                name: "7 Chakra Balancing Anklet",                   category: "crystals-anklet",                        price: 36,  comparePrice: 45,  problemSlug: "health-wellbeing",     desc: "Brings harmony and vital alignment to all major energy vortexes of the body.",                                                                                                benefits: ["Coordinates and vitalizes body chakras", "Dispels physical fatigue and blockages", "Encourages mental clarity"] },
  { slug: "aura-clearing-crystal-ganesha",            name: "Aura Clearing Crystal Ganesha",               category: "crystals-ganesha",                       price: 79,  comparePrice: 99,  problemSlug: "confidence-success",   desc: "Beautifully carved crystal Ganesha to clear obstacles, align Vastu energy, and bring divine protection to your home or office.",                                               benefits: ["Eliminates Vastu energy blocks", "Invites wisdom and new beginnings", "Carved from premium quartz stone"] },
  { slug: "prosperity-money-magnet-bowl",             name: "Prosperity Money Magnet Bowl",                category: "money-magnet-bowl",                      price: 85,  comparePrice: 110, problemSlug: "wealth-abundance",     desc: "A comprehensive wealth-attracting combination featuring Pyrite, Citrine, and Green Aventurine to place in your cash locker or office table.",                                 benefits: ["Magnetizes continuous cash flow", "Enhances office wealth corner energy", "Ideal for business storefronts"] },
  { slug: "vastu-correction-crystal-pyramid",         name: "Vastu Correction Crystal Pyramid",            category: "crystals-combination-pyramid-for-vastu", price: 95,  comparePrice: 125, problemSlug: "protection-positivity",desc: "A highly complex crystal pyramid configuration that neutralizes geopathic stress and directional Vastu errors.",                                                             benefits: ["Mitigates severe geopathic stress", "Harmonizes household relationships", "Creates an energy dome shield"] },
  { slug: "raw-pyrite-7-horses-frame",                name: "Raw Pyrite 7 Horses Frame",                   category: "vastu-balancing-crystals-frames",        price: 120, comparePrice: 150, problemSlug: "wealth-abundance",     desc: "Representing speed, progress, and financial victory, embedded with raw pyrite chunks for maximum financial draw.",                                                            benefits: ["Accelerates delayed career projects", "Attracts massive wealth growth", "Improves power dynamics at work"] },
  { slug: "vyapar-vriddhi-yantra-pyrite-frame",       name: "Vyapar Vriddhi Yantra Pyrite Frame",          category: "vastu-balancing-crystals-frames",        price: 130, comparePrice: 165, problemSlug: "confidence-success",   desc: "A sacred geometric yantra paired with raw pyrite to ensure continuous business sales and customer inflow.",                                                                   benefits: ["Boosts retail customer footprint", "Protects business from competitors envy", "Aids in settling unpaid dues"] },
  { slug: "natural-selenite-charging-plate",          name: "Natural Selenite Charging Plate",             category: "selenite-charging-plate",                price: 40,  comparePrice: 50,  problemSlug: "protection-positivity",desc: "An essential tool for any crystal collector. Never needs cleansing itself, and cleanses any crystal placed on it within hours.",                                            benefits: ["Automatically purifies other crystals", "Never holds negative vibrations", "Calms bedroom space ambiance"] },
  { slug: "money-magnet-rakhi",                       name: "Money Magnet Rakhi",                          category: "crystals-rakhis",                        price: 18,  comparePrice: 25,  problemSlug: "wealth-abundance",     desc: "Infused with Pyrite, Green Aventurine, and Citrine to draw success and money.",                                                                                               benefits: ["Attracts success and luck", "Healer-activated for prosperity", "Comfortable cotton weaving"] },
  { slug: "pyrite-zibu-rakhi",                        name: "Pyrite Zibu Rakhi",                           category: "crystals-rakhis",                        price: 19,  comparePrice: 28,  problemSlug: "wealth-abundance",     desc: "Combines powerful Pyrite energy with the Zibu symbol of abundance.",                                                                                                          benefits: ["Amplifies cash inflow", "Zibu symbol raises success aura", "Cleanses financial hurdles"] },
  { slug: "green-jade-zibu-rakhi",                    name: "Green Jade Zibu Rakhi",                       category: "crystals-rakhis",                        price: 18,  comparePrice: 25,  problemSlug: "wealth-abundance",     desc: "Brings long-term fortune, health, and career opportunities.",                                                                                                                 benefits: ["Nurtures business luck", "Shields physical health", "Encourages logical business minds"] },
  { slug: "all-purpose-rakhi",                        name: "All Purpose Rakhi",                           category: "crystals-rakhis",                        price: 22,  comparePrice: 30,  problemSlug: "protection-positivity",desc: "A complete combination for health, wealth, relationship harmony, and evil eye shielding.",                                                                                   benefits: ["Provides holistic spiritual cover", "Aligns all minor chakras", "Brings absolute inner peace"] },
  { slug: "dhan-yog-rakhi",                           name: "Dhan Yog Rakhi",                              category: "crystals-rakhis",                        price: 20,  comparePrice: 28,  problemSlug: "wealth-abundance",     desc: "Targeted specifically to create planetary alignments for financial gains.",                                                                                                    benefits: ["Creates auspicious wealth flows", "Balances energy of wealth nodes", "Promotes career advancements"] },
  { slug: "good-lucky-rakhi",                         name: "Good Lucky Rakhi",                            category: "crystals-rakhis",                        price: 17,  comparePrice: 24,  problemSlug: "confidence-success",   desc: "A bright lucky charm to clear misfortune and bring high-vibration opportunities.",                                                                                            benefits: ["Clears negative karma blocks", "Invites fortune into new jobs", "Improves overall confidence"] },
  { slug: "triple-protection-rakhi",                  name: "Triple Protection Rakhi",                     category: "crystals-rakhis",                        price: 21,  comparePrice: 30,  problemSlug: "protection-positivity",desc: "Combines Hematite, Tigers Eye, and Black Obsidian to shield against all negative eyes and energies.",                                                                       benefits: ["Powerful shield from toxic thoughts", "Absorbs psychic attacks or stress", "Increases grounding and patience"] },
  { slug: "7-chakra-balancing-rakhi",                 name: "7 Chakra Balancing Rakhi",                    category: "crystals-rakhis",                        price: 18,  comparePrice: 25,  problemSlug: "health-wellbeing",     desc: "Balances all seven energy centers of the body for complete wellbeing.",                                                                                                       benefits: ["Keeps body centers in rhythm", "Supports physical health", "Encourages positive mental flows"] },
  { slug: "abundance-money-magnet-wallet",            name: "Abundance Money Magnet Wallet",               category: "money-magnet-wallet-purse",              price: 65,  comparePrice: 85,  problemSlug: "wealth-abundance",     desc: "Specially designed wallet featuring a hidden chamber holding small Pyrite chips and an engraved Zibu wealth coin.",                                                          benefits: ["Attracts regular income streams", "Prevents unnecessary expense leakages", "Keeps cash energy high and clean"] },
  { slug: "money-magnet-zibu-keychain",               name: "Money Magnet Zibu Keychain",                  category: "crystals-combination-keychains",         price: 15,  comparePrice: 22,  problemSlug: "wealth-abundance",     desc: "Features Pyrite and Aventurine beads alongside a mini brass Zibu symbol.",                                                                                                    benefits: ["Draws luck to your transport", "Keeps wealth energy active", "Highly durable brass clip"] },
  { slug: "success-keychain",                         name: "Success Keychain",                            category: "crystals-combination-keychains",         price: 14,  comparePrice: 20,  problemSlug: "confidence-success",   desc: "A combination of Citrine and Clear Quartz to bring success in exams, interviews, and pitches.",                                                                              benefits: ["Aids clarity during stress", "Maintains sharp mental focus", "Invites high-vibrational outcomes"] },
  { slug: "triple-protection-keychain",               name: "Triple Protection Keychain",                  category: "crystals-combination-keychains",         price: 16,  comparePrice: 24,  problemSlug: "protection-positivity",desc: "Combines Black Obsidian, Tigers Eye, and Hematite for safe travel and EMF shield.",                                                                                        benefits: ["Shields against road mishaps", "Grounds emotional outbursts", "Wards off malicious intents"] },
  { slug: "prosperity-keychain",                      name: "Prosperity Keychain",                         category: "crystals-combination-keychains",         price: 15,  comparePrice: 22,  problemSlug: "wealth-abundance",     desc: "Green Aventurine and Jade beads for constant business luck and investments.",                                                                                                 benefits: ["Invites profit-making client links", "Attracts general good fortune", "Excellent gift for business owners"] },
  { slug: "abundance-keychain",                       name: "Abundance Keychain",                          category: "crystals-combination-keychains",         price: 15,  comparePrice: 22,  problemSlug: "wealth-abundance",     desc: "Pyrite and Citrine beads to attract financial stability and job growth.",                                                                                                     benefits: ["Magnifies daily income paths", "Supports promotion discussions", "Activates personal goals"] },
  { slug: "108-beads-energized-crystal-japamala",     name: "108 Beads Energized Crystal Japamala",        category: "crystal-japamala",                       price: 50,  comparePrice: 70,  problemSlug: "peace-stress-relief",  desc: "Hand-knotted 108 authentic crystal beads, perfect for Japa meditation, clearing deep karma, and aligning cosmic frequencies.",                                                benefits: ["Enhances meditation depth", "Clears head congestion and stress", "Stretched with premium durable threads"] },
  { slug: "raw-pyrite-tortoise",                      name: "Raw Pyrite Tortoise",                         category: "crystal-tortoise",                       price: 58,  comparePrice: 75,  problemSlug: "wealth-abundance",     desc: "Combines the longevity and grounding of the tortoise with the fast manifestation properties of Pyrite.",                                                                     benefits: ["Brings stable long-term wealth", "Neutralizes negative home energies", "Ideal for North-East placement"] },
  { slug: "dhan-yog-tortoise",                        name: "Dhan Yog Tortoise",                           category: "crystal-tortoise",                       price: 52,  comparePrice: 68,  problemSlug: "wealth-abundance",     desc: "A dual-crystal tortoise carved from Green Aventurine to attract financial luck and robust health.",                                                                           benefits: ["Attracts sound investments", "Protects health of family members", "Improves overall Vastu score"] },
  { slug: "original-karungali-ebony-mala-bracelet-set",name: "Original Karungali Ebony Mala & Bracelet Set",category: "karungali-mala-bracelet",              price: 45,  comparePrice: 60,  problemSlug: "protection-positivity",desc: "Ethically sourced high-grade black ebony wood (Karungali). Provides complete protection from negative spirits, builds courage, and balances Mars.",                       benefits: ["Protects from dark magic/evil eye", "Wards off depression and anxiety", "Balances weak Mars alignments"] },
  { slug: "sacred-nepalese-rudraksha-mala",           name: "Sacred Nepalese Rudraksha Mala",              category: "rudraksha",                              price: 38,  comparePrice: 50,  problemSlug: "health-wellbeing",     desc: "Indian-sourced authentic Rudraksha beads strung in traditional threads. Lowers blood pressure, grounds active nerves, and creates a clean energetic shell.",              benefits: ["Soothes nervous stress and panic", "Lowers physical hyper-activity", "Brings absolute divine peace"] },
  { slug: "rose-quartz-hair-comb",                   name: "Rose Quartz Hair Comb",                       category: "crystals-hair-comb",                     price: 29,  comparePrice: 38,  problemSlug: "love-relationships",   desc: "A self-care comb made of Rose Quartz to nurture feelings of self-love while stimulating the crown chakra.",                                                                  benefits: ["Activates deep relaxation nodes", "Invokes warm feelings of self-love", "Gently detangles scalp energies"] },
  { slug: "green-jade-hair-comb",                    name: "Green Jade Hair Comb",                        category: "crystals-hair-comb",                     price: 29,  comparePrice: 38,  problemSlug: "health-wellbeing",     desc: "Promotes scalp health, good luck, and general vitality during your morning routine.",                                                                                         benefits: ["Stimulates hair follicles healthily", "Clears morning sluggishness", "Attracts abundance energies"] },
  { slug: "rose-quartz-guasha-face-roller-set",      name: "Rose Quartz Guasha & Face Roller Set",        category: "crystals-guasha-face-roller",            price: 35,  comparePrice: 48,  problemSlug: "love-relationships",   desc: "Improves blood flow, helps drain lymphatic fluids, and reduces facial stress using cooling rose quartz.",                                                                    benefits: ["Boosts lymphatic detoxification", "Cools down inflamed skin tissues", "Relieves jaw tension and headaches"] },
  { slug: "green-jade-guasha-face-roller-set",       name: "Green Jade Guasha & Face Roller Set",         category: "crystals-guasha-face-roller",            price: 35,  comparePrice: 48,  problemSlug: "health-wellbeing",     desc: "Authentic Green Jade stone to sculpt features, ease facial tension, and align skin vitality.",                                                                                benefits: ["Soothes cellular muscle stress", "Enhances blood circulation", "Aligns healthy skin energy"] },
  { slug: "green-jade-zibu-coins",                   name: "Green Jade Zibu Coins",                       category: "zibu-coins",                             price: 15,  comparePrice: 22,  problemSlug: "wealth-abundance",     desc: "Features the Zibu abundance symbol engraved on polished Green Jade. Excellent for placing in purses or cash registers.",                                                     benefits: ["Draws luck to financial investments", "Prevents money from blocking", "Highly portable lucky charm"] },
  { slug: "raw-pyrite-zibu-coins",                   name: "Raw Pyrite Zibu Coins",                       category: "zibu-coins",                             price: 17,  comparePrice: 25,  problemSlug: "wealth-abundance",     desc: "The absolute wealth magnet. Pyrite properties doubled with the Zibu abundance geometry.",                                                                                     benefits: ["Accelerates wealth manifestation", "Wards off jealousy in retail spaces", "Draws high-value client deals"] },
];

const HOW_TO_USE = "Cleanse under running water or place on a Selenite charging plate. Program with your specific intentions during a quiet meditation.";

async function main() {
  console.log("Connecting to Supabase PostgreSQL database...");
  await client.connect();
  console.log("Connected successfully!\n");

  // ─── Seed Categories ────────────────────────────────────────────────────────
  console.log(`Seeding ${newCategories.length} categories...`);
  for (const cat of newCategories) {
    await client.query(`
      INSERT INTO categories (id, name, description, icon)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
    `, [cat.slug, cat.name, cat.desc, cat.productType]);
    console.log(`  ✓ ${cat.name}`);
  }
  console.log("Categories done.\n");

  // ─── Seed Products ───────────────────────────────────────────────────────────
  console.log(`Seeding ${newProducts.length} products...`);
  for (const prod of newProducts) {
    const imageUrl = categoryImageUrls[prod.category] || "";
    const sku = `CS-${prod.slug.substring(0, 4).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`;
    const specs = JSON.stringify({
      price:        prod.price.toString(),
      compareAtPrice: prod.comparePrice.toString(),
      rating:       "4.8"
    });

    await client.query(`
      INSERT INTO products (
        id, name, category, sku, short_benefit, description, how_to_use,
        is_best_seller, image, benefits, ingredients, specs, has_details,
        problem_category_slug
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      ON CONFLICT (id) DO UPDATE
      SET name              = EXCLUDED.name,
          category          = EXCLUDED.category,
          sku               = EXCLUDED.sku,
          short_benefit     = EXCLUDED.short_benefit,
          description       = EXCLUDED.description,
          how_to_use        = EXCLUDED.how_to_use,
          is_best_seller    = EXCLUDED.is_best_seller,
          image             = EXCLUDED.image,
          benefits          = EXCLUDED.benefits,
          ingredients       = EXCLUDED.ingredients,
          specs             = EXCLUDED.specs,
          has_details       = EXCLUDED.has_details,
          problem_category_slug = EXCLUDED.problem_category_slug;
    `, [
      prod.slug,
      prod.name,
      prod.category,
      sku,
      prod.benefits[0],
      prod.desc,
      HOW_TO_USE,
      false,
      imageUrl,
      JSON.stringify(prod.benefits),
      JSON.stringify([]),
      specs,
      true,
      prod.problemSlug,
    ]);
    console.log(`  ✓ ${prod.name}`);
  }
  console.log("\nAll products seeded successfully!");

  await client.end();
}

main().catch(err => {
  console.error("Seeding failed:", err.message);
  client.end();
  process.exit(1);
});
