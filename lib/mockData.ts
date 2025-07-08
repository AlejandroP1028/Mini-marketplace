export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller_email: string;
  image_url?: string;
  location: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  listing_id: string;
  sender_email: string;
  message: string;
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
};

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Bike 24 inch",
    description:
      "Great condition mountain bike, perfect for kids or adults. Recently serviced with new tires.",
    price: 99.0,
    category: "Sporting Goods",
    seller_email: "wei.gu@example.com",
    location: "Palo Alto, CA",
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    title: "iPhone 13 Pro",
    description:
      "Excellent condition iPhone 13 Pro, 256GB, unlocked. Includes original box and charger.",
    price: 699.0,
    category: "Electronics",
    seller_email: "john.doe@example.com",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    title: "Vintage Leather Jacket",
    description:
      "Authentic vintage leather jacket from the 80s. Size Medium, great condition.",
    price: 150.0,
    category: "Apparel",
    seller_email: "sarah.smith@example.com",
    location: "Berkeley, CA",
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    updated_at: new Date(Date.now() - 10800000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    title: "Gaming Chair",
    description:
      "Ergonomic gaming chair with lumbar support. Black and red design, barely used.",
    price: 200.0,
    category: "Home Goods",
    seller_email: "mike.wilson@example.com",
    location: "San Jose, CA",
    created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    updated_at: new Date(Date.now() - 14400000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "5",
    title: "Guitar Acoustic",
    description:
      "Beautiful acoustic guitar, perfect for beginners or professionals. Comes with case.",
    price: 300.0,
    category: "Musical Instruments",
    seller_email: "lisa.brown@example.com",
    location: "Oakland, CA",
    created_at: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    updated_at: new Date(Date.now() - 18000000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "6",
    title: "MacBook Pro 2021",
    description:
      "MacBook Pro 14-inch with M1 Pro chip, 16GB RAM, 512GB SSD. Excellent condition.",
    price: 1899.0,
    category: "Electronics",
    seller_email: "tech.seller@example.com",
    location: "Palo Alto, CA",
    created_at: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 21600000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "7",
    title: "Dining Table Set",
    description:
      "Beautiful wooden dining table with 6 chairs. Perfect for family dinners.",
    price: 450.0,
    category: "Home Goods",
    seller_email: "furniture.lover@example.com",
    location: "San Francisco, CA",
    created_at: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
    updated_at: new Date(Date.now() - 25200000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "8",
    title: "Tennis Racket",
    description:
      "Professional tennis racket, Wilson brand. Great for intermediate to advanced players.",
    price: 120.0,
    category: "Sporting Goods",
    seller_email: "tennis.pro@example.com",
    location: "Berkeley, CA",
    created_at: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
    updated_at: new Date(Date.now() - 28800000).toISOString(),
    image_url: "/placeholder.svg?height=400&width=400",
  },
];

export const mockMessages: Message[] = [];

// Helper function to simulate API delay
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
