'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

/** Empties the cart once the buyer lands back from a paid checkout. */
export default function ClearCart() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
