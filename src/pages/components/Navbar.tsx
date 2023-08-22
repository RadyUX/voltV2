import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b z-0 from-[#0052A6] to-[#0052A6] p-4 shadow-md">
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
          <button className="ml-2 text-white bg-purple-700 p-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Recherche
          </button>
        </div>
      </div>
    </nav>
  );
}
