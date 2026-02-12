import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-stone-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 transition-colors min-h-[100px] resize-y",
            "focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200",
            "disabled:cursor-not-allowed disabled:bg-stone-50 disabled:opacity-60",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
