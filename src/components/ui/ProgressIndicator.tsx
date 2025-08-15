import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const ProgressIndicator = ({ steps }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center">
          {index > 0 && (
            <div className="flex-1 h-px bg-gray-300 mr-8"></div>
          )}
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.status === 'completed' 
                ? 'bg-green-600 text-white'
                : step.status === 'current'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step.status === 'completed' ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
            }`}>
              {step.title}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 ml-8"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
