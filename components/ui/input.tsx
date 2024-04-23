// import { VariantProps, cva } from "class-variance-authority";
// import { ComponentProps } from "react";
// import { twMerge } from "tailwind-merge";

// const inputStyles = cva(["outline-none h-10 flex items-center pl-2 lg:pl-4 border rounded text-base font-normal w-full mb-6"], {
//   variants: {
//     variant: {
//       default: ["focus:ring-neutral-800", "focus:border-black", "focus:border-[1.2px]"],
//       noFocus: []
//     }
//   },
//   defaultVariants: {
//     variant: "default",
//   }
// })

// type InputProps = VariantProps<typeof inputStyles> & ComponentProps<'input'> & {
//   label?: string; // Optional label prop
// };
// export function Input({ label, variant, className, ...props }: InputProps) {
//   return <input {...props} className={twMerge(inputStyles({ variant }), className)} />
// }

import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const inputStyles = cva(['outline-none h-10 flex items-center pl-2 lg:pl-4 border rounded text-base font-normal w-full mb-6 mt-2'], {
  variants: {
    variant: {
      default: ['focus:ring-neutral-800', 'focus:border-black', 'focus:border-[1.2px]'],
      noFocus: [],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type InputProps = VariantProps<typeof inputStyles> & ComponentProps<'input'> & {
  label?: string; // Optional label prop
};

export function Input({ label, variant, className, ...props }: InputProps) {
  return (
    <div className="input-container w-full">
      {/* Conditionally render the label if provided */}
      {label && (
        <label htmlFor={props.id} className="text-sm lg:text-base font-medium">
          {label}
        </label>
      )}
      {/* Input element */}
      <input
        {...props}
        className={twMerge(inputStyles({ variant }), className)}
      />
    </div>
  );
}
