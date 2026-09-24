import { describe, expect, it } from "vitest";
import {
  SERVICE_HUB_FAQS,
  SERVICE_SYSTEMS,
  getServiceOfferSchemaItems,
  getServiceSystem,
  getServiceSystemDiscoveryLines,
} from "../service-catalog";

describe("Service Path catalog", () => {
  it("keeps one canonical record for each Service System spoke", () => {
    expect(SERVICE_SYSTEMS).toHaveLength(4);
    expect(new Set(SERVICE_SYSTEMS.map((system) => system.slug)).size).toBe(4);
    expect(new Set(SERVICE_SYSTEMS.map((system) => system.href)).size).toBe(4);
    expect(SERVICE_SYSTEMS.every((system) => system.faqs.length > 0)).toBe(true);
  });

  it("projects discovery facts without another content registry", () => {
    const lines = getServiceSystemDiscoveryLines();
    expect(lines).toHaveLength(SERVICE_SYSTEMS.length * 2);
    expect(lines.join("\n")).toContain("/services/data-foundation");
    expect(lines.join("\n")).toContain("Front-Line Help");
  });

  it("resolves known systems and rejects unknown paths", () => {
    expect(getServiceSystem("visibility").label).toBe("Visibility");
    expect(() => getServiceSystem("missing")).toThrow("Unknown Service System");
  });

  it("projects paid offers from Service Path records and pricing", () => {
    const offers = getServiceOfferSchemaItems();
    expect(offers.map((offer) => offer.name)).toEqual([
      "AI Roadmap Audit",
      "AI Self-Sufficiency Program",
      "Digital Identity Landing Page",
      "Custom AI Provisioning",
    ]);
    expect(offers[3].priceSpecification).toEqual({
      minPrice: "1000",
      maxPrice: "5000",
      priceCurrency: "USD",
    });
  });

  it("keeps the hub FAQ facts in the catalog", () => {
    expect(SERVICE_HUB_FAQS.map((faq) => faq.question)).toEqual([
      "Where does a build start?",
      "Who owns the system after?",
      "What does it cost to run?",
    ]);
  });
});
