import type { AdPlacement } from "@/lib/ads/config";

export const adFormatProps: Record<
  AdPlacement,
  {
    format: string;
    layout?: string;
    layoutKey?: string;
  }
> = {
  display: {
    format: "auto",
  },
  horizontal: {
    format: "auto",
    layout: "in-article",
  },
  inArticle: {
    format: "fluid",
    layout: "in-article",
  },
  inFeed: {
    format: "fluid",
    layoutKey: "-fb+5w+4e-db+86",
  },
  sidebar: {
    format: "vertical",
  },
};
