import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#001711]/80 backdrop-blur-md border-b border-brand-emerald/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-[#c2ebdc] flex items-center gap-2">
            <span className="text-brand-emerald">◆</span> TaskFlow
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-[#86948a] hover:text-[#c2ebdc] transition-colors">Dashboard</Link>
            <Link to="/projects" className="text-[#86948a] hover:text-[#c2ebdc] transition-colors">Projects</Link>
            <Link to="/tasks" className="text-[#86948a] hover:text-[#c2ebdc] transition-colors">Tasks</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#86948a] text-sm hidden sm:block">Hi, {user?.username}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-brand-forest/20 hover:bg-brand-forest/40 border border-brand-emerald/20 text-[#c2ebdc] text-sm font-medium transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
