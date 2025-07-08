import { supabase } from "@/lib/supabase";

/**
 * Creates a new listing in the "listings" table using the provided data.
 *
 * @param data - An object containing the listing details.
 * @param data.title - The title of the listing.
 * @param [data.description] - An optional description of the listing.
 * @param data.price - The price of the listing as a string (will be parsed to float).
 * @param data.category - The category of the listing.
 * @param data.seller_email - The email address of the seller.
 * @param [data.location] - An optional location for the listing.
 * @param [data.image_url] - An optional image URL for the listing.
 * @throws Will throw an error if the insertion into the database fails.
 */

export const createListing = async (data: {
  title: string;
  description?: string;
  price: string;
  category: string;
  seller_email: string;
  location?: string;
  image_url?: string;
}) => {
  const { error } = await supabase.from("listings").insert({
    title: data.title,
    description: data.description || "",
    price: parseFloat(data.price),
    category: data.category,
    seller_email: data.seller_email,
    location: data.location || "",
    image_url: data.image_url || "",
  });

  if (error) throw error;
};
