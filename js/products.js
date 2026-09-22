// Toy Haven product catalogue. Prices are stored in Sri Lankan rupees (LKR).
const products = [
  {
    id: 1,
    name: "Classic Teddy Bear",
    category: "Plush Toys",
    age: "3+",
    price: 4950,
    oldPrice: 5500,
    image: "images/products/teddy-photo.png",
    stock: 18,
    rating: 4.8,
    description:
      "A soft classic teddy made for cuddles, gifting and everyday play.",
    details:
      "Soft-touch fabric, embroidered features and a 30 cm seated height.",
  },
  {
    id: 2,
    name: "Astronaut Explorer Figure",
    category: "Figurines",
    age: "6+",
    price: 7850,
    image: "images/products/astronaut-photo.png",
    stock: 9,
    rating: 4.7,
    description:
      "A detailed astronaut figure for children and space collectors.",
    details: "Includes a removable helmet, display stand and movable arms.",
  },
  {
    id: 3,
    name: "Kingdom Strategy Board Game",
    category: "Board Games",
    age: "10+",
    price: 8990,
    oldPrice: 9990,
    image: "images/products/strategy-game-photo.png",
    stock: 12,
    rating: 4.6,
    description:
      "A thoughtful strategy challenge for competitive family game nights.",
    details: "For 2–4 players with an average play time of 45 minutes.",
  },
  {
    id: 4,
    name: "Red Sports Car",
    category: "Diecast Cars",
    age: "8+",
    price: 6250,
    image: "images/products/sports-car-photo.png",
    stock: 7,
    rating: 4.5,
    description: "A glossy miniature sports car with a classic collector feel.",
    details: "1:32 scale metal body with opening doors and rolling wheels.",
  },
  {
    id: 5,
    name: "Robot Hero Figure",
    category: "Figurines",
    age: "6+",
    price: 6950,
    oldPrice: 7900,
    image: "images/products/robot-photo.png",
    stock: 15,
    rating: 4.7,
    description:
      "A colourful robot hero ready for action-packed imaginative play.",
    details:
      "Poseable joints, light-up chest panel and display-friendly design.",
  },
  {
    id: 6,
    name: "Creative Building Blocks",
    category: "Educational",
    age: "4+",
    price: 5750,
    image: "images/products/blocks-photo.png",
    stock: 24,
    rating: 4.9,
    description:
      "A bright block set that encourages imagination and hands-on building.",
    details: "Contains 120 reusable pieces in a convenient storage box.",
  },
  {
    id: 7,
    name: "Family Fun Card Game",
    category: "Board Games",
    age: "7+",
    price: 3850,
    image: "images/products/card-game-photo.png",
    stock: 20,
    rating: 4.4,
    description: "A quick and friendly card game for relaxed family evenings.",
    details: "For 2–6 players with simple rules and 15-minute rounds.",
  },
  {
    id: 8,
    name: "Classic Racing Car",
    category: "Diecast Cars",
    age: "8+",
    price: 8250,
    image: "images/products/racing-car-photo.png",
    stock: 5,
    rating: 4.8,
    description: "A premium miniature racing car for display and collections.",
    details: "1:24 scale model with detailed interior and rubber tyres.",
  },
  {
    id: 9,
    name: "Honey Bunny Plush",
    category: "Plush Toys",
    age: "3+",
    price: 4250,
    oldPrice: 4750,
    image: "images/products/honey-bunny.png",
    stock: 16,
    rating: 4.6,
    description: "A gentle plush bunny with long ears and a cosy cream finish.",
    details: "Washable surface, embroidered face and 28 cm seated height.",
  },
  {
    id: 10,
    name: "Solar System Puzzle",
    category: "Educational",
    age: "6+",
    price: 4650,
    image: "images/products/solar-puzzle.png",
    stock: 14,
    rating: 4.7,
    description:
      "Explore the planets while completing a colourful 100-piece puzzle.",
    details: "Includes a planet guide and a finished size of 50 × 35 cm.",
  },
  {
    id: 11,
    name: "Dinosaur Adventure Set",
    category: "Playsets",
    age: "5+",
    price: 7490,
    image: "images/products/dinosaur-set.png",
    stock: 11,
    rating: 4.5,
    description:
      "Create a prehistoric world with dinosaurs, trees and explorer pieces.",
    details: "A 24-piece playset supplied in a reusable carry case.",
  },
  {
    id: 12,
    name: "Wooden Shape Sorter",
    category: "Educational",
    age: "2+",
    price: 5250,
    image: "images/products/shape-sorter.png",
    stock: 13,
    rating: 4.8,
    description:
      "A colourful early-learning toy for matching shapes and colours.",
    details:
      "Smooth wooden pieces, rounded edges and child-safe water-based paint.",
  },
  {
    id: 13,
    name: "Mini City Bus",
    category: "Diecast Cars",
    age: "5+",
    price: 4450,
    oldPrice: 5200,
    image: "images/products/city-bus.png",
    stock: 8,
    rating: 4.3,
    description:
      "A detailed city bus model with free-moving wheels and opening doors.",
    details: "Durable diecast body in a compact 1:50 collector scale.",
  },
  {
    id: 14,
    name: "Magic Art Studio",
    category: "Arts & Crafts",
    age: "5+",
    price: 6350,
    image: "images/products/art-studio.png",
    stock: 19,
    rating: 4.6,
    description:
      "A creative kit filled with colourful tools for young artists.",
    details: "Includes crayons, pencils, paints, stickers and a drawing pad.",
  },
  {
    id: 15,
    name: "Junior Doctor Playset",
    category: "Playsets",
    age: "4+",
    price: 5990,
    image: "images/products/doctor-playset.png",
    stock: 10,
    rating: 4.7,
    description:
      "An imaginative role-play kit for caring for toys and learning through play.",
    details:
      "Contains a toy stethoscope, thermometer, case and eight accessories.",
  },
  {
    id: 16,
    name: "Ocean Memory Match",
    category: "Board Games",
    age: "4+",
    price: 3250,
    image: "images/products/ocean-memory.png",
    stock: 22,
    rating: 4.5,
    description:
      "Match friendly sea creatures in a simple memory-building game.",
    details: "Forty sturdy cards for 1–4 players and quick family rounds.",
  },
];

function getProduct(id) {
  return products.find((product) => product.id === Number(id));
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("toyHavenCart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("toyHavenCart", JSON.stringify(cart));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Number(value))
    .replace("LKR", "Rs.");
}
