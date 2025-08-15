'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import IconButton from '@/components/ui/IconButton';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import ProductRating from './ProductRating';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    addItem(product, 1);
    setIsLoading(false);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col" hover>
      {/* Product Image */}
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <ProductImage product={product} size="md" />
        </Link>
        
        {/* Wishlist Button - Outside Link to prevent event bubbling */}
        <IconButton
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 transition-all duration-300 z-10 ${
            isInWishlist(product.id) 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
          }`}
          variant="default"
        >
          {isInWishlist(product.id) ? (
            <HeartSolidIcon className="h-4 w-4 text-red-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-gray-600" />
          )}
        </IconButton>

        {/* Quick Add to Cart - Outside Link to prevent event bubbling */}
        {product.inStock && (
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isLoading}
              className="w-full"
              size="sm"
              isLoading={isLoading}
            >
              <ShoppingCartIcon className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category and Stock Status */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium capitalize">
            {product.category.replace('-', ' ')}
          </p>
          {product.inStock && (
            <Badge variant="success" size="sm">In stock</Badge>
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

        {/* Spacer to push price to bottom */}
        <div className="flex-1"></div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <ProductPrice 
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="md"
          />
          
          {product.weight && (
            <Badge variant="default" size="sm">{product.weight}</Badge>
          )}
        </div>

        {/* Origin */}
        {product.origin && (
          <p className="text-xs text-gray-500 font-medium">
            Origin: {product.origin}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;