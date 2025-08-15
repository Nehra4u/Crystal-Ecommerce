import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'stone';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

const Section = ({ 
  children, 
  className, 
  background = 'white', 
  padding = 'lg',
  container = true 
}: SectionProps) => {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    stone: 'bg-stone-50',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  };
  
  const containerStyles = container ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : '';
  
  return (
    <section className={cn(backgroundStyles[background], paddingStyles[padding], className)}>
      <div className={containerStyles}>
        {children}
      </div>
    </section>
  );
};

export default Section;
