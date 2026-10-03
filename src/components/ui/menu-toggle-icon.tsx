"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MenuToggleIconProps extends React.ComponentProps<"svg"> {
  open: boolean;
  duration?: number;
}

export const MenuToggleIcon: React.FC<MenuToggleIconProps> = ({
  open,
  duration = 300,
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform", className)}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      <line
        x1={4}
        y1={open ? 20 : 6}
        x2={20}
        y2={open ? 4 : 6}
        style={{
          transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          transformOrigin: "center",
        }}
      />
      <line
        x1={4}
        y1={12}
        x2={20}
        y2={12}
        style={{
          opacity: open ? 0 : 1,
          transition: `opacity ${duration / 2}ms ease`,
        }}
      />
      <line
        x1={4}
        y1={open ? 4 : 18}
        x2={20}
        y2={open ? 20 : 18}
        style={{
          transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          transformOrigin: "center",
        }}
      />
    </svg>
  );
};
