"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      fadeInUp(headerRef.current);
    }
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Marketplace
              </span>
            </Link>
          </motion.div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Marketplace"
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create new listing</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
