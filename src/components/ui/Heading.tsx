import React from "react";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
  "3xl": "text-5xl",
};

const weightMap: Record<NonNullable<HeadingProps["weight"]>, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Heading({
  as: Component = "h2",
  size = "xl",
  weight = "semibold",
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Component className={`${sizeMap[size]} ${weightMap[weight]} tracking-tight ${className}`} {...props} />
  );
}

export default Heading;
