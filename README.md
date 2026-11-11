# PCJ Property Consultants — Official Corporate Website

> **Premium Real Estate Consultancy | Kumaon, Uttarakhand**  
> *"Your Trusted Partner in Premium Real Estate & Property Investments in Kumaon"*  
> **Founder & Lead Real Estate Consultant:** Mr. Prakash Chandra Joshi  
> **Official Email:** [pcjpropertyconsultants23@gmail.com](mailto:pcjpropertyconsultants23@gmail.com)  
> **Established:** 1996 (Evolved to PCJ Property Consultancy)

---

## 🏔️ Overview

This is the complete, modern, premium, professional, and fully responsive corporate website for **PCJ Property Consultants**. 

The website is purpose-built to communicate nearly three decades of regional experience in the Kumaon region of Uttarakhand, showcase the nine verified property opportunities supplied by the business owner, provide an interactive geographical map navigator, and facilitate direct consultation requests for property buyers, sellers, and institutional investors.

### Key Business Scope
- **Exclusively Buying and Selling:** Specializing strictly in land transactions, luxury residences, agricultural parcels, and hospitality investments.
- **No Rental/Leasing:** No tenancy or rental booking services are advertised.
- **Strict Factual Accuracy:** Contains only verified factual information provided by Mr. Prakash Chandra Joshi and the official company profile.

---

## 🌲 Technical Architecture

- **Framework:** React 18 with Vite.js (TypeScript)
- **Styling:** Tailwind CSS (Custom Himalayan Luxury Palette: Forest Green, Champagne Gold, Warm Ivory, Mountain Slate)
- **Typography:** Cormorant Garamond / Cinzel (Serif) & Plus Jakarta Sans (Body)
- **Routing:** React Router v6 (Multi-page architecture with smooth scroll to top)
- **Icons:** Lucide React
- **Mapping:** Leaflet & OpenStreetMap (Interactive, free, offline-friendly, no paid API keys required)
- **State & Modals:** React Context API (`EnquiryModalContext`) for global property consultation modals

---

## 📂 Project Structure

```
pcj-property-consultants/
├── public/
│   ├── brand/
│   │   └── pcj-logo.jpg                # Official high-resolution brand logo
│   └── images/                         # Curated regional landscape & mountain imagery
│       ├── kumaon-peaks-golden-hour.jpg# Authentic Kumaon peak Alpenglow photograph
│       ├── himalaya-hero.jpg
│       ├── nainital.jpg
│       ├── ranikhet.jpg
│       ├── kausani.jpg
│       ├── mukteshwar.jpg
│       ├── jim-corbett.jpg
│       ├── luxury-resort.jpg
│       ├── luxury-villa.jpg
│       ├── heritage-cottage.jpg
│       ├── mountain-land.jpg
│       └── orchard-valley.jpg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx               # Status & category pills
│   │   │   ├── DisclaimerNotice.tsx    # Factual accuracy notices
│   │   │   ├── LandMeasurementGuide.tsx# Nali & Bigha unit explainer
│   │   │   ├── MountainDivider.tsx     # Gold diamond & peak motif divider
│   │   │   ├── PropertyCard.tsx        # Luxury property cards with maps & enquiry triggers
│   │   │   └── SectionHeading.tsx      # Consistent serif typography headers
│   │   ├── forms/
│   │   │   ├── GeneralEnquiryForm.tsx  # Full buyer & consultation enquiry form
│   │   │   └── SellPropertyForm.tsx    # Dedicated "Sell Your Property" advisory form
│   │   ├── layout/
│   │   │   ├── Footer.tsx              # Multi-column luxury footer with disclaimers
│   │   │   ├── Layout.tsx              # Master layout container
│   │   │   ├── Navbar.tsx              # Responsive sticky navigation with mobile drawer
│   │   │   └── TopBanner.tsx           # Regional credentials & quick mailto banner
│   │   ├── maps/
│   │   │   └── InteractiveKumaonMap.tsx# Leaflet interactive map with custom pins & popups
│   │   └── modals/
│   │       ├── PropertyDetailModal.tsx # Full factual modal with application potential
│   │       └── PropertyEnquiryModal.tsx# Pre-filled property enquiry popup
│   ├── context/
│   │   └── EnquiryModalContext.tsx     # Global modal state provider
│   ├── data/
│   │   ├── company.ts                  # Centralized business info, contact, vision, mission
│   │   ├── locations.ts                # 14+ Kumaon destinations & GPS coordinates
│   │   ├── projects.ts                 # 9 historical projects & track record (1996 - present)
│   │   ├── properties.ts               # 9 actual property opportunities supplied by owner
│   │   └── services.ts                 # 8 official business service categories
│   ├── pages/
│   │   ├── AboutPage.tsx               # History from 1996, Joshi Properties evolution, Founder profile
│   │   ├── ContactPage.tsx             # Contact details, Consultation & Sell Your Property forms
│   │   ├── HomePage.tsx                # Cinematic Himalayan hero, featured inventory, map preview
│   │   ├── LocationsPage.tsx           # Dedicated interactive map & transit connectivity guide
│   │   ├── ProjectsPage.tsx            # Legacy & track record timeline layout
│   │   ├── PropertiesPage.tsx          # 9 available properties with category & location filters
│   │   └── ServicesPage.tsx            # Deep dives into all 8 business services
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces
│   ├── App.tsx                         # Router configuration
│   ├── index.css                       # Tailwind layers & custom Leaflet styling
│   └── main.tsx                        # React DOM mounting
├── index.html                          # Meta tags, Google Fonts, Leaflet CSS
├── tailwind.config.js                  # Custom theme tokens & font families
├── vite.config.ts                      # Optimized rollup chunking
└── package.json
```

