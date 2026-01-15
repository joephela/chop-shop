import React, { forwardRef } from 'react';

export type RadialTheme = 'berry' | 'ocean' | 'forest' | 'volcano';

export const THEMES: Record<
  RadialTheme,
  { bg: string; hover: string; focus: string; border: string; accent: string }
> = {
  berry: {
    bg: 'bg-fuchsia-950',
    hover: 'hover:bg-fuchsia-900',
    focus: 'focus:bg-fuchsia-900',
    border: 'border-amber-300',
    accent: 'bg-amber-300',
  },
  ocean: {
    bg: 'bg-slate-950',
    hover: 'hover:bg-slate-900',
    focus: 'focus:bg-slate-900',
    border: 'border-cyan-400',
    accent: 'bg-cyan-400',
  },
  forest: {
    bg: 'bg-green-950',
    hover: 'hover:bg-green-900',
    focus: 'focus:bg-green-900',
    border: 'border-amber-900',
    accent: 'bg-amber-700',
  },
  volcano: {
    bg: 'bg-stone-950',
    hover: 'hover:bg-stone-900',
    focus: 'focus:bg-stone-900',
    border: 'border-rose-500',
    accent: 'bg-rose-500',
  },
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: RadialTheme;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { theme = 'berry', className = '', size = 'md', children, ...props },
    ref
  ) => {
    const colors = THEMES[theme];
    const sizeClasses = {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
    };

    const combinedClasses = `
      ${colors.bg} 
      ${colors.hover} 
      ${colors.focus} 
      text-cyan-50 
      border-4 
      ${colors.border} 
      rounded-full 
      transition-all 
      duration-500 
      ease-out 
      whitespace-nowrap 
      hover:scale-110 
      focus:scale-110 
      active:scale-95 
      origin-center 
      shadow-xl 
      ${sizeClasses[size]} 
      ${className}
    `
      .replace(/\s+/g, ' ')
      .trim();

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);
