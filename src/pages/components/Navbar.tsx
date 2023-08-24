import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b z-0 from-[#3a8980] to-[#3a8980] p-4 shadow-md">
    
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            
          </Link>
        </div>
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="p-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="ml-2 text-white bg-gradient-to-b  from-[#275d99] to-[#275d99] p-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Recherche
          </button>
        </div>
      </div>
    </nav>
  );
}
