const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://mahout.app";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mahout",
    url: BASE,
    description:
      "A personal operating system that turns your meaning, emotions, and time into calm next steps—guided by Future You.",
    parentOrganization: {
      "@type": "Organization",
      name: "Eonex Technologies",
      url: "https://eonextechnologies.com/",
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mahout",
    url: BASE,
    description:
      "Mahout connects your Aim, your Path, your Elephant, and your Journal into guidance that actually fits your real life.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mahout",
    applicationCategory: "LifestyleApplication",
    description:
      "A personal operating system—guided by Future You. Meaning. Time. Emotion. One calm system.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
