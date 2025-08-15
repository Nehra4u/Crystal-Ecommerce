import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItem } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import ProductImage from '@/components/product/ProductImage';
import QuantitySelector from '@/components/ui/QuantitySelector';
import IconButton from '@/components/ui/IconButton';
import Badge from '@/components/ui/Badge';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemRow = ({ item, onUpdateQuantity, onRemove }: CartItemRowProps) => {
  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Product Image */}
        <div className="col-span-1">
          <ProductImage 
            product={item.product} 
            size="sm" 
            showBadges={false}
            className="w-16 h-16"
          />
        </div>

        {/* Product Info */}
        <div className="col-span-5">
          <h3 className="font-medium text-gray-900 mb-1">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-500">
            {item.product.weight}
          </p>
        </div>

        {/* Availability */}
        <div className="col-span-2 text-center">
          <Badge variant="success" size="sm">
            In stock
          </Badge>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-1 flex justify-center">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            size="sm"
          />
        </div>

        {/* Price per unit */}
        <div className="col-span-2 text-center">
          <span className="font-medium">
            {formatPrice(item.product.price)} / pcs
          </span>
        </div>

        {/* Total */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-semibold">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            <IconButton
              onClick={() => onRemove(item.product.id)}
              variant="ghost"
              size="sm"
            >
              <TrashIcon className="h-4 w-4 text-red-500" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
