"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, DollarSign, Tag, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { createListing } from "@/lib/createListing";
import { toast } from "sonner";
const categories = [
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
import { supabase } from "@/lib/supabase";
export default function CreateListingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    seller_email: "",
    location: "Palo Alto, CA",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = "";

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("listing-images")
          .upload(fileName, selectedFile);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("listing-images")
          .getPublicUrl(fileName);

        image_url = publicUrlData?.publicUrl || "";
      }

      await createListing({ ...formData, image_url });
      setLoading(false);
      toast.success("Listing created!");
    } catch (err) {
      console.error("Failed to create listing:", err);
      setLoading(false);

      toast.error("Failed to create listing.");
    }
  };

  useEffect(() => {
    if (formRef.current) {
      fadeInUp(formRef.current, 0.2);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            ref={formRef}
            className="bg-white rounded-lg border lg:col-span-2 border-gray-200 p-6 md:p-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Create New Listing
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="image">Photo</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                      setSelectedFile(file);
                    }
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="What are you selling?"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your item..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="price">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Price *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="category">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="seller_email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Your Email *
                </Label>
                <Input
                  id="seller_email"
                  name="seller_email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.seller_email}
                  onChange={(e) =>
                    handleInputChange("seller_email", e.target.value)
                  }
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Create Listing
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            className="lg:col-span-3 h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Preview
            </h1>
            <motion.div
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm sticky top-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {/* Preview Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="aspect-square relative bg-gray-100 border-r border-gray-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-300 mb-2" />
                        <p className="text-gray-400 text-sm">
                          No image uploaded
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Preview Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {formData.title || "Your listing title will appear here"}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-3">
                      ${formData.price || "0.00"}
                    </p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{formData.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Tag className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {formData.category || "Category not selected"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-gray-600 text-sm mb-4">
                      {formData.description ||
                        "Your item description will appear here..."}
                    </p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        Contact:{" "}
                        {formData.seller_email || "your.email@example.com"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Message Seller
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
