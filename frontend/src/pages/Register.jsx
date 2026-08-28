import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001711] px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-seafoam/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-brand-forest/30 rounded-full blur-[100px] animate-float-delayed"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="bg-[#002018]/80 backdrop-blur-xl border border-brand-emerald/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-forest/40 to-brand-dark/60 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 border border-brand-emerald/30 rounded-full animate-rotate-slow"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border border-brand-seafoam/20 rounded-full animate-rotate-slow" style={{animationDirection: 'reverse'}}></div>
              </div>
              
              <div className="relative z-10">
                <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-[#c2ebdc]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-emerald to-brand-seafoam flex items-center justify-center">
                    <span className="text-[#001711] font-bold text-xl">◆</span>
                  </div>
                  TaskFlow
                </Link>
              </div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl font-bold text-[#c2ebdc] leading-tight">
                  Start organizing<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-seafoam">your best work.</span>
                </h2>
                <p className="text-[#86948a] text-lg leading-relaxed">
                  Join thousands of professionals who have transformed their workflow with TaskFlow's intelligent task management.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-brand-forest/20 rounded-xl p-4 border border-brand-emerald/10">
                    <div className="text-2xl font-bold text-brand-emerald mb-1">10k+</div>
                    <div className="text-sm text-[#86948a]">Active Users</div>
                  </div>
                  <div className="bg-brand-forest/20 rounded-xl p-4 border border-brand-emerald/10">
                    <div className="text-2xl font-bold text-brand-seafoam mb-1">50k+</div>
                    <div className="text-sm text-[#86948a]">Tasks Completed</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-6 text-sm text-[#86948a]">
                <span>© 2026 TaskFlow</span>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-[#c2ebdc] transition-colors">Privacy</a>
                  <a href="#" className="hover:text-[#c2ebdc] transition-colors">Terms</a>
                </div>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="lg:hidden text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[#c2ebdc]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-emerald to-brand-seafoam flex items-center justify-center">
                    <span className="text-[#001711] font-bold">◆</span>
                  </div>
                  TaskFlow
                </Link>
              </div>

              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#c2ebdc] mb-2">Create account</h1>
                <p className="text-[#86948a]">Start your productivity journey today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#86948a]">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#86948a]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#001711] border border-brand-emerald/20 rounded-xl pl-12 pr-4 py-3.5 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all placeholder-[#3c4a42]"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#86948a]">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#86948a]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#001711] border border-brand-emerald/20 rounded-xl pl-12 pr-4 py-3.5 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all placeholder-[#3c4a42]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#86948a]">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#86948a]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#001711] border border-brand-emerald/20 rounded-xl pl-12 pr-4 py-3.5 text-[#c2ebdc] focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-all placeholder-[#3c4a42]"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  <p className="text-xs text-[#86948a] mt-1">Must be at least 8 characters</p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-seafoam text-[#001711] font-semibold hover:shadow-lg hover:shadow-brand-emerald/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-[#86948a] text-sm pt-2">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-emerald hover:text-brand-seafoam font-medium transition-colors">
                    Sign in instead
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
