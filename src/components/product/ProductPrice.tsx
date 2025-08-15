import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  layout?: 'horizontal' | 'vertical';
}

const ProductPrice = ({ 
  price, 
  originalPrice, 
  discount, 
  size = 'md', 
  showDiscount = true,
  layout = 'horizontal'
}: ProductPriceProps) => {
  const priceSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };
  
  const originalPriceSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const containerClass = layout === 'vertical' ? 'flex flex-col space-y-1' : 'flex items-center space-x-2';
  
  return (
    <div className={containerClass}>
      <div className="flex items-center space-x-2">
        <span className={`font-bold text-gray-900 ${priceSizes[size]}`}>
          {formatPrice(price)}
        </span>
        
        {originalPrice && originalPrice > price && (
          <span className={`text-gray-500 line-through ${originalPriceSizes[size]}`}>
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
      
      {showDiscount && discount && (
        <Badge variant="error" size={size === 'lg' ? 'md' : 'sm'}>
          -{discount}%
        </Badge>
      )}
    </div>
  );
};

export default ProductPrice;
