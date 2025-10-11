import React from "react";
import { Container } from "./Container";

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  container?: boolean;
};

export function Section({ padded = true, container = true, className = "", children, ...props }: SectionProps) {
  const content = (
    <div className={`${padded ? "py-12 md:py-20" : ""} ${className}`} {...props}>
      {children}
    </div>
  );

  if (!container) return content;
  return <Container>{content}</Container>;
}

export default Section;
