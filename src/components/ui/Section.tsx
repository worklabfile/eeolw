
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section;
