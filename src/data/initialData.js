export const initialData = {
  personalInfo: {
    name: "Venkateswaran",
    role: "Digital Marketer",
    email: "hello@venkat.design",
    bio: [
      "Venkateswaran is a **digital marketer, growth strategist,** and **creative direction enthusiast**. Based in Chennai, his career has evolved through a deep passion for building high-impact brand identities.",
      "He has successfully led growth teams and scaled brand presence for various market leaders in the digital space. His approach intersects **data analytics** and **visual storytelling**, ensuring every campaign not only reaches its target audience but leaves a lasting imprint.",
      "Throughout his career, Venkateswaran has had the opportunity to work on growth strategies at Microsoft, Twitch, SurveyMonkey, Lyft, Robinhood, and now Dropbox. He has dedicated his career to the intersection of market reach and digital design.",
      "In doing so, Venkateswaran has helped some of the world's most iconic brands build trust, drive preference, and create affinity through thoughtful and emotive brand marketing."
    ],
    socials: {
      linkedin: "https://linkedin.com/in/venkateswaran",
      github: "https://github.com/venkateswaran"
    },
    portrait: "/assets/portrait_final.png",
    resumeUrl: "/resume.pdf"
  },

  // Focus / Skills shown on the Home page (can be enabled/disabled)
  focus: [
    { id: 1, label: "Brand Experience", enabled: true },
    { id: 2, label: "Digital Marketing", enabled: true },
    { id: 3, label: "SEO & Growth", enabled: true },
    { id: 4, label: "Creative Direction", enabled: true },
    { id: 5, label: "Content Strategy", enabled: true },
    { id: 6, label: "Marketing Automation", enabled: true },
    { id: 7, label: "AI Workflows", enabled: true }
  ],

  // Facts / About paragraphs shown on the Home page
  facts: [
    "I've dedicated my career to the intersection of Brand and Product Design, known as Brand Experience Design. Focusing on highly crafted visual design, interactive prototyping across devices and hardware, as well as an emotive and intentional approach to integrating brand and visual identity systems within digital product experiences. /",
    "I currently lead the Brand Experience (Brand XP) team at Dropbox as both a manager and an individual contributor. I oversee a team of product, brand, and motion designers. /",
    "The Brand XP team operates as a horizontal partner to the Engineering, Product, and Design organizations. We collaborate with product teams at various altitudes to elevate design craft, create branded product experiences that connect emotionally with customers, and evolve our visual identity system across our portfolio of products. /",
    "Over the years, I've analyzed, identified, and designed hundreds of emotive product experiences that have shaped how people perceive and engage with brands they know and love. By focusing on emotion, understanding a user's emotional state, and tapping into key moments, I've been able to infuse brand into product experiences in ways that build trust, drive preference, and create deep affinity for some of the world's most recognized brands. /"
  ],

  experiences: [
    { id: 1, company: "Dropbox", role: "Product Design", logo: "", period: "SEPT 2022 - PRESENT" },
    { id: 2, company: "Robinhood", role: "Product Design", logo: "", period: "JAN 2021 - AUG 2022" },
    { id: 3, company: "Lyft", role: "Product Design", logo: "", period: "JUN 2019 - DEC 2020" },
    { id: 4, company: "SurveyMonkey", role: "Product Design", logo: "", period: "MAR 2018 - MAY 2019" }
  ],

  certifications: [
    {
      id: 1,
      name: "Advanced Digital Marketing",
      issuer: "Google Career Certificates",
      logo: "",
      link: "https://drive.google.com/your-certificate-1"
    },
    {
      id: 2,
      name: "SEO Expert Certification",
      issuer: "HubSpot Academy",
      logo: "",
      link: "https://drive.google.com/your-certificate-2"
    }
  ],

  projects: [
    {
      id: 1,
      title: "Google Maps Optimization",
      category: "GMB",
      image: "https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?q=80&w=2000&auto=format&fit=crop",
      year: "2024",
      description: "Scaling local search visibility through advanced GMB strategies and review management.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 101, heading: "Overview", content: "This project focused on scaling local search visibility for a regional business through targeted Google Maps strategies." },
        { id: 102, heading: "The Challenge", content: "The client had low visibility in local search results despite having a strong offline presence." },
        { id: 103, heading: "Solution", content: "We implemented a full GMB audit, optimized categories, managed reviews, and ran local citation campaigns." },
        { id: 104, heading: "Results", content: "3x increase in map views, 45% increase in direction requests, top-3 ranking in local pack." }
      ]
    },
    {
      id: 2,
      title: "Organic SaaS Growth",
      category: "SEO",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      year: "2023",
      description: "Driving 200% increase in organic traffic for a series-B fintech startup through content clusters.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 201, heading: "Overview", content: "Driving 200% increase in organic traffic for a series-B fintech startup through content clusters and technical SEO." },
        { id: 202, heading: "The Challenge", content: "Keyword cannibalization and technical debt were the primary bottlenecks causing growth plateau." },
        { id: 203, heading: "Solution", content: "Implemented a full-scale content pruning strategy, restructured the site hierarchy for better crawlability, and executed a targeted backlink campaign." },
        { id: 204, heading: "Results", content: "200% organic traffic increase, top 3 position for 50+ high-intent keywords, 30% bounce rate reduction." }
      ]
    },
    {
      id: 3,
      title: "Headless WordPress",
      category: "WordPress",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
      description: "Building high-performance e-commerce sites using WordPress as a decoupled CMS.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 301, heading: "Overview", content: "Building high-performance e-commerce sites using WordPress as a decoupled headless CMS." },
        { id: 302, heading: "The Challenge", content: "The client needed a fast, scalable e-commerce experience without the performance limitations of traditional WordPress themes." },
        { id: 303, heading: "Solution", content: "Decoupled the WordPress backend from a React frontend, using WP REST API and custom post types." },
        { id: 304, heading: "Results", content: "90+ Lighthouse score, 60% faster page loads, seamless CMS editing workflow maintained." }
      ]
    },
    {
      id: 4,
      title: "Marketing Automation",
      category: "Tools",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop",
      year: "2022",
      description: "Developing custom scripts to automate lead qualification and CRM synchronization.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 401, heading: "Overview", content: "Developing custom automation scripts to qualify leads and sync data with CRM systems." },
        { id: 402, heading: "The Challenge", content: "Manual lead qualification was consuming significant team time and causing delays in follow-ups." },
        { id: 403, heading: "Solution", content: "Built automated workflows using Zapier, custom Python scripts, and Salesforce API integrations." },
        { id: 404, heading: "Results", content: "80% reduction in manual data entry, 40% faster lead response time, improved CRM data quality." }
      ]
    },
    {
      id: 5,
      title: "AI Workflows",
      category: "Claude Skills",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
      description: "Leveraging Anthropic's Claude for advanced content modeling and personalized marketing.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 501, heading: "Overview", content: "Leveraging Claude AI for advanced content modeling and personalized marketing at scale." },
        { id: 502, heading: "The Challenge", content: "Creating personalized content at scale was resource-intensive and inconsistent in quality." },
        { id: 503, heading: "Solution", content: "Designed custom Claude prompts and workflow scripts to generate, review, and publish content with consistent brand voice." },
        { id: 504, heading: "Results", content: "5x content output increase, maintained brand consistency, 60% reduction in content production costs." }
      ]
    },
    {
      id: 6,
      title: "Strategic Dashboard",
      category: "Resources",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
      description: "A comprehensive Google Sheets resource for tracking multi-channel marketing ROI.",
      driveLink: "",
      notionLink: "",
      gallery: [],
      sections: [
        { id: 601, heading: "Overview", content: "A comprehensive Google Sheets system for tracking multi-channel marketing ROI and campaign performance." },
        { id: 602, heading: "The Challenge", content: "Marketing data was scattered across platforms with no unified view of ROI." },
        { id: 603, heading: "Solution", content: "Built a custom Google Sheets dashboard pulling data via APIs from GA4, Search Console, Meta Ads, and more." },
        { id: 604, heading: "Results", content: "Unified view of all channel performance, 50% faster monthly reporting, data-driven budget allocation." }
      ]
    }
  ],

  footer: {
    address: "Permanently located in Chennai, Tamil Nadu",
    tagline: "Building digital bridges between brands and people."
  }
};
