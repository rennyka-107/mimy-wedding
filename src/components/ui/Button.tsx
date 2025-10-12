import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "text-[14px] text-white font-[500] !rounded-[6px] bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] hover:bg-[#E07000]",
  secondary:
    "bg-black/5 dark:bg-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/15 focus:ring-foreground/30",
  ghost: "bg-[#EAEAEA] text-[#383637] hover:bg-[#D2D2D2] dark:hover:bg-white/10",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  );
}

export default Button;
