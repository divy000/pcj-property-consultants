import { ProjectTrackRecord } from '../types';

export const projectsData: (ProjectTrackRecord & { coordinates?: { lat: number; lng: number }; googleMapsQuery?: string })[] = [
  {
    id: "proj-the-hridayesh-resort",
    name: "The Hridayesh Spa Wilderness Resort",
    location: "Dhikuli, Ramnagar, Jim Corbett, Uttarakhand",
    yearOrPeriod: "2009",
    roleType: "Land Identification & Acquisition",
    roleDescription: "Mr. Prakash Chandra Joshi handled the identification, acquisition, and sale of the resort's land.",
    significance: "A premier 5-star luxury wilderness resort nestled amidst dense mango groves along the banks of the Kosi River in Dhikuli, Jim Corbett. This landmark transaction exemplifies our long-standing capability in strategic site identification and large hospitality land acquisitions.",
    image: "/images/hridayesh-resort-actual.jpg",
    coordinates: { lat: 29.4316, lng: 79.1362 },
    googleMapsQuery: "The Hridayesh Spa Wilderness Resort, Dhikuli, Ramnagar, Uttarakhand"
  },
  {
    id: "proj-wood-castle",
    name: "Wood Castle Spa & Resort",
    location: "Dhikuli, Ramnagar, Jim Corbett, Uttarakhand",
    yearOrPeriod: "2009",
    roleType: "Land-Related Work",
    roleDescription: "Land-related work for the project was carried out under the leadership of Mr. Prakash Chandra Joshi.",
    significance: "Assisted in the foundational land processes and zoning facilitation for one of Dhikuli's prominent riverside resort establishments along the Kosi River corridor, demonstrating deep familiarity with hospitality zoning and forest boundary diligence.",
    image: "/images/wood-castle-resort-actual.jpg",
    coordinates: { lat: 29.4385, lng: 79.1325 },
    googleMapsQuery: "Wood Castle Spa & Resort, Dhikuli, Ramnagar, Uttarakhand"
  },
  {
    id: "proj-roop-resort",
    name: "Corbett Roop Resorts",
    location: "Mohan, Ramnagar, Jim Corbett, Uttarakhand",
    yearOrPeriod: "2002",
    roleType: "Land-Related Work",
    roleDescription: "Mr. Prakash Chandra Joshi handled the comprehensive land-related work for the project.",
    significance: "An early milestone in our hospitality track record dating back over two decades, establishing foundational land acquisition and terrain verification expertise in the pristine Mohan wilderness corridor.",
    image: "/images/corbett-wilderness-actual.jpg",
    coordinates: { lat: 29.5442, lng: 79.1038 },
    googleMapsQuery: "Corbett Roop Resorts, Mohan, Ramnagar, Uttarakhand"
  },
  {
    id: "proj-agricultural-chhoi",
    name: "Agricultural Land Transaction — Chhoi",
    location: "Chhoi, Ramnagar (Near Shri Hanuman Dham), Uttarakhand",
    yearOrPeriod: "Around 2009",
    roleType: "Land Deal",
    roleDescription: "A large agricultural land transaction was successfully completed under the supervision of Mr. Prakash Chandra Joshi.",
    significance: "Demonstrates extensive experience in executing complex, large-scale agricultural acreage transactions along the scenic Ramnagar-Haldwani foothills while ensuring strict compliance with Uttarakhand agrarian revenue laws.",
    image: "/images/chhoi-actual.jpg",
    coordinates: { lat: 29.3625, lng: 79.1558 },
    googleMapsQuery: "Chhoi, Ramnagar, Nainital, Uttarakhand"
  },
  {
    id: "proj-himmatpur-plotting",
    name: "Himmatpur Plotting Project",
    location: "Himmatpur Dotiyal, Ramnagar–Kashipur Road, Uttarakhand",
    yearOrPeriod: "Started in 2009",
    roleType: "Plotting & Land Work",
    roleDescription: "The plotting project was developed under Mr. Prakash Chandra Joshi's guidance, with plots still available.",
    significance: "A systematically planned residential plotting project designed to provide organized residential plots with structured layout, internal access roads, and clear freehold titles in the rapidly growing Ramnagar-Kashipur corridor.",
    currentStatusNote: "Selected residential plots currently available for discerning buyers.",
    image: "/images/mountain-land.jpg",
    coordinates: { lat: 29.3480, lng: 79.0850 },
    googleMapsQuery: "Himmatpur Dotiyal, Ramnagar, Uttarakhand"
  },
  {
    id: "proj-white-hills-cottages",
    name: "White Hills Cottages",
    location: "Ranikhet (Village Thauli / Binsar Mahadev), Uttarakhand",
    yearOrPeriod: "Recent Years",
    roleType: "Development",
    roleDescription: "Developed by Mr. Prakash Chandra Joshi under the PCJ Property Consultancy identity.",
    significance: "An exclusive mountain cottage development nestled in the serene pine forests of Ranikhet, reflecting our commitment to refined Himalayan residential architecture and high-altitude living.",
    image: "/images/heritage-cottage.jpg",
    coordinates: { lat: 29.6250, lng: 79.3850 },
    googleMapsQuery: "Ranikhet, Almora, Uttarakhand"
  },
  {
    id: "proj-ranikhet-plotting",
    name: "Ranikhet Plotting Project",
    location: "Ranikhet, Almora District, Uttarakhand",
    yearOrPeriod: "Recent Years",
    roleType: "Plotting & Land Work",
    roleDescription: "PCJ Property Consultancy carried out specialized plotting work on the land. The project still has plots available.",
    significance: "Skillful land partitioning and layout design tailored to the undulating topography of Ranikhet, creating well-defined residential opportunities surrounded by pine forests.",
    currentStatusNote: "Select residential plots currently available for acquisition.",
    image: "/images/ranikhet-actual.jpg",
    coordinates: { lat: 29.6434, lng: 79.4322 },
    googleMapsQuery: "Ranikhet, Almora, Uttarakhand"
  },
  {
    id: "proj-himalayan-heights",
    name: "The Himalayan Heights",
    location: "Malla Ramgarh, Bhowali–Mukteshwar Road, Nainital, Uttarakhand",
    yearOrPeriod: "Recent Years",
    roleType: "Land Sourcing",
    roleDescription: "The project land was sourced through PCJ Property Consultancy.",
    significance: "Sourcing premium high-elevation land in the picturesque fruit bowl of Kumaon (Ramgarh), offering commanding Himalayan snow vistas and peaceful mountain surroundings.",
    image: "/images/ramgarh-actual.jpg",
    coordinates: { lat: 29.4260, lng: 79.5530 },
    googleMapsQuery: "Malla Ramgarh, Uttarakhand"
  },
  {
    id: "proj-temple-ten-gd-goenka",
    name: "GD Goenka International School (formerly Templeton Academy / Temple Ten)",
    location: "Naukuchiatal, Nainital District, Uttarakhand",
    yearOrPeriod: "Around 2006–07",
    roleType: "Land Deal",
    roleDescription: "PCJ Property Consultancy, under Mr. Prakash Chandra Joshi's leadership, handled the land deal for the institution now known as GD Goenka International School.",
    significance: "Facilitating a landmark institutional land acquisition on a commanding hilltop in the scenic Naukuchiatal lake region, demonstrating our capability in large-scale educational and institutional transactions.",
    image: "/images/gd-goenka-naukuchiatal-actual.jpg",
    coordinates: { lat: 29.3190, lng: 79.5850 },
    googleMapsQuery: "GD Goenka International School, Naukuchiatal, Nainital, Uttarakhand"
  }
];
