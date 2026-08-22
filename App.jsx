import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ============ SVG ICONS ============
const DashboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const TasksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
const BonusIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>;
const StreaksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2.05V9h7V2.05A10.957 10.957 0 0012 1c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10h-7V2.05z"/></svg>;
const RewardsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const LeaderboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>;
const WalletIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h9v-8h-9v8zm4-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.8-4.92-2.05l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v6l5.25 3.15.75-1.23-4-2.42z"/></svg>;
const ProfileIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.23-.37-.29-.59-.17l-2.39 1.83c-.52-.4-1.08-.73-1.69-.98l-.38-3.05c-.04-.24-.24-.42-.49-.42h-3.84c-.25 0-.45.18-.49.42l-.38 3.05c-.61.25-1.17.59-1.69.98l-2.39-1.83c-.23-.13-.47-.06-.59.17L2.74 8.87c-.12.23-.07.5.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.23.37.29.59.17l2.39-1.83c.52.4 1.08.73 1.69.98l.38 3.05c.05.24.24.42.49.42h3.84c.25 0 .45-.18.49-.42l.38-3.05c.61-.25 1.17-.59 1.69-.98l2.39 1.83c.23.13.47.06.59-.17l1.92-3.32c.12-.23.07-.5-.12-.64l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const HelpIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
const FireIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.3 4 13c0 4.08 3.32 7.44 7.44 7.44s7.46-3.36 7.46-7.44c0-1.25-.19-2.4-.48-3.41.48.78 1.48 2.21 1.48 2.91 0 2.3-1.15 4.26-2.87 5.03 1.02-1.29 1.62-2.91 1.62-4.66 0-3.59-2.67-6.59-6-6.59s-6 2.91-6 6.59c0 1.66.67 3.15 1.46 4.3-1.65-.67-2.66-2.04-2.66-3.74 0-2.64 2.05-4.79 4.79-4.79 1.76 0 3.27.79 4.25 2.03.40-.75 1.19-1.86 1.19-1.86s-1.55-1.25-1.55-1.25V.67z"/></svg>;
const TrophyIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.59 3 4 6.59 4 11c0 2.64 1.35 4.97 3.36 6.39C7.16 19.29 8.08 20.73 8.08 20.73h7.84s.92-1.44 1.72-3.34C18.65 15.97 20 13.64 20 11c0-4.41-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>;
const StarIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5v5h-2v-5h2zm5 0v5h-2v-5h2zm-10-4v9h-2V8.5h2z"/></svg>;

