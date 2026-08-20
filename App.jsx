import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ========== DRIFTING DOLLARS COMPONENT ==========
const DriftingDollars = () => {
  const dollars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes drift {
          0% { 
            transform: translateY(-100px) translateX(0); 
            opacity: 0;
          }
          10% { 
            opacity: 0.15;
          }
          90% { 
            opacity: 0.15;
          }
          100% { 
            transform: translateY(100vh) translateX(30px); 
            opacity: 0;
          }
        }
        .drifting-dollar {
          font-size: 24px;
          color: #20B2AA;
          font-weight: bold;
          position: absolute;
          animation: drift linear infinite;
        }
      `}</style>
      {dollars.map(d => (
        <div
          key={d.id}
          className="drifting-dollar"
          style={{
            left: `${d.left}%`,
            top: '-50px',
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        >
          $
        </div>
      ))}
    </div>
  );
};

// ========== LOGIN PAGE ==========
const LoginPage = ({ onSignUp, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white overflow-hidden relative">
      <DriftingDollars />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#82E23E] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0B0D] font-bold">W</span>
            </div>
            <span className="text-2xl font-bold">WinBig</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-12 text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Do simple<br />tasks.
          </h1>
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-[#82E23E]">Get paid big.</span>
          </h2>
          <div className="h-1 w-32 bg-[#82E23E] mx-auto mb-8"></div>
          
          <p className="text-gray-400 text-lg mb-8">
            Complete easy tasks, earn real rewards,<br />
            and grow with WinBig.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mb-12 space-y-4 max-w-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#82E23E] bg-opacity-20 border border-[#82E23E] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#82E23E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white">Simple Tasks</p>
              <p className="text-gray-400 text-sm">Quick & easy tasks anyone can do.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#82E23E] bg-opacity-20 border border-[#82E23E] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#82E23E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white">Real Rewards</p>
              <p className="text-gray-400 text-sm">Get paid to your preferred wallet.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#82E23E] bg-opacity-20 border border-[#82E23E] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#82E23E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white">Safe & Trusted</p>
              <p className="text-gray-400 text-sm">Secure platform. Real people. Real pay.</p>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="w-full max-w-sm mt-12">
          <div className="bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border border-[#82E23E] border-opacity-30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6">Get Started</h3>
            
            {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4 text-red-200 text-sm">{error}</div>}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center text-gray-400 text-sm">
                New here? <button 
                  type="button"
                  onClick={onSignUp}
                  className="text-[#82E23E] hover:underline"
                >
                  Create account
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== SIGNUP PAGE ==========
const SignupPage = ({ onBack, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) throw signUpError;
      onSignup(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white overflow-hidden relative">
      <DriftingDollars />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#82E23E] rounded-lg flex items-center justify-center">
            <span className="text-[#0A0B0D] font-bold text-sm">W</span>
          </div>
          <span className="text-2xl font-bold">WinBig</span>
        </div>

        {/* Headline */}
        <div className="mb-10 text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            Join thousands<br />
            <span className="text-[#82E23E]">earning rewards</span>
          </h1>
          <p className="text-gray-400">Get ₦500 bonus when you sign up</p>
        </div>

        {/* Signup form */}
        <div className="w-full max-w-sm">
          <div className="bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border border-[#82E23E] border-opacity-30 rounded-2xl p-8">
            {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4 text-red-200 text-sm">{error}</div>}
            
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E]"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E]"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-colors mt-6 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <button 
              onClick={onBack}
              className="w-full text-gray-400 hover:text-gray-300 text-sm mt-4"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== POSTER TASK CARD ==========
const PosterTaskCard = ({ task, onClaim }) => {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    setClaimed(true);
    if (onClaim) onClaim(task.id);
  };

  return (
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl overflow-hidden hover:border-opacity-40 hover:bg-opacity-60 transition-all cursor-pointer group">
      {/* Cover image */}
      {task.cover_image_url && (
        <div className="w-full h-48 overflow-hidden bg-gradient-to-b from-[#82E23E] to-[#0A0B0D]">
          <img 
            src={task.cover_image_url} 
            alt={task.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Points display */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">EARN</p>
          <p className="text-3xl font-bold text-[#82E23E]">
            {task.points.toLocaleString()} POINTS
          </p>
        </div>

        {/* Title & description */}
        <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{task.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {task.days_left && (
            <span className="text-xs bg-[#82E23E] bg-opacity-20 text-[#82E23E] px-3 py-1 rounded-full">
              {task.days_left} days left
            </span>
          )}
          <button 
            onClick={handleClaim}
            disabled={claimed}
            className="text-[#82E23E] hover:text-[#9AE744] font-semibold text-sm disabled:opacity-50"
          >
            {claimed ? '✓ Claimed' : 'Claim →'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APP ==========
export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setScreen('dashboard');
        loadTasks();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setScreen('dashboard');
        loadTasks();
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  if (screen === 'login') {
    return (
      <LoginPage 
        onSignUp={() => setScreen('signup')}
        onLogin={(data) => {
          setUser(data.user);
          setScreen('dashboard');
          loadTasks();
        }}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignupPage 
        onBack={() => setScreen('login')}
        onSignup={(data) => {
          setUser(data.user);
          setScreen('dashboard');
          loadTasks();
        }}
      />
    );
  }

  // Dashboard screen
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white">
      {/* Header */}
      <div className="bg-[#0A0B0D] bg-opacity-80 backdrop-blur-md border-b border-[#82E23E] border-opacity-20 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#82E23E] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0B0D] font-bold text-sm">W</span>
            </div>
            <span className="font-bold">WinBig</span>
          </div>
          <button
            onClick={() => {
              supabase.auth.signOut();
              setUser(null);
              setScreen('login');
            }}
            className="text-[#82E23E] hover:text-[#9AE744]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}!</h1>
          <p className="text-gray-400">Complete tasks and earn rewards</p>
        </div>

        {/* Featured Tasks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.slice(0, 3).map(task => (
              <PosterTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* All Tasks */}
        {tasks.length > 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.slice(3).map(task => (
                <PosterTaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tasks available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
