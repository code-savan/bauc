import {
  Wifi,
  Car,
  Tv,
  Utensils,
  Snowflake,
  Dumbbell,
  ShieldCheck,
  Trees,
  Waves,
  Gamepad2,
  Bath,
//   Parking,
  Cctv,
  Sofa,
  Shirt,
  Baby,
  Flame,
  Coffee,
  Footprints,
  Warehouse,
//   Elevator,
  Plug,
  Flower2,
  Bike,
  Plane,
  Bus,
  Landmark,
  Bed,
  Armchair,
  Fingerprint,
  Lightbulb,
  Trash2,
  Recycle,
  Droplets,
  Wind,
  Ruler,
  Palette,
  Sparkles,
  Tent,
  Leaf
} from 'lucide-react';

// Categorized amenities for better organization
export const amenities = [
  // Basic Amenities
  { label: "Wi-Fi", icon: Wifi, category: "basic" },
  //   { label: "Parking", icon: Parking, category: "basic" },
  { label: "TV", icon: Tv, category: "basic" },
  { label: "Kitchen", icon: Utensils, category: "basic" },
  { label: "Air Conditioning", icon: Snowflake, category: "basic" },
  { label: "Heating", icon: Flame, category: "basic" },
  { label: "Bathroom", icon: Bath, category: "basic" },
  { label: "Bedroom", icon: Bed, category: "basic" },
  { label: "Living Room", icon: Sofa, category: "basic" },
  { label: "Furniture", icon: Armchair, category: "basic" },

  // Recreational Amenities
  { label: "Gym", icon: Dumbbell, category: "recreational" },
  { label: "Swimming Pool", icon: Waves, category: "recreational" },
  { label: "Game Room", icon: Gamepad2, category: "recreational" },
  { label: "Jogging Track", icon: Footprints, category: "recreational" },
  { label: "Garden", icon: Trees, category: "recreational" },
  { label: "Outdoor Space", icon: Flower2, category: "recreational" },
  { label: "Bike Storage", icon: Bike, category: "recreational" },
  { label: "BBQ Area", icon: Flame, category: "recreational" },
  { label: "Playground", icon: Baby, category: "recreational" },
  { label: "Picnic Area", icon: Tent, category: "recreational" },

  // Security & Safety
  { label: "Security", icon: ShieldCheck, category: "security" },
  { label: "CCTV", icon: Cctv, category: "security" },
  { label: "Biometric Access", icon: Fingerprint, category: "security" },
  { label: "24/7 Security", icon: ShieldCheck, category: "security" },
  { label: "Gated Community", icon: ShieldCheck, category: "security" },

  // Convenience
//   { label: "Elevator", icon: Elevator, category: "convenience" },
  { label: "Laundry", icon: Shirt, category: "convenience" },
  { label: "Storage", icon: Warehouse, category: "convenience" },
  { label: "Cafeteria", icon: Coffee, category: "convenience" },
  { label: "Power Backup", icon: Plug, category: "convenience" },
  { label: "Waste Disposal", icon: Trash2, category: "convenience" },
  { label: "Recycling", icon: Recycle, category: "convenience" },

  // Transportation
  { label: "Airport Shuttle", icon: Plane, category: "transportation" },
  { label: "Public Transport", icon: Bus, category: "transportation" },
  { label: "Taxi Service", icon: Car, category: "transportation" },

  // Environment
  { label: "Green Building", icon: Leaf, category: "environment" },
  { label: "Water Conservation", icon: Droplets, category: "environment" },
  { label: "Energy Efficient", icon: Lightbulb, category: "environment" },
  { label: "Natural Ventilation", icon: Wind, category: "environment" },

  // Special Features
  { label: "Landmark View", icon: Landmark, category: "special" },
  { label: "High Ceiling", icon: Ruler, category: "special" },
  { label: "Designer Interiors", icon: Palette, category: "special" },
  { label: "Premium Finishes", icon: Sparkles, category: "special" }
];

// Helper function to get amenities by category
export const getAmenitiesByCategory = (category: string) => {
  return amenities.filter(amenity => amenity.category === category);
};

// Helper function to find an amenity by label (case insensitive)
export const findAmenityByLabel = (label: string) => {
  return amenities.find(amenity =>
    amenity.label.toLowerCase() === label.toLowerCase()
  );
};
