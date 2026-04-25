import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium font-label text-neutral-700 dark:text-neutral-300 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 dark:text-red-400 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : (helperText ? helperId : undefined)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-400 dark:focus:border-primary-400 transition-all outline-none font-body bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 ${
            error ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : 'border-neutral-300 dark:border-neutral-700'
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 font-body">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 font-body">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
