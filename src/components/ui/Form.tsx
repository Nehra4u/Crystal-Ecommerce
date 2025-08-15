import { FormHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <form ref={ref} className={cn('space-y-6', className)} {...props}>
        {(title || description) && (
          <div className="space-y-2">
            {title && (
              <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

const FormField = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('space-y-1', className)}>
    {children}
  </div>
);

const FormRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
    {children}
  </div>
);

export { Form, FormField, FormRow };
