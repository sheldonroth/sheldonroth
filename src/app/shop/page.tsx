'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 1,
    title: 'Gemsbok in the Mist',
    price: 2500,
    edition: 'Limited Edition of 150',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',
  },
  {
    id: 2,
    title: 'Reflection Pool',
    price: 3200,
    edition: 'Limited Edition of 100',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: 3,
    title: 'Urban Symmetry',
    price: 2800,
    edition: 'Limited Edition of 125',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 4,
    title: 'Golden Hour',
    price: 2200,
    edition: 'Limited Edition of 175',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
  },
  {
    id: 5,
    title: 'Elephant Portrait',
    price: 3500,
    edition: 'Limited Edition of 75',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&q=80',
  },
  {
    id: 6,
    title: 'Antelope Canyon',
    price: 4200,
    edition: 'Limited Edition of 50',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80',
  },
  {
    id: 7,
    title: 'Sydney Opera',
    price: 2900,
    edition: 'Limited Edition of 100',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80',
  },
  {
    id: 8,
    title: 'Savanna Sunrise',
    price: 2600,
    edition: 'Limited Edition of 125',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  },
  {
    id: 9,
    title: 'Ocean Dreams',
    price: 3800,
    edition: 'Limited Edition of 75',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80',
  },
  {
    id: 10,
    title: 'Desert Solitude',
    price: 2900,
    edition: 'Limited Edition of 100',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
  },
  {
    id: 11,
    title: 'Northern Lights',
    price: 4500,
    edition: 'Limited Edition of 50',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
  },
  {
    id: 12,
    title: 'Misty Forest',
    price: 2600,
    edition: 'Limited Edition of 150',
    category: 'landscapes',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
  },
  {
    id: 13,
    title: 'City Lights',
    price: 3100,
    edition: 'Limited Edition of 100',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80',
  },
  {
    id: 14,
    title: 'Elephant Crossing',
    price: 3500,
    edition: 'Limited Edition of 75',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&q=80',
  },
  {
    id: 15,
    title: 'Glass Tower',
    price: 2700,
    edition: 'Limited Edition of 125',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
  },
  {
    id: 16,
    title: 'Lion King',
    price: 4800,
    edition: 'Limited Edition of 50',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80',
  },
];

const categories = ['all', 'wildlife', 'landscapes', 'architecture'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function ShopPage() {
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
      {/* Hero */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Shop</h1>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
          <p className="text-[#77776d] max-w-2xl mx-auto">
            Each limited edition print is museum-quality, hand-numbered, and accompanied by a certificate of authenticity.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-4">
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
                href={`/shop/${product.title.toLowerCase().replace(/ /g, '-')}`}
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
                  <p className="text-sm font-medium">${product.price.toLocaleString()}</p>
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

      {/* Info Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">CERTIFICATE OF AUTHENTICITY</h3>
              <p className="text-sm text-[#77776d]">
                Each print includes a hand-signed certificate verifying its authenticity and edition number.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">WORLDWIDE SHIPPING</h3>
              <p className="text-sm text-[#77776d]">
                Professional packing and insured delivery to collectors around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">SATISFACTION GUARANTEE</h3>
              <p className="text-sm text-[#77776d]">
                30-day return policy for complete peace of mind with your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
