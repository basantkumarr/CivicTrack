// Mock Headless UI components
import React from 'react';

export const Dialog = ({ children, as: Component = 'div', className, onClose, ...props }) => {
  return <Component className={className} {...props}>{children}</Component>;
};

Dialog.Panel = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const Transition = ({ show, children, as: Component = 'div', ...props }) => {
  if (!show) return null;
  return <Component {...props}>{children}</Component>;
};

Transition.Root = ({ show, children, as: Component = 'div', ...props }) => {
  if (!show) return null;
  return <Component {...props}>{children}</Component>;
};

Transition.Child = ({ children, as: Component = 'div', ...props }) => (
  <Component {...props}>{children}</Component>
);
