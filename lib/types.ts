export type Listing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  seller_email: string
  image_url?: string
  location: string
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  listing_id: string
  sender_email: string
  message: string
  created_at: string
}
