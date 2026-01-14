'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: `${item.title} - ${item.size}`,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            description: `${item.dimensions} | ${item.edition}`,
          })),
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

  if (items.length === 0) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-6">Your Cart</h1>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          <p className="text-[#77776d] mb-8">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-[#1a1a1a] text-white text-sm tracking-[0.15em] hover:bg-[#333] transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-6 text-center">Your Cart</h1>
        <div className="w-12 h-px bg-[#88744a] mx-auto mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-6 border-b border-[#e5e5e5]">
                {/* Image */}
                <div className="relative w-32 h-40 flex-shrink-0 bg-[#f8f8f6]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-light mb-1">{item.title}</h3>
                  <p className="text-sm text-[#77776d] mb-1">{item.size} - {item.dimensions}</p>
                  <p className="text-xs text-[#77776d] mb-3">{item.edition}</p>
                  <p className="text-lg font-light">${item.price.toLocaleString()}</p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-[#e5e5e5]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm hover:bg-[#f8f8f6] transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm border-x border-[#e5e5e5]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm hover:bg-[#f8f8f6] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-[#77776d] hover:text-[#1a1a1a] transition-colors underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs text-[#77776d] hover:text-[#1a1a1a] transition-colors underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8f6] p-8">
              <h2 className="text-sm tracking-[0.2em] mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#77776d]">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#77776d]">Shipping</span>
                  <span className="text-[#88744a]">Complimentary</span>
                </div>
              </div>

              <div className="border-t border-[#e5e5e5] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-light">Total</span>
                  <span className="text-xl font-light">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#1a1a1a] text-white text-sm tracking-[0.15em] hover:bg-[#333] transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>

              <Link
                href="/shop"
                className="block text-center text-xs text-[#77776d] hover:text-[#1a1a1a] transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 space-y-3 text-xs text-[#77776d]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure checkout powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Free worldwide insured shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
