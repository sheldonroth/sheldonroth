'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  edition: string;
  category: string;
  image: string;
}

interface ShopClientProps {
  products: Product[];
  categories: string[];
}

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function ShopClient({ products, categories }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('Featured');

  const filteredProducts = products
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* Filters */}
      <section className="py-8 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs tracking-[0.2em] transition-colors ${
                  selectedCategory === 'all'
                    ? 'text-[#88744a]'
                    : 'text-[#77776d] hover:text-[#1a1a1a]'
                }`}
              >
                ALL
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs tracking-[0.2em] transition-colors ${
                    selectedCategory === category
                      ? 'text-[#88744a]'
                      : 'text-[#77776d] hover:text-[#1a1a1a]'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#77776d]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs tracking-wide bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-20 bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-light tracking-wide mb-1 group-hover:text-[#88744a] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#77776d] mb-2">{product.edition}</p>
                  <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#77776d]">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
