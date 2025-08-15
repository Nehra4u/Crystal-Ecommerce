import Badge from '@/components/ui/Badge';
import { Product } from '@/types';

interface ProductImageProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadges?: boolean;
  className?: string;
}

const ProductImage = ({ product, size = 'md', showBadges = true, className = '' }: ProductImageProps) => {
  const sizeStyles = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };
  
  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };
  
  return (
    <div className={`relative aspect-square bg-gradient-to-br from-stone-50 via-amber-50 to-blue-50 rounded-lg overflow-hidden ${className}`}>
      {/* Badges */}
      {showBadges && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="default" size="sm">New</Badge>
          )}
          {product.discount && (
            <Badge variant="error" size="sm">
              -{product.discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="error" size="sm">Out of stock</Badge>
          )}
        </div>
      )}
      
      {/* Product Image Placeholder */}
      <div className="w-full h-full flex items-center justify-center relative">
        <div className={`${sizeStyles[size]} bg-gradient-to-br from-crystal-300 to-crystal-500 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
          <span className={iconSizes[size]}>💎</span>
        </div>
        
        {/* Brazil Flag for Brazil origin products */}
        {product.origin?.toLowerCase().includes('brazil') && size !== 'sm' && (
          <div className="absolute bottom-4 right-4">
            <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500"></div>
              <span className="relative text-xs font-bold text-white">BR</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
    </div>
  );
};

export default ProductImage;
