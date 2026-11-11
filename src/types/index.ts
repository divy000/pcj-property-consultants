export interface Property {
  id: string;
  name: string;
  location: string;
  subLocation?: string;
  category: 'Land' | 'Heritage' | 'Farmhouse' | 'Commercial' | 'Villas';
  categoryLabel: string;
  landArea?: string;
  landAreaDetails?: string;
  ownershipDetailsInternal?: string; // Internal, not displayed publicly unless permitted
  transferDetailsInternal?: string;  // Internal, e.g. "Company Transfer"
  highlight: string;
  description: string;
  potentialApplications?: string[];
  approxCoordinates: {
    lat: number;
    lng: number;
  };
  googleMapsQuery: string;
  illustrativeImage: string;
  featured?: boolean;
}

export interface ProjectTrackRecord {
  id: string;
  name: string;
  location: string;
  yearOrPeriod: string;
  roleType: 'Land Identification & Acquisition' | 'Land-Related Work' | 'Land Deal' | 'Plotting & Land Work' | 'Development' | 'Land Sourcing';
  roleDescription: string;
  significance: string;
  currentStatusNote?: string;
  image: string;
}

export interface BusinessService {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  propertyScope: string[];
  idealFor: string[];
  keyAssistance: string[];
  iconName: string;
  image: string;
}

export interface KumaonLocation {
  id: string;
  name: string;
  district: string;
  altitude?: string;
  tagline: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hasAvailableProperties: boolean;
  associatedProperties?: string[];
  highlights: string[];
  image: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  subTagline: string;
  founder: {
    name: string;
    designation: string;
    experienceYears: string;
    originYear: number;
    legacyIdentity: string;
    currentIdentityAge: string;
    bio: string;
    coreCompetencies: string[];
  };
  contact: {
    email: string;
    phoneDisplay: string;
    phoneCallable: string;
    phoneConfigured: boolean;
    whatsappNumber: string;
    whatsappConfigured: boolean;
    officeAddress: string;
    officeConfigured: boolean;
    operatingRegion: string;
  };
  vision: string;
  mission: string[];
  strengths: {
    title: string;
    description: string;
    icon: string;
  }[];
  disclaimers: {
    propertyConfirmation: string;
    illustrativeImagery: string;
    approximateLocations: string;
    noRentalServices: string;
  };
}
