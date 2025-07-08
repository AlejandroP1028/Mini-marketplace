-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  seller_email VARCHAR(255) NOT NULL,
  image_url TEXT,
  location VARCHAR(255) DEFAULT 'Palo Alto, CA',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  sender_email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table for reference
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name) VALUES 
  ('Electronics'),
  ('Vehicles'),
  ('Property Rentals'),
  ('Apparel'),
  ('Classifieds'),
  ('Entertainment'),
  ('Family'),
  ('Free Stuff'),
  ('Garden & Outdoor'),
  ('Hobbies'),
  ('Home Goods'),
  ('Home Improvement'),
  ('Home Sales'),
  ('Musical Instruments'),
  ('Office Supplies'),
  ('Pet Supplies'),
  ('Sporting Goods'),
  ('Toys & Games')
ON CONFLICT (name) DO NOTHING;

-- Insert sample listings
INSERT INTO listings (title, description, price, category, seller_email, location) VALUES 
  ('Bike 24 inch', 'Great condition mountain bike, perfect for kids or adults. Recently serviced with new tires.', 99.00, 'Sporting Goods', 'wei.gu@example.com', 'Palo Alto, CA'),
  ('iPhone 13 Pro', 'Excellent condition iPhone 13 Pro, 256GB, unlocked. Includes original box and charger.', 699.00, 'Electronics', 'john.doe@example.com', 'San Francisco, CA'),
  ('Vintage Leather Jacket', 'Authentic vintage leather jacket from the 80s. Size Medium, great condition.', 150.00, 'Apparel', 'sarah.smith@example.com', 'Berkeley, CA'),
  ('Gaming Chair', 'Ergonomic gaming chair with lumbar support. Black and red design, barely used.', 200.00, 'Home Goods', 'mike.wilson@example.com', 'San Jose, CA'),
  ('Guitar Acoustic', 'Beautiful acoustic guitar, perfect for beginners or professionals. Comes with case.', 300.00, 'Musical Instruments', 'lisa.brown@example.com', 'Oakland, CA');
