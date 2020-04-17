import React from "react";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={`Button Button${reversed ? "--reversed" : "--normal"}${
        active ? "-active" : "-inactive"
      }`}
    />
  )
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span {...props} ref={ref} className="Icon" />
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className="Menu" />
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} className="Toolbar" />
));
