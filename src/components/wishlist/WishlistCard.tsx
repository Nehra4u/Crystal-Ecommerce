'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import IconButton from '@/components/ui/IconButton';
import ProductImage from '@/components/product/ProductImage';
import ProductPrice from '@/components/product/ProductPrice';
import ProductRating from '@/components/product/ProductRating';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface WishlistCardProps {
  product: Product;
}

const WishlistCard = ({ product }: WishlistCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    addItem(product, 1);
    setIsLoading(false);
  };

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(product.id);
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col" hover>
      {/* Product Image */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <ProductImage product={product} size="md" showBadges={true} />
        </Link>
        
        {/* Remove Button */}
        <IconButton
          onClick={handleRemoveFromWishlist}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-sm"
          variant="default"
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </IconButton>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category and Stock Status */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium capitalize">
            {product.category.replace('-', ' ')}
          </p>
          {product.inStock ? (
            <Badge variant="success" size="sm">In stock</Badge>
          ) : (
            <Badge variant="error" size="sm">Out of stock</Badge>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 transition-colors text-lg leading-tight min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Properties */}
        <div className="mb-4 min-h-[2rem]">
          {product.properties && product.properties.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.properties.slice(0, 2).map((property) => (
                <Badge key={property} variant="default" size="sm">
                  {property}
                </Badge>
              ))}
              {product.properties.length > 2 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{product.properties.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="mb-4">
          <ProductRating 
            rating={product.rating} 
            reviews={product.reviews}
            size="sm"
          />
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Price */}
        <div className="mb-4">
          <ProductPrice 
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="md"
          />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full"
            size="sm"
            isLoading={isLoading}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          
          <Button
            onClick={handleRemoveFromWishlist}
            variant="outline"
            className="w-full text-red-600 border-red-300 hover:bg-red-50"
            size="sm"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Remove from Wishlist
          </Button>
        </div>

        {/* Origin */}
        {product.origin && (
          <p className="text-xs text-gray-500 font-medium mt-2">
            Origin: {product.origin}
          </p>
        )}
      </div>
    </Card>
  );
};

export default WishlistCard;
