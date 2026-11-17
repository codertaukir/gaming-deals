import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { TRANSITION_FAST } from '@/design-system/motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'affiliate';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#8B5CF6] text-[#F8FAFC] hover:bg-[#7C3AED] border border-transparent shadow-sm',
  secondary: 'bg-[#171A26] text-[#F8FAFC] hover:bg-[#1E2232] border border-[#94A3B8]/18',
  outline:
    'bg-transparent text-[#F8FAFC] hover:bg-[#171A26] border border-[#94A3B8]/25 hover:border-[#94A3B8]/45',
  ghost:
    'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#171A26]/70 border border-transparent',
  affiliate:
    'bg-[#22D3EE] text-[#08090D] font-semibold hover:bg-[#06B6D4] border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-xs',
  md: 'min-h-[44px] px-5 py-2.5 text-sm',
  lg: 'min-h-[48px] px-6 py-3 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={TRANSITION_FAST}
        className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none disabled:opacity-45 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
