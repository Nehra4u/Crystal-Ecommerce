import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ children, className, hover = false, padding = 'md' }: CardProps) => {
  const baseStyles = 'bg-white rounded-lg border border-gray-200 shadow-sm';
  const hoverStyles = hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : '';
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={cn(baseStyles, hoverStyles, paddingStyles[padding], className)}>
      {children}
    </div>
  );
};

export default Card;
