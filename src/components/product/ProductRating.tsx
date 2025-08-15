import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface ProductRatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviews?: boolean;
}

const ProductRating = ({ rating, reviews, size = 'md', showReviews = true }: ProductRatingProps) => {
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      const StarComponent = isFilled ? StarIcon : StarOutlineIcon;
      
      return (
        <StarComponent
          key={i}
          className={`${iconSizes[size]} ${
            isFilled ? 'text-amber-400' : 'text-gray-300'
          }`}
        />
      );
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {renderStars()}
      </div>
      
      <span className={`font-medium text-gray-900 ${textSizes[size]}`}>
        {rating.toFixed(1)}
      </span>
      
      {showReviews && reviews && (
        <span className={`text-gray-500 ${textSizes[size]}`}>
          ({reviews} reviews)
        </span>
      )}
    </div>
  );
};

export default ProductRating;
