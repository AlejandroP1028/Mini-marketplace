import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
