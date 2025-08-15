'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import WishlistCard from '@/components/wishlist/WishlistCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';

const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HeartIcon className="mx-auto h-24 w-24 text-gray-400" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-600">
              Save your favorite crystals for later by adding them to your wishlist!
            </p>
            <Link href="/">
              <Button className="mt-6">
                Explore Crystals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Add "Add All to Cart" functionality */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => {
                wishlistItems.forEach(product => {
                  if (product.inStock) {
                    addItem(product, 1);
                  }
                });
              }}
              variant="secondary"
              size="lg"
              disabled={!wishlistItems.some(item => item.inStock)}
            >
              Add All Available Items to Cart ({wishlistItems.filter(item => item.inStock).length})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
