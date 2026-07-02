"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";
import { faqs } from "@/features/home/data/landing-content";
import { useInView } from "@/hooks/use-in-view";
import { appleEase } from "@/utils/animation";

export function FaqSection() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Section
      id="faq"
      badge="FAQ"
      title="Frequently asked questions"
      subtitle="Everything you need to know about our Instagram video downloader."
      className="bg-muted/30 dark:bg-muted/10"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: appleEase }}
        className="mx-auto max-w-3xl"
      >
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} index={index}>
              <AccordionTrigger index={index}>{faq.question}</AccordionTrigger>
              <AccordionContent index={index}>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}
