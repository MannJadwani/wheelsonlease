import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-surface-200 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-surface-800/50 border border-surface-700 rounded-2xl
              px-4 py-3.5 text-white placeholder-surface-400
              focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500
              transition-all duration-200
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

