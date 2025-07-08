"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ListingGrid from "@/components/ListingGrid";
import type { Listing } from "@/lib/types";

// Sample data for demonstration
// const sampleListings: Listing[] = [
//   {
//     id: "1",
//     title: "Bike 24 inch",
//     description: "Great condition mountain bike",
//     price: 99.0,
//     category: "Sporting Goods",
//     seller_email: "seller@example.com",
//     location: "Palo Alto, CA",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     image_url: "/placeholder.svg?height=400&width=400",
//   },
//   {
//     id: "2",
//     title: "iPhone 13 Pro",
//     description: "Excellent condition iPhone",
//     price: 699.0,
//     category: "Electronics",
//     seller_email: "seller@example.com",
//     location: "San Francisco, CA",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     image_url: "/placeholder.svg?height=400&width=400",
//   },
// ];

import { mockListings } from "@/lib/mockData";
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [listings] = useState<Listing[]>(mockListings);

  const filteredListings =
    selectedCategory === "All Categories"
      ? listings
      : listings.filter((listing) => listing.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ListingGrid
          listings={filteredListings}
          title={
            selectedCategory === "All Categories"
              ? "Today's picks"
              : selectedCategory
          }
        />
      </div>
    </div>
  );
}
