'use client';

import { useState, useEffect } from 'react';
import { Product, WishlistItem } from '@/types';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('crystal-wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crystal-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.product.id === product.id);
      if (exists) return prevItems;
      
      return [...prevItems, { product, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.some(item => item.product.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  };
};
