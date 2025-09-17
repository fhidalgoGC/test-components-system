import * as React from "react";
import { cn } from "@/lib/utils";
import { type CardProps, type CardHeaderProps, type CardTitleProps, type CardDescriptionProps, type CardContentProps, type CardFooterProps } from "./types/Card.types";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      data-testid="card"
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      data-testid="card-header"
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      data-testid="card-title"
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      data-testid="card-description"
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("p-6 pt-0", className)} 
      data-testid="card-content"
      {...props} 
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      data-testid="card-footer"
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };