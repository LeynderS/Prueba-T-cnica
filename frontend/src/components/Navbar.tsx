import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-100 p-4 flex gap-4 justify-center">
    <Link to="/upload" className="hover:text-blue-600">
      Subir Archivos
    </Link>
    <Link to="/search" className="hover:text-blue-600">
      Buscar
    </Link>
    <Link to="/qa" className="hover:text-blue-600">
      Q&A
    </Link>
  </nav>
);
export default Navbar;
