import React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
};

const widths: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
};

export function Container({ size = "xl", className = "", ...props }: ContainerProps) {
  return <div className={`w-full mx-auto px-4 sm:px-6 md:px-8 ${widths[size]} ${className}`} {...props} />;
}

export default Container;
