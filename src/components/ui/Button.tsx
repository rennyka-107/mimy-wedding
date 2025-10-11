import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90 focus:ring-foreground/50",
  secondary:
    "bg-black/5 dark:bg-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/15 focus:ring-foreground/30",
  ghost: "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10",
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
