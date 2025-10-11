import React from "react";

export type IconProps = React.SVGAttributes<SVGElement> & {
  name: "calendar" | "clock" | "map" | "heart" | "chevron-right" | "chevron-left" | "photo";
  size?: number;
};

const paths: Record<IconProps["name"], string> = {
  calendar: "M6 2a1 1 0 0 1 1 1v1h10V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 1 1 2 0v1h10V3a1 1 0 1 1 2 0v1h1M4 10h18v10H4z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 5a1 1 0 0 0-2 0v6c0 .265.105.52.293.707l4 4a1 1 0 1 0 1.414-1.414L13 12.586z",
  map: "M9 2 3 5v17l6-3 6 3 6-3V2l-6 3zM9 19V5l6 3v14z",
  heart: "M12 21s-7.5-4.438-10-9.25C.75 7.188 3.5 4 7 4c2.125 0 3.5 1.25 5 3 1.5-1.75 2.875-3 5-3 3.5 0 6.25 3.188 5 7.75C19.5 16.563 12 21 12 21z",
  "chevron-right": "M9 18l6-6-6-6",
  "chevron-left": "M15 6l-6 6 6 6",
  photo: "M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm8 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
};

export function Icon({ name, size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default Icon;
