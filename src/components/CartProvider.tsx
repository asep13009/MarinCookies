"use client";

import { useEffect, useState } from 'react';
import Cart from './Cart';

export default function CartProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Cart />;
}