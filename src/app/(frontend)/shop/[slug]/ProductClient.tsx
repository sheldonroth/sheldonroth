'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductData {
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  edition: string;
  editionTotal: number;
  editionSold: number;
  images: string[];
  sizes: { name: string; price: number; dimensions: string }[];
  details: string[];
}

export default function ProductClient({ product }: { product: ProductData }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAddingToCart(false);
    // In production, this would add to cart state/context
    alert('Added to cart!');
  };

  const handleBuyNow = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: `${product.title} - ${product.sizes[selectedSize].name}`,
              price: product.sizes[selectedSize].price,
              quantity: 1,
              image: product.images[0],
              description: `${product.sizes[selectedSize].dimensions} | ${product.edition} of ${product.editionTotal}`,
            },
          ],
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-xs tracking-wide">
              <li>
                <Link href="/shop" className="text-[#77776d] hover:text-[#1a1a1a] transition-colors">
                  Shop
                </Link>
              </li>
              <li className="text-[#77776d]">/</li>
              <li>
                <Link href={`/collections/${product.categorySlug}`} className="text-[#77776d] hover:text-[#1a1a1a] transition-colors">
                  {product.category}
                </Link>
              </li>
              <li className="text-[#77776d]">/</li>
              <li className="text-[#1a1a1a]">{product.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div>
              <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#f8f8f6]">
                {product.images.length > 0 && (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-[#88744a]' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="10vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="text-xs tracking-[0.3em] text-[#88744a] mb-2 block">
                {product.category.toUpperCase()}
              </span>
              <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">{product.title}</h1>

              {/* Edition Info */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-[#77776d]">
                  {product.edition} of {product.editionTotal}
                </span>
                <span className="text-xs px-2 py-1 bg-[#f8f8f6] text-[#77776d]">
                  {product.editionTotal - product.editionSold} Available
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-light mb-8">
                ${product.sizes[selectedSize].price.toLocaleString()}
              </p>

              {/* Description */}
              <p className="text-[#77776d] leading-relaxed mb-8">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.2em] mb-4">SELECT SIZE</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(index)}
                      className={`p-4 border transition-all ${
                        selectedSize === index
                          ? 'border-[#88744a] bg-[#f8f8f6]'
                          : 'border-[#e5e5e5] hover:border-[#88744a]'
                      }`}
                    >
                      <span className="block text-xs tracking-wide font-medium mb-1">{size.name}</span>
                      <span className="block text-xs text-[#77776d]">{size.dimensions}</span>
                      <span className="block text-sm mt-2">${size.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart / Buy Now */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="btn-secondary flex-1 disabled:opacity-50"
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                <button onClick={handleBuyNow} className="btn-primary flex-1">
                  Buy Now
                </button>
              </div>

              {/* Details */}
              {product.details.length > 0 && (
                <div className="border-t border-[#e5e5e5] pt-8">
                  <h3 className="text-xs tracking-[0.2em] mb-4">INCLUDED WITH PURCHASE</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#77776d]">
                        <svg className="w-4 h-4 text-[#88744a] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shipping Info */}
              <div className="border-t border-[#e5e5e5] pt-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm">Free worldwide shipping</span>
                </div>
                <p className="text-xs text-[#77776d]">
                  Estimated delivery: 2-4 weeks (custom made to order)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <svg className="w-8 h-8 mx-auto mb-2 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-xs tracking-wide">Authenticity Guaranteed</p>
            </div>
            <div>
              <svg className="w-8 h-8 mx-auto mb-2 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-xs tracking-wide">Secure Payment</p>
            </div>
            <div>
              <svg className="w-8 h-8 mx-auto mb-2 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-xs tracking-wide">Insured Shipping</p>
            </div>
            <div>
              <svg className="w-8 h-8 mx-auto mb-2 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-xs tracking-wide">30-Day Returns</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
