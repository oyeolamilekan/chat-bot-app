import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["transition-colors", "relative", "inline-flex", "items-center", "justify-center", "font-semibold", "text-sm"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      outline: ["hover:bg-secondary-hover", "border", "border-black", "border-[1px]"],
      ghost: ["hover:bg-gray-100", "bg-gray-100", "text-black"],
      dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"]
    },
    size: {
      default: ["rounded", "py-2", "px-4"],
      small: ["rounded", "py-1", "px-3", "h-8"],
      full: ['w-full', "rounded", "py-2", "px-4"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5"
      ]
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & {
  loading?: boolean;
};

export function Button({ variant, size, className, loading, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={twMerge(buttonStyles({ variant, size }), className)} disabled={loading}>
      <span className={`flex items-center justify-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      {loading && (
        <Loader2 className="absolute h-5 w-5 text-white animate-spin" />
      )}
    </button>
  );
}