// ============ DRIFTING DOLLARS ============
const DriftingDollars = () => {
  const dollars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 12 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes drift {
          0% { transform: translateY(-100px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.08; }
          90% { opacity: 0.08; }
          100% { transform: translateY(100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
        .drifting-dollar {
          font-size: 28px;
          position: absolute;
          animation: drift linear infinite;
          font-weight: bold;
        }
      `}</style>
      {dollars.map(d => (
        <div
          key={d.id}
          className="drifting-dollar"
          style={{
            left: `${d.left}%`,
            top: '-50px',
            color: ['#20B2AA', '#82E23E', '#FCD34D', '#A78BFA'][Math.floor(Math.random() * 4)],
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

// ============ ANIMATED RING ============
const AnimatedRing = ({ value, max = 100, color = '#82E23E', size = 120, icon }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="absolute inset-0 transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle cx={size / 2} cy={size / 2} r="45" fill="none" stroke="rgba(130, 226, 62, 0.2)" strokeWidth="6" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-4xl">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white mt-3">{value}</p>
    </div>
  );
};

// ============ GLASSMORPHIC CARD ============
const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-[#0A0B0D] bg-opacity-30 backdrop-blur-2xl border border-[#82E23E] border-opacity-30 rounded-3xl shadow-2xl hover:border-opacity-50 hover:shadow-[0_0_40px_rgba(130,226,62,0.2)] transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// ============ STAT CARD ============
const StatCard = ({ icon: Icon, label, value, color = '#82E23E', subtext = '' }) => (
  <GlassCard className="p-6">
    <div className="flex items-center justify-between mb-3">
      <p className="text-gray-400 text-sm">{label}</p>
      <Icon />
    </div>
    <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
  </GlassCard>
);

// ============ LOGIN PAGE ============
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
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
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#82E23E] rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-[#0A0B0D] font-bold text-lg">W</span>
            </div>
            <span className="text-3xl font-bold">WinBig</span>
          </div>
        </div>

        <div className="mb-12 text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">Do simple tasks.</h1>
          <h2 className="text-5xl font-bold"><span className="text-[#82E23E] animate-pulse">Get paid big.</span></h2>
        </div>

        <div className="w-full max-w-sm">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold mb-6">Get Started</h3>
            {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4 text-red-200 text-sm">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1a1a1d] bg-opacity-60 backdrop-blur-md border border-[#82E23E] border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100 transition-all" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#1a1a1d] bg-opacity-60 backdrop-blur-md border border-[#82E23E] border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100 transition-all" required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-3 rounded-lg hover:opacity-90 transition-all shadow-lg">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// Chart data
const earningsData = [
  { day: 'Mon', earnings: 2.5 },
  { day: 'Tue', earnings: 3.2 },
  { day: 'Wed', earnings: 2.8 },
  { day: 'Thu', earnings: 4.1 },
  { day: 'Fri', earnings: 3.5 },
  { day: 'Sat', earnings: 4.8 },
  { day: 'Sun', earnings: 2.9 },
];

const activityData = [
  { name: 'Earnings', value: 42 },
  { name: 'Withdrawals', value: 28 },
  { name: 'Bonuses', value: 18 },
  { name: 'Referrals', value: 12 },
];

const COLORS = ['#82E23E', '#FCD34D', '#F97316', '#A78BFA'];

// ============ DASHBOARD ============
const Dashboard = ({ user, onLogout, tasks }) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon },
    { id: 'bonus', label: 'Daily Bonus', icon: BonusIcon },
    { id: 'streaks', label: 'Streaks', icon: StreaksIcon },
    { id: 'rewards', label: 'Rewards', icon: RewardsIcon },
    { id: 'leaderboard', label: 'Leaderboard', icon: LeaderboardIcon },
    { id: 'wallet', label: 'Wallet', icon: WalletIcon },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'help', label: 'Help', icon: HelpIcon },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-[#82E23E]">{user.email.split('@')[0]}</span>!</h1>
        <p className="text-gray-400">Complete tasks and earn big rewards</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={StarIcon} label="Total Points" value="1,250" color="#82E23E" subtext="+150 from yesterday" />
        <StatCard icon={TasksIcon} label="Tasks Completed" value="18" color="#FCD34D" subtext="+3 from yesterday" />
        <StatCard icon={StreaksIcon} label="Current Streak" value="7 Days" color="#F97316" subtext="Keep it up!" />
        <StatCard icon={RewardsIcon} label="Total Earned" value="$12.50" color="#A78BFA" subtext="Redeemable balance" />
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Earnings This Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={earningsData}>
            <defs><linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82E23E" stopOpacity={0.3}/><stop offset="95%" stopColor="#82E23E" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(130, 226, 62, 0.2)" />
            <XAxis dataKey="day" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1d', border: '1px solid #82E23E' }} />
            <Area type="monotone" dataKey="earnings" stroke="#82E23E" fillOpacity={1} fill="url(#colorEarnings)" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Tasks</h2>
        <div className="grid grid-cols-4 gap-6">
          {tasks.slice(0, 4).map(task => (
            <GlassCard key={task.id} className="overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              {task.cover_image_url && <div className="w-full h-32 bg-gradient-to-b from-[#82E23E] to-[#0A0B0D]"><img src={task.cover_image_url} alt={task.title} className="w-full h-full object-cover" /></div>}
              <div className="p-4">
                <p className="text-[#82E23E] text-xs font-bold mb-2">EARN {task.base_points || 0} PTS</p>
                <h3 className="font-bold text-white mb-3 line-clamp-2 text-sm">{task.title}</h3>
                <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 transition-all text-sm">Start</button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Available Tasks</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard icon={StarIcon} label="Available" value="24" color="#82E23E" />
        <StatCard icon={TasksIcon} label="Completed Today" value="3" color="#FCD34D" />
        <StatCard icon={ChartIcon} label="Earning Rate" value="$0.25/hr" color="#F97316" />
        <StatCard icon={RewardsIcon} label="Today's Earnings" value="$2.50" color="#A78BFA" />
      </div>

      <GlassCard className="p-6 mb-6">
        <div className="flex gap-3 flex-wrap">
          {['All', 'Survey', 'Game', 'Video', 'Social'].map(tag => (
            <button key={tag} className="px-4 py-2 bg-[#0A0B0D] bg-opacity-60 border border-[#82E23E] border-opacity-30 rounded-lg text-sm hover:border-opacity-100 hover:bg-[#82E23E] hover:bg-opacity-10 transition-all text-white">
              {tag}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-6">
        {tasks.map((task, i) => (
          <GlassCard key={i} className="p-6 hover:scale-105 transition-transform cursor-pointer">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-[#82E23E] bg-opacity-20 text-[#82E23E] rounded-full text-xs font-bold">{task.task_type || 'Task'}</span>
                <span className="text-[#FCD34D] font-bold">{task.base_points} pts</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{task.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{task.description}</p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 transition-all">
              Start Task
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderBonus = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Daily Bonus</h1>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-8">Claim your 7-Day Bonus</h2>
        <div className="grid grid-cols-7 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <div key={day} className={`text-center p-4 rounded-lg border-2 transition-all ${day <= 5 ? 'bg-[#82E23E] bg-opacity-20 border-[#82E23E]' : 'bg-[#0A0B0D] bg-opacity-40 border-[#82E23E] border-opacity-20'}`}>
              <p className="text-xl font-bold text-white mb-2">Day {day}</p>
              <p className="text-[#82E23E] font-bold">{50 * day} pts</p>
            </div>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-3 rounded-lg hover:opacity-90 transition-all text-lg">
          Claim Today (Day 5)
        </button>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Bonus History</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(day => (
            <div key={day} className="flex items-center justify-between p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg border border-[#82E23E] border-opacity-10">
              <div>
                <p className="font-bold text-white">Day {day} Claimed</p>
                <p className="text-gray-400 text-sm">May {18 - day}, 2024</p>
              </div>
              <p className="text-[#82E23E] font-bold text-lg">{50 * day} pts</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderStreaks = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Your Streaks</h1>

      <div className="grid grid-cols-3 gap-6">
        <GlassCard className="p-8">
          <p className="text-gray-400 text-sm mb-4">Current Streak</p>
          <AnimatedRing value={7} max={30} color="#F97316" size={140} icon={<FireIcon />} />
          <p className="text-gray-400 text-xs text-center mt-4">Keep it up!</p>
        </GlassCard>
        <GlassCard className="p-8">
          <p className="text-gray-400 text-sm mb-4">Longest Streak</p>
          <AnimatedRing value={7} max={30} color="#FCD34D" size={140} icon={<TrophyIcon />} />
          <p className="text-gray-400 text-xs text-center mt-4">Your best so far!</p>
        </GlassCard>
        <GlassCard className="p-8">
          <p className="text-gray-400 text-sm mb-4">Tasks This Week</p>
          <AnimatedRing value={100} max={100} color="#82E23E" size={140} icon={<StarIcon />} />
          <p className="text-gray-400 text-xs text-center mt-4">100% complete!</p>
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">This Week's Calendar</h2>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="text-center">
              <div className={`w-full h-20 rounded-lg flex items-center justify-center font-bold mb-2 transform hover:scale-110 transition-transform ${
                i < 7 ? 'bg-gradient-to-br from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] shadow-lg' : 'bg-gray-700 text-gray-400'
              }`}>
                <TasksIcon />
              </div>
              <p className="text-sm text-white font-semibold">{day}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Redeem Rewards</h1>

      <div className="grid grid-cols-2 gap-6">
        {[
          { name: 'Google Play $5', points: '500 Points', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png' },
          { name: 'PayPal Cash $5', points: '500 Points', logo: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg' },
          { name: 'Netflix 1 Month', points: '750 Points', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
          { name: 'Amazon $10', points: '1,000 Points', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
          { name: 'Steam Wallet $10', points: '1,000 Points', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_logo.png' },
          { name: 'Xbox Game Pass', points: '1,200 Points', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Xbox_logo_%282020%29.svg' },
        ].map((reward, i) => (
          <GlassCard key={i} className="p-6 hover:scale-105 transition-transform cursor-pointer">
            <img src={reward.logo} alt={reward.name} className="w-16 h-16 object-contain mb-4 opacity-80" onError={(e) => e.target.style.display='none'} />
            <h3 className="font-bold text-white text-lg mb-2">{reward.name}</h3>
            <p className="text-[#82E23E] font-bold mb-4">{reward.points}</p>
            <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 transition-all text-sm">
              Redeem Now
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Leaderboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[{ rank: 2, name: 'TaskMaster', points: '8,230' }, { rank: 1, name: 'TopWinner', points: '12,450' }, { rank: 3, name: 'EarnQueen', points: '6,780' }].map(u => (
          <GlassCard key={u.rank} className="p-8 text-center transform hover:scale-105 transition-transform">
            <AnimatedRing value={parseInt(u.points.replace(',', ''))} max={15000} color={['#FFD700', '#C0C0C0', '#CD7F32'][u.rank - 1]} size={120} icon={<TrophyIcon />} />
            <p className="font-bold text-white text-lg mt-6">{u.name}</p>
            <p className="text-gray-400 text-xs mt-2">Rank #{u.rank}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Top 10 Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#82E23E] border-opacity-20">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Rank</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">User</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {[{r: 1, n: 'TopWinner', p: '12,450'}, {r: 2, n: 'TaskMaster', p: '8,230'}, {r: 3, n: 'EarnQueen', p: '6,780'}, {r: 4, n: 'GrindPro', p: '5,610'}, {r: 5, n: 'WinKing', p: '4,900'}].map(u => (
                <tr key={u.r} className="border-b border-[#82E23E] border-opacity-10 hover:bg-[#0A0B0D] hover:bg-opacity-40">
                  <td className="py-3 px-4"><div className="w-8 h-8 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold text-sm">{u.r}</div></td>
                  <td className="py-3 px-4 text-white font-semibold">{u.n}</td>
                  <td className="py-3 px-4 text-right text-[#82E23E] font-bold">{u.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Wallet</h1>

      <GlassCard className="p-8">
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">Total Balance</p>
          <p className="text-5xl font-bold text-[#82E23E] mb-4">$12.50</p>
          <p className="text-white text-sm">= 1,250 Points</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(130, 226, 62, 0.2)" />
            <XAxis dataKey="day" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1d', border: '1px solid #82E23E' }} />
            <Line type="monotone" dataKey="earnings" stroke="#82E23E" strokeWidth={2} dot={{ fill: '#82E23E', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#82E23E] border-opacity-20">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Description</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[{type: 'Task', desc: 'Task Completed', amt: '+150 Pts'}, {type: 'Bonus', desc: 'Daily Bonus', amt: '+50 Pts'}, {type: 'Conversion', desc: 'Points Converted', amt: '-500 Pts / +$5'}, {type: 'Withdrawal', desc: 'PayPal Withdrawal', amt: '-$10.00'}].map((tx, i) => (
                <tr key={i} className="border-b border-[#82E23E] border-opacity-10 hover:bg-[#0A0B0D] hover:bg-opacity-40">
                  <td className="py-3 px-4 text-white font-semibold">{tx.type}</td>
                  <td className="py-3 px-4 text-white">{tx.desc}</td>
                  <td className="py-3 px-4 text-right text-[#82E23E] font-bold">{tx.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">History</h1>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Activity Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={activityData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {activityData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1d', border: '1px solid #82E23E' }} />
          </PieChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#82E23E] border-opacity-20">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Activity</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date & Time</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[{act: 'Task Completed', date: 'May 18, 10:30 AM', amt: '+150 Points'}, {act: 'Daily Bonus', date: 'May 18, 08:00 AM', amt: '+50 Points'}, {act: 'Points Converted', date: 'May 17, 06:45 PM', amt: '-500 Pts / +$5'}].map((item, i) => (
                <tr key={i} className="border-b border-[#82E23E] border-opacity-10 hover:bg-[#0A0B0D] hover:bg-opacity-40">
                  <td className="py-3 px-4 text-white font-semibold">{item.act}</td>
                  <td className="py-3 px-4 text-gray-400">{item.date}</td>
                  <td className="py-3 px-4 text-right text-[#82E23E] font-bold">{item.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Profile</h1>

      <GlassCard className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-full flex items-center justify-center text-3xl font-bold text-[#0A0B0D]">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.email.split('@')[0]}</h2>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-[#82E23E] text-sm mt-2">Active Member</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-3xl font-bold text-[#82E23E]">1,250</p>
            <p className="text-gray-400 text-xs mt-2">Points</p>
          </div>
          <div className="text-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-3xl font-bold text-[#FCD34D]">18</p>
            <p className="text-gray-400 text-xs mt-2">Tasks</p>
          </div>
          <div className="text-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-3xl font-bold text-[#F97316]">7</p>
            <p className="text-gray-400 text-xs mt-2">Streak</p>
          </div>
          <div className="text-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-3xl font-bold text-[#A78BFA]">$12.50</p>
            <p className="text-gray-400 text-xs mt-2">Earned</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Settings</h1>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-white font-semibold">Email Notifications</p>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-white font-semibold">Push Notifications</p>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center p-4 bg-[#0A0B0D] bg-opacity-40 rounded-lg">
            <p className="text-white font-semibold">Two-Factor Authentication</p>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-red-400">Danger Zone</h2>
        <button onClick={onLogout} className="w-full bg-red-500 bg-opacity-20 border border-red-500 text-red-400 font-bold py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-30 transition-all">
          Logout
        </button>
      </GlassCard>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Help & Support</h1>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[{q: 'How do I earn points?', a: 'Complete tasks and earn rewards daily.'}, {q: 'How do I withdraw?', a: 'Go to Wallet and click Redeem Rewards.'}, {q: 'What is a streak?', a: 'A streak is consecutive days of completing tasks.'}].map((faq, i) => (
            <GlassCard key={i} className="p-4">
              <p className="text-white font-bold mb-2">{faq.q}</p>
              <p className="text-gray-400 text-sm">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-3 rounded-lg hover:opacity-90 transition-all">
          Email Support
        </button>
      </GlassCard>
    </div>
  );

  const renderContent = () => {
    switch(activeNav) {
      case 'dashboard': return renderDashboard();
      case 'tasks': return renderTasks();
      case 'bonus': return renderBonus();
      case 'streaks': return renderStreaks();
      case 'rewards': return renderRewards();
      case 'leaderboard': return renderLeaderboard();
      case 'wallet': return renderWallet();
      case 'history': return renderHistory();
      case 'profile': return renderProfile();
      case 'settings': return renderSettings();
      case 'help': return renderHelp();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white flex overflow-hidden">
      <DriftingDollars />

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#0A0B0D] bg-opacity-60 backdrop-blur-2xl border-r border-[#82E23E] border-opacity-20 p-6 overflow-y-auto relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-lg flex items-center justify-center animate-pulse">
            <span className="text-[#0A0B0D] font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-lg">WinBig</span>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#0A0B0D] hover:bg-opacity-60'
              }`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>

        <GlassCard className="p-4 mb-6">
          <p className="text-xs font-bold text-[#82E23E] mb-2">Invite & Earn</p>
          <p className="text-xs text-gray-400 mb-4">Get 10% of earnings</p>
          <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 text-xs transition-all transform hover:scale-105">
            Invite Friends
          </button>
        </GlassCard>

        <div className="mt-6 pt-6 border-t border-[#82E23E] border-opacity-20">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <div className="w-10 h-10 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs flex-1">
              <p className="font-bold truncate text-white">{user.email.split('@')[0]}</p>
              <button onClick={onLogout} className="text-[#82E23E] hover:text-[#FCD34D]">Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        {renderContent()}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-80 bg-[#0A0B0D] bg-opacity-60 backdrop-blur-2xl border-l border-[#82E23E] border-opacity-20 p-6 overflow-y-auto relative z-10">
        <GlassCard className="p-6 mb-6">
          <h3 className="text-gray-400 text-sm mb-4">Wallet Balance</h3>
          <div className="flex items-end gap-2 mb-3">
            <p className="text-4xl font-bold text-[#82E23E]">1,250</p>
            <p className="text-gray-400 text-sm mb-1">PTS</p>
          </div>
          <p className="text-gray-400 text-xs mb-4">≈ $12.50 USD</p>
          <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 text-sm transition-all transform hover:scale-105 shadow-lg">
            Redeem
          </button>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-bold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Tasks Today</span><span className="font-bold text-[#82E23E]">3/5</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Daily Bonus</span><span className="font-bold text-[#FCD34D]">+150</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Streak Days</span><span className="font-bold text-[#F97316]">7</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Referrals</span><span className="font-bold text-[#A78BFA]">12</span></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setScreen('dashboard');
        loadTasks();
      }
    });

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
      const { data, error } = await supabase.from('custom_tasks').select('*').eq('active', true).order('created_at', { ascending: false });
      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  if (screen === 'login') {
    return <LoginPage onLogin={(data) => { setUser(data.user); setScreen('dashboard'); loadTasks(); }} />;
  }

  if (user) {
    return <Dashboard user={user} tasks={tasks} onLogout={() => { supabase.auth.signOut(); setUser(null); setScreen('login'); }} />;
  }

  return null;
}
