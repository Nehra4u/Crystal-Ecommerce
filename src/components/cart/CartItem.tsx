'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-accent-200">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-accent-900 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-accent-500 mt-1">
          {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </p>
        {product.weight && (
          <p className="text-sm text-accent-500">Weight: {product.weight}</p>
        )}
        <p className="text-lg font-semibold text-accent-900 mt-2">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 p-0"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        
        <span className="w-12 text-center font-medium text-accent-900">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-0">
        <p className="text-lg font-bold text-accent-900">
          {formatPrice(totalPrice)}
        </p>
        {quantity > 1 && (
          <p className="text-sm text-accent-500">
            {quantity} × {formatPrice(product.price)}
          </p>
        )}
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(product.id)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
      >
        <TrashIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
