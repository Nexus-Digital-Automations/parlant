/**
 * React Type System Fixes
 * 
 * This file resolves conflicts between different React type packages
 * and ensures consistent ForwardRefExoticComponent compatibility
 */

import * as React from 'react';

declare global {
  namespace React {
    // Ensure consistent ReactNode type across all React imports
    type ReactNode = import('react').ReactNode;
    
    // Fix ForwardRefExoticComponent compatibility issues
    interface ForwardRefExoticComponent<P = Record<string, unknown>> {
      (props: P): ReactNode;
      displayName?: string | undefined;
    }
  }
}

// Re-export React types to ensure consistency
export type {
  ReactNode,
  ForwardRefExoticComponent,
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  RefAttributes,
  Key
} from 'react';

// Type helpers for Radix UI components
export interface RadixComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface RadixForwardRefProps<T = HTMLElement> extends RadixComponentProps {
  ref?: React.ForwardedRef<T>;
}

// Extend Radix UI component types to include missing properties
declare module '@radix-ui/react-dialog' {
  interface DialogContentProps extends RadixComponentProps {
    'data-testid'?: string;
    'aria-hidden'?: boolean;
    style?: React.CSSProperties;
  }
  
  interface DialogTitleProps extends RadixComponentProps {
    asChild?: boolean;
  }
  interface DialogDescriptionProps extends RadixComponentProps {
    asChild?: boolean;
  }
  interface DialogTriggerProps extends RadixComponentProps {
    asChild?: boolean;
    onClick?: () => void;
  }
  interface DialogCloseProps extends RadixComponentProps {
    onClick?: () => void;
  }
}

declare module '@radix-ui/react-tooltip' {
  interface TooltipContentProps extends RadixComponentProps {
    sideOffset?: number;
    'aria-label'?: string;
    forceMount?: true;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: PointerEvent) => void;
  }
}

declare module '@radix-ui/react-switch' {
  interface SwitchProps extends RadixComponentProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
  }
}

declare module '@radix-ui/react-select' {
  interface SelectProps extends RadixComponentProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    name?: string;
    required?: boolean;
  }
}