import type { Locale } from "@/lib/site";

export type Dictionary = {
  meta: { title: string; description: string; keywords: string };
  nav: Record<string, string>;
  header: {
    tagline: string;
    estimate: string;
    call: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    h1: string;
    sub: string;
    coverage: string;
    call: string;
    calculator: string;
    featuredKicker: string;
    featuredTitle: string;
    featuredBody: string;
    featuredCta: string;
    badges: string[];
  };
  trust: string[];
  services: {
    kicker: string;
    h2: string;
    intro: string;
    items: {
      title: string;
      subtitle: string;
      price: string;
      steps: string[];
    }[];
  };
  calculator: {
    kicker: string;
    h2: string;
    intro: string;
    requiredBadge: string;
    size: string;
    system: string;
    cove: string;
    customLabel: string;
    customHint: string;
    live: string;
    range: string;
    typical: string;
    coveLine: string;
    coveNone: string;
    book: string;
    call: string;
    disclaimer: string;
    categories: { residential: string; commercial: string; custom: string };
    spaces: Record<string, string>;
    systems: Record<string, string>;
    basementRate: string;
  };
  process: {
    kicker: string;
    h2: string;
    steps: { title: string; body: string }[];
  };
  gallery: {
    kicker: string;
    h2: string;
    intro: string;
    before: string;
    after: string;
    flakeTitle: string;
    metallicTitle: string;
    flakeBeforeAlt: string;
    flakeAlt: string;
    metallicBeforeAlt: string;
    metallicAlt: string;
  };
  areas: {
    kicker: string;
    h2: string;
    intro: string;
    maps: string;
  };
  contact: {
    kicker: string;
    h2: string;
    intro: string;
    name: string;
    phone: string;
    email: string;
    city: string;
    project: string;
    sqft: string;
    spaceType: string;
    system: string;
    notes: string;
    submit: string;
    sending: string;
    sent: string;
    error: string;
  };
  booking: {
    title: string;
    body: string;
    close: string;
    sent: string;
    submit: string;
  };
  faq: {
    kicker: string;
    h2: string;
    items: { q: string; a: string }[];
  };
  footer: {
    blurb: string;
    contact: string;
    explore: string;
    maps: string;
    legal: string;
    privacy: string;
    terms: string;
  };
  projectTypes: Record<string, string>;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Prime Epoxy Flooring | Top Garage & Metallic Epoxy Montreal & Laval",
      description:
        "Professional epoxy flooring, garage flake systems & luxury metallic epoxy coatings in Montreal, Laval & West Island. Commercial grade resins & polyaspartics. Free quote.",
      keywords:
        "epoxy flooring montreal, epoxy garage floor laval, metallic epoxy west island, plancher epoxy montreal, revetement epoxy garage",
    },
    nav: {
      services: "Systems",
      calculator: "Pricing",
      process: "Process",
      gallery: "Gallery",
      areas: "Service Areas",
      faq: "FAQ",
      contact: "Contact",
    },
    header: {
      tagline: "Greater Montreal",
      estimate: "Get Free Estimate",
      call: "Call",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Residential · Commercial · Luxury interiors",
      h1: "Quebec & Eastern Ontario's Premier Garage & Metallic Epoxy Flooring Specialists",
      sub: "Dustless diamond grinding, 100% solids commercial resins, and polyaspartic topcoats — installed in 1–2 days with a multi-year adhesion & delamination warranty.",
      coverage:
        "We coat residential garages & basements, luxury living spaces, auto showrooms, restaurants, commercial kitchens, and industrial facilities across Greater Montreal, Laval, West Island, and the South Shore.",
      call: "Call 438-815-8815",
      calculator: "Instant Price Calculator",
      featuredKicker: "Featured finish",
      featuredTitle: "Deep-glass metallic marble",
      featuredBody:
        "Multi-tone artistic pigments, custom veins, and a high-durability polyaspartic seal — showpiece floors for homes, showrooms, and hospitality.",
      featuredCta: "Book a Free On-Site Inspection",
      badges: [
        "XPS Certified",
        "Multi-Year Warranty",
        "1–2 Day Installation",
        "100% Solids Systems",
      ],
    },
    trust: [
      "Certified Professional Epoxy Installer (XPS Express Trained)",
      "100% Commercial-Grade Industrial Resins & Polyaspartics",
      "Multi-Year Adhesion & Delamination Warranty",
      "Dustless Diamond Grinding Mechanical Preparation",
    ],
    services: {
      kicker: "Revêtement de plancher en époxy · Commercial & résidentiel",
      h2: "Epoxy flooring systems for homes, hospitality, and industry",
      intro:
        "Full flake garage floors, metallic epoxy living spaces, sanitary commercial kitchens, auto showrooms, and industrial facilities — specified with commercial-grade resins, not big-box kits.",
      items: [
        {
          title: "Full Flake Broadcast (Flocons pour garage)",
          subtitle: "Residential garages & finished basements",
          price: "~$7–$9 / sq ft · Basements with prep ~$13–$15 / sq ft",
          steps: [
            "Mechanical diamond grinding",
            "100% solids pigmented epoxy base",
            "Full vinyl flake broadcast to refusal",
            "Scrape & vacuum",
            "High-durability clear polyaspartic seal coat",
          ],
        },
        {
          title: "Commercial Quartz System",
          subtitle: "Restaurants, commercial kitchens, retail & industrial",
          price: "~$9–$11 / sq ft",
          steps: [
            "Single & double broadcast heavy-duty aggregate",
            "Polyaspartic grout & topcoat",
            "Ultra-durable, sanitary, and non-slip",
          ],
        },
        {
          title: "Luxury 3D Metallic & Marble (Époxy métallique)",
          subtitle: "Living rooms, showrooms, and boutique interiors",
          price: "~$17–$21 / sq ft",
          steps: [
            "Multi-tone artistic metallic pigments",
            "Custom veins",
            "Deep glass reflection with polyaspartic protection",
          ],
        },
        {
          title: "Custom Countertops & Tables",
          subtitle: "Seamless furniture-grade resin",
          price: "Starting from $3,500 CAD",
          steps: [
            "Seamless waterfall edges",
            "Scratch and heat-resistant mirror finishes",
            "Bespoke colorways and metallic movement",
          ],
        },
        {
          title: "Cove Base & Stem Walls",
          subtitle: "Sanitary vertical protection",
          price: "$20–$25 / linear ft",
          steps: [
            "Seamless sanitary vertical curves",
            "Wall protection for wash-down kitchens and commercial spaces",
            "Fully integrated with floor broadcast systems",
          ],
        },
      ],
    },
    calculator: {
      kicker: "Instant pricing",
      h2: "Interactive Instant Cost Calculator",
      intro:
        "Budget residential, commercial, and luxury interior floors in CAD. Select a space type, system, and optional cove base — then book a free on-site inspection.",
      requiredBadge: "Free On-Site Estimate Required",
      size: "1. Space type",
      system: "2. System",
      cove: "3. Add-on: cove base",
      customLabel: "Custom square footage",
      customHint: "Drag up to 10,000+ sq ft",
      live: "Live estimate",
      range: "Estimated range",
      typical: "Typical mid",
      coveLine: "Cove base",
      coveNone: "Cove base not included",
      book: "Book Free On-Site Inspection",
      call: "Call 438-815-8815",
      disclaimer:
        "Estimates are for budgeting reference only. Final fixed pricing is confirmed after a Free On-Site Inspection assessing concrete condition, moisture, and diamond grind requirements.",
      categories: {
        residential: "Residential",
        commercial: "Commercial",
        custom: "Custom",
      },
      spaces: {
        "1-car": "1-Car Garage (250 sq ft)",
        "2-car": "2-Car Garage (450 sq ft)",
        "3-car": "3-Car Garage (650 sq ft)",
        basement: "Finished Basement (800 sq ft)",
        living: "Luxury Living Room / Interior (500 sq ft)",
        "wet-room": "Washroom / Kitchen (150 sq ft)",
        showroom: "Auto Showroom (2,000 sq ft)",
        restaurant: "Restaurant / Commercial Kitchen (1,200 sq ft)",
        retail: "Retail Store / Corporate Office (1,500 sq ft)",
        warehouse: "Warehouse / Industrial (3,500 sq ft)",
        custom: "Custom square footage",
      },
      systems: {
        flake: "Full Flake Broadcast",
        quartz: "Commercial Quartz",
        metallic: "Metallic Marble",
      },
      basementRate: "~$13–$15 / sq ft (basement prep)",
    },
    process: {
      kicker: "Preparation that lasts",
      h2: "4-Step Professional Preparation Process",
      steps: [
        {
          title: "Diamond Grinding (Mechanical Profiling)",
          body: "Dustless diamond grinding opens the concrete, removes contaminants, and creates a mechanical profile so industrial resins lock into the slab.",
        },
        {
          title: "Crack & Joint Industrial Repair",
          body: "Control joints, spalls, and structural cracks are filled with commercial repair compounds so the broadcast system reads as one seamless surface.",
        },
        {
          title: "Commercial Basecoat & Broadcast",
          body: "100% solids pigmented epoxy is rolled, then vinyl flake or quartz aggregate is broadcast to refusal for full hide, texture, and wear.",
        },
        {
          title: "Polyaspartic Clear Topcoat Seal",
          body: "A high-durability clear polyaspartic lock coat seals the system for UV stability, chemical resistance, and 1–2 day return-to-service.",
        },
      ],
    },
    gallery: {
      kicker: "Transformations",
      h2: "Before & After Visual Comparison Gallery",
      intro:
        "Drag each slider to compare worn concrete with a sealed flake garage or luxury metallic showroom floor.",
      before: "Before",
      after: "After",
      flakeTitle: "Full flake garage transformation / Transformation complète en flocon de garage",
      metallicTitle:
        "Luxury metallic showroom interior / Intérieur de salle d'exposition en époxy métallique de luxe",
      flakeBeforeAlt:
        "Worn unfinished concrete garage floor before Prime Epoxy Flooring flake broadcast coating in Montreal",
      flakeAlt:
        "Glossy full-flake epoxy garage floor after polyaspartic seal coat by Prime Epoxy Flooring Montreal",
      metallicBeforeAlt:
        "Interior concrete floor before luxury metallic epoxy coating in a Montreal showroom space",
      metallicAlt:
        "Luxury metallic marble epoxy flooring in a high-end interior showroom with deep glass reflection",
    },
    areas: {
      kicker: "Local coverage",
      h2: "Greater Montreal, Laval, West Island & South Shore",
      intro:
        "Select your city to pre-fill your inspection request. We also serve Gatineau QC and Ottawa ON.",
      maps: "Find Us on Google Maps",
    },
    contact: {
      kicker: "Lead capture",
      h2: "Contact & Free Estimate",
      intro:
        "Tell us the space type, system, and square footage. We reply with inspection availability for Montreal, Laval, West Island, Brossard, Longueuil, and Pointe-Claire.",
      name: "Name",
      phone: "Phone number",
      email: "Email",
      city: "City / Area",
      project: "Project type",
      sqft: "Estimated sq ft",
      spaceType: "Space type",
      system: "System",
      notes: "Notes",
      submit: "Request Free Estimate",
      sending: "Sending…",
      sent: "Thank you! We received your quote request.",
      error: "Could not send. Please call 438-815-8815 or email sales@primeepoxyflooring.ca.",
    },
    booking: {
      title: "Free On-Site Inspection",
      body: "Lock in a precise quote. Or call",
      close: "Close booking form",
      sent: "Thank you! We received your quote request.",
      submit: "Request Inspection",
    },
    faq: {
      kicker: "FAQ",
      h2: "Answers before you book",
      items: [
        {
          q: "How long does epoxy and polyaspartic flooring take to cure?",
          a: "Most Prime Epoxy Flooring systems are installed in 1–2 days. Polyaspartic topcoats typically allow light foot traffic the same evening and vehicle return the next day, depending on temperature, humidity, and film thickness. We confirm exact return-to-service during your on-site inspection.",
        },
        {
          q: "Will the floor survive Quebec winter salt?",
          a: "Yes. Our commercial-grade 100% solids resins and polyaspartic lock coats are specified for freeze-thaw, de-icing salts, hot-tire pickup, garage chemicals, and commercial kitchen traffic. Mechanical diamond grinding is what makes that resistance last.",
        },
        {
          q: "What does the multi-year warranty cover?",
          a: "Installations include a multi-year adhesion and delamination warranty when we control surface preparation: dustless diamond grinding, moisture evaluation, crack repair, and manufacturer-aligned film builds.",
        },
        {
          q: "Do you moisture-test the concrete before coating?",
          a: "Yes. Slabs that outgas or hold residual moisture can cause bubbles and delamination. We assess moisture and porosity before specifying flake, quartz, or metallic systems.",
        },
        {
          q: "Do you only coat garages?",
          a: "No. We install residential garages and basements, luxury living interiors, auto showrooms, restaurants, commercial kitchens, retail, offices, warehouses, and industrial facilities throughout Greater Montreal.",
        },
      ],
    },
    footer: {
      blurb:
        "Residential, commercial, and luxury interior epoxy flooring across Greater Montreal, Laval, West Island, and the South Shore — XPS Express trained installers using 100% commercial-grade resins and polyaspartics.",
      contact: "Contact",
      explore: "Explore",
      maps: "Find Us on Google Maps",
      legal:
        "Estimates are guides only until a free on-site inspection is completed.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    projectTypes: {
      flake: "Full Flake Broadcast (Garage / Basement)",
      quartz: "Commercial Quartz System",
      metallic: "Luxury 3D Metallic & Marble",
      countertops: "Custom Countertops & Tables",
      cove: "Cove Base & Stem Walls",
      unsure: "Not sure — need a recommendation",
    },
  },
  fr: {
    meta: {
      title:
        "Prime Epoxy Flooring | Plancher Époxy Garage & Métallique Montréal & Laval",
      description:
        "Revêtement de plancher en époxy professionnel, systèmes flocons pour garage et époxy métallique de luxe à Montréal, Laval et West Island. Résines commerciales et polyaspartiques. Soumission gratuite.",
      keywords:
        "epoxy flooring montreal, epoxy garage floor laval, metallic epoxy west island, plancher epoxy montreal, revetement epoxy garage",
    },
    nav: {
      services: "Systèmes",
      calculator: "Prix",
      process: "Procédé",
      gallery: "Galerie",
      areas: "Secteurs",
      faq: "FAQ",
      contact: "Contact",
    },
    header: {
      tagline: "Grand Montréal",
      estimate: "Soumission gratuite",
      call: "Appeler",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    hero: {
      kicker: "Résidentiel · Commercial · Intérieurs de luxe",
      h1: "Spécialistes de planchers d'époxy pour garages et époxy métallique au Québec et dans l'Est ontarien",
      sub: "Meulage au diamant sans poussière, résines commerciales 100 % solides et topcoats polyaspartiques — installés en 1 à 2 jours, avec garantie d'adhérence et de délamination sur plusieurs années.",
      coverage:
        "Nous revêtons les garages et sous-sols résidentiels, les espaces de vie de luxe, les salles de montre automobiles, les restaurants, les cuisines commerciales et les installations industrielles dans le Grand Montréal, Laval, le West Island et la Rive-Sud.",
      call: "Appeler le 438-815-8815",
      calculator: "Calculateur de prix instantané",
      featuredKicker: "Fini en vedette",
      featuredTitle: "Marbre métallique à reflet de verre",
      featuredBody:
        "Pigments métalliques multi-tons, veines sur mesure et scellant polyaspartique haute durabilité — des planchers signature pour maisons, salles de montre et hôtellerie.",
      featuredCta: "Réserver une inspection gratuite sur place",
      badges: [
        "Certifié XPS",
        "Garantie pluriannuelle",
        "Installation 1–2 jours",
        "Systèmes 100 % solides",
      ],
    },
    trust: [
      "Installateur professionnel d'époxy certifié (formation XPS Express)",
      "Résines industrielles et polyaspartiques 100 % de calibre commercial",
      "Garantie d'adhérence et de délamination sur plusieurs années",
      "Préparation mécanique par meulage au diamant sans poussière",
    ],
    services: {
      kicker: "Revêtement de plancher en époxy · Commercial et résidentiel",
      h2: "Systèmes d'époxy pour maisons, hôtellerie et industrie",
      intro:
        "Flocons pour garage, époxy métallique pour intérieurs de luxe, cuisines commerciales sanitaires, salles de montre et installations industrielles — spécifiés avec des résines de calibre commercial.",
      items: [
        {
          title: "Système flocons complets (Flocons pour garage)",
          subtitle: "Garages résidentiels et sous-sols aménagés",
          price: "~7 $–9 $ / pi² · Sous-sols avec préparation ~13 $–15 $ / pi²",
          steps: [
            "Meulage mécanique au diamant",
            "Base d'époxy pigmentée 100 % solides",
            "Broadcast de flocons de vinyle jusqu'à saturation",
            "Grattage et aspirateur",
            "Scellant polyaspartique clair haute durabilité",
          ],
        },
        {
          title: "Système quartz commercial",
          subtitle: "Restaurants, cuisines commerciales, commerce et industrie",
          price: "~9 $–11 $ / pi²",
          steps: [
            "Agrégat haute résistance en simple ou double broadcast",
            "Coulis et topcoat polyaspartiques",
            "Ultra-durable, sanitaire et antidérapant",
          ],
        },
        {
          title: "Époxy métallique 3D et marbre de luxe",
          subtitle: "Salons, salles de montre et intérieurs boutique",
          price: "~17 $–21 $ / pi²",
          steps: [
            "Pigments métalliques artistiques multi-tons",
            "Veines sur mesure",
            "Reflet de verre profond avec protection polyaspartique",
          ],
        },
        {
          title: "Comptoirs et tables sur mesure",
          subtitle: "Résine de qualité mobilier, joints invisibles",
          price: "À partir de 3 500 $ CAD",
          steps: [
            "Bords cascade sans joint",
            "Finis miroir résistants aux rayures et à la chaleur",
            "Couleurs et mouvements métalliques sur mesure",
          ],
        },
        {
          title: "Plinthes à gorge et murs de fondation",
          subtitle: "Protection verticale sanitaire",
          price: "20 $–25 $ / pi lin.",
          steps: [
            "Courbes verticales sanitaires sans joint",
            "Protection murale pour cuisines de lavage et espaces commerciaux",
            "Intégration complète aux systèmes de plancher",
          ],
        },
      ],
    },
    calculator: {
      kicker: "Prix instantané",
      h2: "Calculateur de coût interactif",
      intro:
        "Budgétez un plancher résidentiel, commercial ou intérieur de luxe en dollars canadiens. Choisissez l'espace, le système et une plinthe à gorge optionnelle, puis réservez une inspection gratuite.",
      requiredBadge: "Soumission gratuite sur place obligatoire",
      size: "1. Type d'espace",
      system: "2. Système",
      cove: "3. Option : plinthe à gorge",
      customLabel: "Superficie personnalisée",
      customHint: "Jusqu'à 10 000 pi² et plus",
      live: "Estimation en direct",
      range: "Fourchette estimée",
      typical: "Milieu typique",
      coveLine: "Plinthe à gorge",
      coveNone: "Plinthe à gorge non incluse",
      book: "Réserver une inspection gratuite",
      call: "Appeler le 438-815-8815",
      disclaimer:
        "Les estimations servent uniquement de référence budgétaire. Le prix fixe final est confirmé après une inspection gratuite sur place évaluant l'état du béton, l'humidité et les besoins de meulage au diamant.",
      categories: {
        residential: "Résidentiel",
        commercial: "Commercial",
        custom: "Personnalisé",
      },
      spaces: {
        "1-car": "Garage 1 voiture (250 pi²)",
        "2-car": "Garage 2 voitures (450 pi²)",
        "3-car": "Garage 3 voitures (650 pi²)",
        basement: "Sous-sol aménagé (800 pi²)",
        living: "Salon / intérieur de luxe (500 pi²)",
        "wet-room": "Salle de bain / cuisine (150 pi²)",
        showroom: "Salle de montre auto (2 000 pi²)",
        restaurant: "Restaurant / cuisine commerciale (1 200 pi²)",
        retail: "Commerce / bureau (1 500 pi²)",
        warehouse: "Entrepôt / industriel (3 500 pi²)",
        custom: "Superficie personnalisée",
      },
      systems: {
        flake: "Flocons complets",
        quartz: "Quartz commercial",
        metallic: "Marbre métallique",
      },
      basementRate: "~13 $–15 $ / pi² (préparation sous-sol)",
    },
    process: {
      kicker: "Une préparation qui dure",
      h2: "Procédé professionnel en 4 étapes",
      steps: [
        {
          title: "Meulage au diamant (profilage mécanique)",
          body: "Le meulage sans poussière ouvre le béton, retire les contaminants et crée un profil mécanique pour que les résines industrielles s'ancrent dans la dalle.",
        },
        {
          title: "Réparation industrielle des fissures et joints",
          body: "Joints de contrôle, éclats et fissures sont comblés avec des composés commerciaux pour un système de broadcast parfaitement continu.",
        },
        {
          title: "Couche de base commerciale et broadcast",
          body: "Époxy pigmentée 100 % solides, puis flocons de vinyle ou agrégat de quartz jusqu'à saturation pour l'opacité, la texture et l'usure.",
        },
        {
          title: "Scellant polyaspartique clair",
          body: "Un topcoat polyaspartique haute durabilité scelle le système : stabilité UV, résistance chimique et remise en service en 1 à 2 jours.",
        },
      ],
    },
    gallery: {
      kicker: "Transformations",
      h2: "Galerie comparative avant / après",
      intro:
        "Faites glisser chaque curseur pour comparer un béton usé à un garage en flocons lustré ou à un intérieur métallique de luxe.",
      before: "Avant",
      after: "Après",
      flakeTitle: "Full flake garage transformation / Transformation complète en flocon de garage",
      metallicTitle:
        "Luxury metallic showroom interior / Intérieur de salle d'exposition en époxy métallique de luxe",
      flakeBeforeAlt:
        "Plancher de garage en béton usé avant revêtement en flocons Prime Epoxy Flooring à Montréal",
      flakeAlt:
        "Plancher de garage en époxy flocons lustré après scellant polyaspartique par Prime Epoxy Flooring Montréal",
      metallicBeforeAlt:
        "Plancher intérieur en béton avant époxy métallique de luxe dans une salle d'exposition à Montréal",
      metallicAlt:
        "Plancher d'époxy marbre métallique de luxe dans une salle d'exposition intérieure avec reflet de verre profond",
    },
    areas: {
      kicker: "Couverture locale",
      h2: "Grand Montréal, Laval, West Island et Rive-Sud",
      intro:
        "Choisissez votre ville pour préremplir la demande d'inspection. Nous desservons aussi Gatineau QC et Ottawa ON.",
      maps: "Trouvez-nous sur Google Maps",
    },
    contact: {
      kicker: "Demande de soumission",
      h2: "Contact et soumission gratuite",
      intro:
        "Indiquez le type d'espace, le système et la superficie. Nous confirmons les plages d'inspection pour Montréal, Laval, West Island, Brossard, Longueuil et Pointe-Claire.",
      name: "Nom",
      phone: "Numéro de téléphone",
      email: "Courriel",
      city: "Ville / secteur",
      project: "Type de projet",
      sqft: "Superficie estimée (pi²)",
      spaceType: "Type d'espace",
      system: "Système",
      notes: "Notes",
      submit: "Demander une soumission gratuite",
      sending: "Envoi…",
      sent: "Merci! Nous avons bien reçu votre demande de soumission.",
      error:
        "Envoi impossible. Appelez le 438-815-8815 ou écrivez à sales@primeepoxyflooring.ca.",
    },
    booking: {
      title: "Inspection gratuite sur place",
      body: "Obtenez un prix précis. Ou appelez le",
      close: "Fermer le formulaire",
      sent: "Merci! Nous avons bien reçu votre demande de soumission.",
      submit: "Demander l'inspection",
    },
    faq: {
      kicker: "FAQ",
      h2: "Réponses avant de réserver",
      items: [
        {
          q: "Combien de temps faut-il pour le durcissement de l'époxy et du polyaspartique ?",
          a: "La plupart des systèmes Prime Epoxy Flooring s'installent en 1 à 2 jours. Les topcoats polyaspartiques permettent souvent la circulation piétonne le soir même et le retour des véhicules le lendemain, selon la température, l'humidité et l'épaisseur. Nous confirmons le délai exact lors de l'inspection.",
        },
        {
          q: "Le plancher résiste-t-il au sel d'hiver du Québec ?",
          a: "Oui. Nos résines 100 % solides et nos scellants polyaspartiques sont spécifiés pour le gel-dégel, les sels de déglaçage, les pneus chauds, les produits de garage et le trafic de cuisine commerciale. C'est le meulage mécanique au diamant qui rend cette résistance durable.",
        },
        {
          q: "Que couvre la garantie pluriannuelle ?",
          a: "Les installations incluent une garantie d'adhérence et de délamination sur plusieurs années lorsque nous contrôlons la préparation : meulage au diamant, évaluation d'humidité, réparation des fissures et films conformes au fabricant.",
        },
        {
          q: "Testez-vous l'humidité du béton avant le revêtement ?",
          a: "Oui. Une dalle qui dégaze ou retient de l'humidité peut causer bulles et délamination. Nous évaluons l'humidité et la porosité avant de spécifier un système flocons, quartz ou métallique.",
        },
        {
          q: "Revêtez-vous seulement les garages ?",
          a: "Non. Nous installons garages et sous-sols résidentiels, intérieurs de luxe, salles de montre, restaurants, cuisines commerciales, commerces, bureaux, entrepôts et installations industrielles dans tout le Grand Montréal.",
        },
      ],
    },
    footer: {
      blurb:
        "Planchers d'époxy résidentiels, commerciaux et intérieurs de luxe dans le Grand Montréal, Laval, le West Island et la Rive-Sud — installateurs formés XPS Express, résines et polyaspartiques 100 % de calibre commercial.",
      contact: "Contact",
      explore: "Explorer",
      maps: "Trouvez-nous sur Google Maps",
      legal:
        "Les estimations sont indicatives jusqu'à l'inspection gratuite sur place.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
    },
    projectTypes: {
      flake: "Flocons complets (garage / sous-sol)",
      quartz: "Système quartz commercial",
      metallic: "Époxy métallique 3D et marbre",
      countertops: "Comptoirs et tables sur mesure",
      cove: "Plinthes à gorge et murs",
      unsure: "Incertain — j'ai besoin d'un conseil",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}

export function localePath(locale: Locale, hash = "") {
  const base = locale === "fr" ? "/fr" : "/";
  return hash ? `${base}${hash.startsWith("#") ? hash : `#${hash}`}` : base;
}
