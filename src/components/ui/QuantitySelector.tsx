import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import IconButton from './IconButton';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const QuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  min = 1, 
  max = 99,
  size = 'md'
}: QuantitySelectorProps) => {
  const containerSizes = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3',
  };
  
  const textSizes = {
    sm: 'text-sm min-w-[2rem]',
    md: 'text-base min-w-[2.5rem]',
    lg: 'text-lg min-w-[3rem]',
  };
  
  return (
    <div className={`flex items-center justify-center ${containerSizes[size]}`}>
      <IconButton
        size={size}
        variant="outline"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <MinusIcon className="h-4 w-4" />
      </IconButton>
      
      <span className={`text-center font-medium text-gray-900 ${textSizes[size]}`}>
        {quantity}
      </span>
      
      <IconButton
        size={size}
        variant="outline"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <PlusIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default QuantitySelector;
