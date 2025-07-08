"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import type { Listing } from "@/lib/types";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current, index * 0.1);
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/listing/${listing.id}`}>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={listing.image_url || "/placeholder.svg?height=200&width=200"}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
              {listing.title}
            </h3>
            <p className="text-lg font-bold text-gray-900 mb-1">
              ${listing.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">{listing.location}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