---

## 🛠️ How to Run & Build

### Development Mode
```bash
npm run dev
```
Starts the Vite local development server on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Typechecks and compiles an optimized static build into `dist/` with separate chunks for Leaflet, Lucide icons, vendor libraries, and application logic.

### Preview Production Build
```bash
npm run preview -- --port 4173
```
Serves the production bundle locally at `http://localhost:4173`.

---

## 📝 How to Update Factual Business Information

All business data is centralized in `src/data/`:
1. **Contact Information (`src/data/company.ts`):**  
   Update `phoneDisplay`, `phoneCallable`, `whatsappNumber`, or `officeAddress` when the business owner supplies them.
2. **Available Properties (`src/data/properties.ts`):**  
   Add or modify property opportunities. Ownership and transfer notes (`ownershipDetailsInternal`, `transferDetailsInternal`) remain internal unless approved.
3. **Historical Projects (`src/data/projects.ts`):**  
   Update or add legacy transactions, clearly identifying the specific role played.
4. **Geographical Coordinates (`src/data/locations.ts` & `src/data/properties.ts`):**  
   Coordinates can be refined as exact surveyed boundaries are confirmed.

---

## ✉️ Enquiry Form Backend Integration

The forms in `src/components/forms/` and `src/components/modals/PropertyEnquiryModal.tsx` include complete client-side validation, error handling, loading spinners, and local storage recording.

To connect real email delivery:
- **EmailJS:** Call `emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)` inside `handleSubmit`.
- **Formspree / Getform:** Point form `action` URL to your Formspree endpoint.
- **Custom REST / Node API:** Fetch `POST /api/enquiries` with `formData`.

---

## ⚖️ Non-Negotiable Factual Accuracy Rules
- Never invent property prices (use "On Request" or "Subject to Confirmation").
- Never represent illustrative landscape photography as an actual photograph of a listed property.
- Clearly distinguish the founder's 1996 origins (under Joshi Properties) from the current PCJ Property Consultancy identity (established 3-4 years ago).
- Exclusively advertise buying and selling of properties. Do not advertise rental or leasing services.
