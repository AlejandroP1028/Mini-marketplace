"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/lib/animations";
import ListingCard from "./ListingCard";
import type { Listing } from "@/lib/types";

interface ListingGridProps {
  listings: Listing[];
  title?: string;
}

export default function ListingGrid({
  listings,
  title = "Today's picks",
}: ListingGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      staggerChildren(gridRef.current, ".listing-card");
    }
  }, [listings]);

  return (
    <div className="flex-1 p-6">
      <motion.h2
        className="text-xl font-semibold text-gray-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        {listings.map((listing, index) => (
          <div key={listing.id} className="listing-card">
            <ListingCard listing={listing} index={index} />
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-500 text-lg">No listings found</p>
        </motion.div>
      )}
    </div>
  );
}
