"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { slideInLeft } from "@/lib/animations";

const categories = [
  "All Categories",
  "Electronics",
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
];

interface CategorySidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategorySidebar({
  selectedCategory = "All Categories",
  onCategoryChange,
}: CategorySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      slideInLeft(sidebarRef.current, 0.2);
    }
  }, []);

  return (
    <motion.div
      ref={sidebarRef}
      className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <ul className="space-y-1">
          {categories.map((category, index) => (
            <motion.li
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => onCategoryChange?.(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
