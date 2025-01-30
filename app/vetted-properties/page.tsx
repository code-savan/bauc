import Image from 'next/image';
import Link from 'next/link';
import PropCard from '@/components/PropCard'

interface Property {
  id: string;
  name: string;
  location: string;
  status: string;
  area: string;
  type: string;
  title: string;
  image: string;
  price?: string;
}

const properties: Property[] = [
  {
    id: '1',
    name: 'Queenfem Plaza by Kingfem',
    location: 'Wuse II, Abuja',
    status: 'Completed',
    area: '1.5sqm',
    type: 'Commercial',
    title: 'CoO',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800',
    price: '₦180M',
  },
  {
    id: '2',
    name: 'The Opulent Place by Pentfield',
    location: 'Wuse District, Abuja',
    status: 'Awaiting approval',
    area: '4,134.11 sqm',
    type: 'Residential',
    title: 'CoO',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800',
    price: '₦250M',
  },
  {
    id: '3',
    name: 'The Petunia by Pentfield',
    location: 'Jabi District, Abuja',
    status: 'Ongoing',
    area: '3,103.20 sqm',
    type: 'Residential',
    title: 'CoO',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800',
    price: '₦150M',
  },
];

export default function VettedProperties() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Properties Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Vetted Projects</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our carefully vetted real estate projects across Nigeria&apos;s prime locations.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Status</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Status</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="awaiting">Awaiting Approval</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed Use</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Location</option>
                <option value="abuja">Abuja</option>
                <option value="lagos">Lagos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Budget Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="">Any Budget</option>
                <option value="low">Below ₦50M</option>
                <option value="medium">₦50M - ₦200M</option>
                <option value="high">Above ₦200M</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold shadow-sm hover:shadow-md">
              Search Properties
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (

            <PropCard key={property.id} image={property.image} name={property.name} title={property.title} description={""} pricerange={property.price} location={property.location} status={property.status} type={property.type} area={property.area}  />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-600 text-white">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
