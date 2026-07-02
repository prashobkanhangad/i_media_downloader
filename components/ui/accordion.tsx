"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within Accordion");
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: number | null;
}

function Accordion({
  className,
  defaultOpen = null,
  children,
  ...props
}: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpen);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className={cn("space-y-3", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

function AccordionItem({
  index,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openIndex } = useAccordion();
  const isOpen = openIndex === index;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.04]",
        isOpen && "border-white/30 bg-white/40 dark:border-white/15",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number;
}

function AccordionTrigger({
  index,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { openIndex, setOpenIndex } = useAccordion();
  const isOpen = openIndex === index;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => setOpenIndex(isOpen ? null : index)}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors sm:px-6 sm:py-5 sm:text-base",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

function AccordionContent({
  index,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { openIndex } = useAccordion();
  const isOpen = openIndex === index;

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "px-5 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-5 sm:text-base",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
