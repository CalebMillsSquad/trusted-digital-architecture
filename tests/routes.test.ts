import { describe, expect, it } from "vitest";
import { pages, primaryNavigation, products, services, solutions } from "../lib/site-content";

const requiredRoutes = [
  "services", "services/website-architecture", "services/software-development", "services/ai-systems",
  "services/automation", "services/api-integrations", "services/saas-development", "services/mobile-apps",
  "services/learning-platforms", "services/business-intelligence", "solutions",
  "solutions/inventory-pos-integration", "solutions/customer-portals", "solutions/member-portals",
  "solutions/learning-management", "solutions/ecommerce", "solutions/ai-assistants",
  "solutions/custom-dashboards", "solutions/business-operations", "products", "industries", "process",
  "about", "contact", "website-audit", "privacy", "terms",
];

describe("public website content", () => {
  it("defines every founder-approved route", () => {
    expect(Object.keys(pages).sort()).toEqual(requiredRoutes.sort());
  });

  it("keeps every page complete and actionable", () => {
    for (const page of Object.values(pages)) {
      expect(page.eyebrow.length).toBeGreaterThan(0);
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.sections.length).toBeGreaterThan(0);
      expect(page.cta.length).toBeGreaterThan(0);
    }
  });

  it("includes the approved service, solution, product, and navigation sets", () => {
    expect(services).toHaveLength(9);
    expect(solutions).toHaveLength(8);
    expect(products).toHaveLength(6);
    expect(primaryNavigation.map(([label]) => label)).toEqual(["Services", "Solutions", "Products", "Industries", "Process", "About", "Contact"]);
  });

  it("labels every unfinished product accurately", () => {
    expect(products.every((product) => Boolean(product.status))).toBe(true);
  });
});
