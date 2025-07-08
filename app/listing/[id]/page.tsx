"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send, User, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/lib/animations";
import { supabase } from "@/lib/supabase";
import type { Listing } from "@/lib/types";

export default function ListingDetailPage() {
  const { id } = useParams();
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageRef.current) scaleIn(imageRef.current, 0.2);
    if (detailsRef.current) fadeInUp(detailsRef.current, 0.4);
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setListing(data);
      setLoading(false);
    };

    if (id) fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading listing...
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500 text-lg">Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Marketplace
          </Link>
        </motion.div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <motion.div
              ref={imageRef}
              className="aspect-square relative bg-gray-100"
            >
              <Image
                priority
                src={listing.image_url || "/placeholder.svg"}
                alt="Listing"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div ref={detailsRef} className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                <p className="text-3xl font-bold text-gray-900 mb-4">
                  ${parseFloat(listing.price).toFixed(2)}
                </p>

                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(listing.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{listing.location}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {listing.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center mb-6">
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Seller Information
                    </h3>
                    <p className="text-gray-600">{listing.seller_email}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Send seller a message
                </h3>

                <motion.form
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="I want to buy your item!"
                      rows={4}
                      required
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
