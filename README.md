# PCJ Property Consultants — Official Website

A modern, responsive, full-stack real estate consultancy website developed for **PCJ Property Consultants**, specialising in premium property opportunities, land transactions and real estate consultancy in Kumaon, Uttarakhand.

**Live Website:** https://pcj-property-consultants.pages.dev

**Project Type:** Real-World Client Project  
**Developer:** Divyanshu Singh Parihar  
**Role:** Independent Full-Stack Developer

---

## Project Overview

PCJ Property Consultants is a business website designed to establish an online presence for a real estate consultancy operating in the Kumaon region of Uttarakhand.

The platform enables prospective buyers, property owners and institutional clients to explore property opportunities, discover the consultancy's projects and locations, and submit enquiries directly through the website.

It also includes an administrative dashboard that allows authorised users to manage website content and customer enquiries without modifying the source code.

The website reflects the business's regional experience, originating in 1996 under Joshi Properties and subsequently evolving into PCJ Property Consultancy.

## Key Features

### 1. Public Website

- Responsive design for desktop, tablet and mobile devices.
- Property listings with descriptions, images, categories and location information.
- Property browsing and filtering functionality.
- Dedicated projects and legacy portfolio.
- Location pages featuring an interactive Kumaon map.
- Individual property details and consultation modals.
- General consultation and property-selling enquiry forms.
- Contact information and business services.

### 2. Administrative Dashboard

- Secure administrator authentication.
- Create, edit, publish and manage property listings.
- Manage projects and their publication status.
- Manage locations and destination information.
- Upload and manage property and project images.
- View and manage customer enquiries.
- Update enquiry statuses, including New, Contacted, In Progress and Resolved.

### 3. Backend and Database

- Supabase PostgreSQL database integration.
- Database-driven property, project and location management.
- Supabase Authentication for administrator access.
- Row Level Security (RLS) policies for database access control.
- Supabase Storage for property and project images.
- Customer enquiry submissions stored directly in the database.
- Separate public and administrative access permissions.

### 4. Interactive Mapping

- Interactive geographical map of the Kumaon region.
- Leaflet-based map rendering with OpenStreetMap.
- Location and property markers using geographical coordinates.
- Interactive map popups and property enquiry actions.

---

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 18, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS, Custom CSS |
| Routing | React Router |
| Icons | Lucide React |
| Mapping | Leaflet, OpenStreetMap |
| Backend Platform | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| Security | PostgreSQL Row Level Security (RLS) |
| Version Control | Git, GitHub |
| Hosting & Deployment | Cloudflare Pages |

---

## Application Architecture

The application follows a frontend-and-backend-as-a-service architecture.

**Frontend:** React and TypeScript provide the responsive user interface, navigation, forms, property listings and administrative dashboard.

**Backend:** Supabase provides the backend services, including database operations, administrator authentication and image storage.

**Database:** PostgreSQL stores properties, projects, locations, services and customer enquiries.

**Security:** Supabase Row Level Security policies restrict database operations according to user permissions and publication status.

**Deployment:** Cloudflare Pages hosts the production website, with GitHub used for source-code management and deployment integration.

---

## Local Development Setup

### Prerequisites

- Node.js and npm
- Git
- A configured Supabase project with the required database schema and storage bucket

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd pcj-property-consultants
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Replace the placeholder values with the appropriate Supabase project configuration.

**Important:** Never expose a Supabase service-role key, database password or other privileged credentials in frontend code or public repositories.

### 4. Start the Development Server

```bash
npm run dev
```

Vite starts the local development server.

### 5. Create a Production Build

```bash
npm run build
```

The optimised production files are generated in the `dist/` directory.

### 6. Preview the Production Build

```bash
npm run preview -- --port 4173
```

---

## Database and Security

The application uses Supabase PostgreSQL with separate tables for:

- `properties`
- `projects`
- `locations`
- `services`
- `property_inquiries`
- `admin_users`

Database access is controlled through Row Level Security policies.

The security implementation includes:

- Public access to published properties and projects.
- Public access to active locations and services.
- Restricted customer enquiry insertion.
- Protection of customer enquiry records from public access.
- Administrative access checks for protected operations.
- Authenticated image-management permissions.

The website uses the Supabase publishable key in the frontend. Privileged service-role credentials are not intended for client-side use.

---

## Deployment

The production website is hosted on **Cloudflare Pages**.

The deployment workflow uses GitHub as the source-code repository.

**Build Command:**

```bash
npm run build
```

**Build Output Directory:**

```text
dist
```

Environment variables are configured through the hosting platform.

Production updates are deployed through the GitHub integration whenever changes are pushed to the configured production branch.

---

## Project Development and Contributions

**Developer:** Divyanshu Singh Parihar

**Role:** Independent Full-Stack Developer

**Project:** PCJ Property Consultants — Official Business Website

**Responsibilities:**

- Developed and implemented the responsive website using React and TypeScript.
- Integrated Supabase as the backend platform.
- Designed and integrated database-driven property, project and location management.
- Implemented administrator authentication and database access controls.
- Developed customer enquiry workflows connected to PostgreSQL.
- Implemented image upload and storage functionality.
- Integrated interactive geographical mapping.
- Configured Git-based source control and Cloudflare Pages deployment.
- Tested public website functionality, administrative workflows and mobile responsiveness.

AI-assisted development tools were used during parts of the development process.

---

## Business Information and Content Accuracy

The website is developed around the business information and property details supplied or approved by PCJ Property Consultants.

The following principles are maintained:

- Do not invent property prices or ownership information.
- Clearly distinguish illustrative regional photography from actual property photographs.
- Verify property descriptions and transaction information with the business owner.
- Do not advertise rental or leasing services.
- Update historical project information only when supported by verified business records.

---

## Acknowledgements

Developed for PCJ Property Consultants using React, TypeScript, Supabase and Cloudflare Pages, with AI-assisted development tools used during implementation.