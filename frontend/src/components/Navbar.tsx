import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-50 p-4 flex gap-4 justify-center">
    <Link to="/upload" className="hover:text-indigo-600 transition">
      Subir Archivos
    </Link>
    <Link to="/search" className="hover:text-indigo-600 transition">
      Buscar
    </Link>
    <Link to="/qa" className="hhover:text-indigo-600 transition">
      Q&A
    </Link>
  </nav>
);
export default Navbar;
