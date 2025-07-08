"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, DollarSign, Tag, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

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
]

export default function CreateListingPage() {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      fadeInUp(formRef.current, 0.2)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Marketplace
          </Link>
        </motion.div>

        <motion.div ref={formRef} className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Create New Listing</h1>

          <form className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Label htmlFor="image">Photo</Label>
              <div className="mt-2">
                <motion.div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload a photo</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" placeholder="What are you selling?" required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your item..." rows={4} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="price">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price *
                </Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Label htmlFor="category">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Category *
                </Label>
                <Select required>
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Label htmlFor="seller_email">
                <Mail className="w-4 h-4 inline mr-1" />
                Your Email *
              </Label>
              <Input id="seller_email" name="seller_email" type="email" placeholder="your.email@example.com" required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Label htmlFor="location">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </Label>
              <Input id="location" name="location" placeholder="City, State" defaultValue="Palo Alto, CA" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Create Listing
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
