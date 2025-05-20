
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

const SectionTitle = ({ children, className, subtitle }: SectionTitleProps) => {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {children}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
