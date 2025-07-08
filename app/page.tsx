"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ListingGrid from "@/components/ListingGrid";
import type { Listing } from "@/lib/types";
import { getListings } from "@/lib/db";
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        setError("Failed to load listings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
