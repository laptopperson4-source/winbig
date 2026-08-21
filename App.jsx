import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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
const ReferralsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.74 1.97 2.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const LeaderboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>;
const WalletIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h9v-8h-9v8zm4-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.8-4.92-2.05l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v6l5.25 3.15.75-1.23-4-2.42z"/></svg>;
const ProfileIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.23-.37-.29-.59-.17l-2.39 1.83c-.52-.4-1.08-.73-1.69-.98l-.38-3.05c-.04-.24-.24-.42-.49-.42h-3.84c-.25 0-.45.18-.49.42l-.38 3.05c-.61.25-1.17.59-1.69.98l-2.39-1.83c-.23-.13-.47-.06-.59.17L2.74 8.87c-.12.23-.07.5.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.23.37.29.59.17l2.39-1.83c.52.4 1.08.73 1.69.98l.38 3.05c.05.24.24.42.49.42h3.84c.25 0 .45-.18.49-.42l.38-3.05c.61-.25 1.17-.59 1.69-.98l2.39 1.83c.23.13.47.06.59-.17l1.92-3.32c.12-.23.07-.5-.12-.64l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const HelpIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
const FireIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.3 4 13c0 4.08 3.32 7.44 7.44 7.44s7.46-3.36 7.46-7.44c0-1.25-.19-2.40-.48-3.41.48.78 1.48 2.21 1.48 2.91 0 2.3-1.15 4.26-2.87 5.03 1.02-1.29 1.62-2.91 1.62-4.66 0-3.59-2.67-6.59-6-6.59s-6 2.91-6 6.59c0 1.66.67 3.15 1.46 4.3-1.65-.67-2.66-2.04-2.66-3.74 0-2.64 2.05-4.79 4.79-4.79 1.76 0 3.27.79 4.25 2.03.40-.75 1.19-1.86 1.19-1.86s-1.55-1.25-1.55-1.25V.67z"/></svg>;
const TrophyIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.59 3 4 6.59 4 11c0 2.64 1.35 4.97 3.36 6.39C7.16 19.29 8.08 20.73 8.08 20.73h7.84s.92-1.44 1.72-3.34C18.65 15.97 20 13.64 20 11c0-4.41-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>;
const StarIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

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
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            fill="none"
            stroke="rgba(130, 226, 62, 0.2)"
            strokeWidth="6"
          />
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
      <p className="text-2xl font-bold text-white mt-3">{value}</p>
    </div>
  );
};

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
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#82E23E] rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-[#0A0B0D] font-bold text-lg">W</span>
            </div>
            <span className="text-3xl font-bold">WinBig</span>
          </div>
        </div>

        <div className="mb-12 text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Do simple<br />tasks.
          </h1>
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-[#82E23E] animate-pulse">Get paid big.</span>
          </h2>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-[#0A0B0D] bg-opacity-50 backdrop-blur-xl border border-[#82E23E] border-opacity-40 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Get Started</h3>
            
            {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4 text-red-200 text-sm">{error}</div>}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1d] bg-opacity-60 backdrop-blur-md border border-[#82E23E] border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100 transition-all"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1d] bg-opacity-60 backdrop-blur-md border border-[#82E23E] border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100 transition-all"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
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

// ============ DASHBOARD ============
const Dashboard = ({ user, onLogout, tasks }) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon },
    { id: 'bonus', label: 'Daily Bonus', icon: BonusIcon },
    { id: 'streaks', label: 'Streaks', icon: StreaksIcon },
    { id: 'rewards', label: 'Rewards', icon: RewardsIcon },
    { id: 'referrals', label: 'Referrals', icon: ReferralsIcon },
    { id: 'leaderboard', label: 'Leaderboard', icon: LeaderboardIcon },
    { id: 'wallet', label: 'Wallet', icon: WalletIcon },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'help', label: 'Help', icon: HelpIcon },
  ];

  // ============ DASHBOARD TAB ============
  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-[#82E23E]">{user.email.split('@')[0]}</span>! 👋</h1>
        <p className="text-gray-400">Complete tasks and earn big rewards</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={StarIcon} label="Total Points" value="1,250" color="#82E23E" subtext="+150 from yesterday" />
        <StatCard icon={TasksIcon} label="Tasks Completed" value="18" color="#FCD34D" subtext="+3 from yesterday" />
        <StatCard icon={StreaksIcon} label="Current Streak" value="7 Days" color="#F97316" subtext="Keep it up!" />
        <StatCard icon={RewardsIcon} label="Total Earned" value="$12.50" color="#A78BFA" subtext="Redeemable balance" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Tasks</h2>
        <div className="grid grid-cols-4 gap-6">
          {tasks.slice(0, 4).map(task => (
            <GlassCard key={task.id} className="overflow-hidden hover:scale-105 transition-transform">
              {task.cover_image_url && (
                <div className="w-full h-32 overflow-hidden bg-gradient-to-b from-[#82E23E] to-[#0A0B0D]">
                  <img src={task.cover_image_url} alt={task.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <p className="text-[#82E23E] text-xs font-bold mb-2">EARN {task.base_points || 0} PTS</p>
                <h3 className="font-bold text-white mb-1 line-clamp-2">{task.title}</h3>
                <button className="w-full mt-3 bg-[#82E23E] text-[#0A0B0D] font-bold py-2 rounded-lg hover:bg-[#9AE744] transition-all">
                  Start Task
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ STREAKS TAB ============
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
          <AnimatedRing value={100} max={100} color="#82E23E" size={140} icon={<TasksIcon />} />
          <p className="text-gray-400 text-xs text-center mt-4">100% complete!</p>
        </GlassCard>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Streak Calendar</h2>
        <GlassCard className="p-6">
          <div className="flex gap-2 justify-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold mb-2 transform hover:scale-110 transition-transform ${
                  i < 7 ? 'bg-gradient-to-br from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] shadow-lg' : 'bg-gray-700 text-gray-400'
                }`}>
                  {i < 7 ? <TasksIcon /> : '○'}
                </div>
                <p className="text-xs text-gray-400">{day}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // ============ REWARDS TAB ============
  const renderRewards = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Redeem Rewards</h1>

      <div className="grid grid-cols-2 gap-6">
        {[
          { name: 'Google Play $5', points: '500 Points', color: '#4F46E5' },
          { name: 'PayPal Cash $5', points: '500 Points', color: '#00A3E0' },
          { name: 'Netflix 1 Month', points: '750 Points', color: '#E50914' },
          { name: 'Amazon Gift Card $10', points: '1,000 Points', color: '#FF9900' },
        ].map((reward, i) => (
          <GlassCard key={i} className="p-6 hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-white text-lg">{reward.name}</h3>
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: reward.color, opacity: 0.2 }}></div>
            </div>
            <p className="text-[#82E23E] font-bold mb-4">{reward.points}</p>
            <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 transition-opacity">
              Redeem Now
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  // ============ LEADERBOARD TAB ============
  const renderLeaderboard = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Leaderboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { rank: 2, name: 'TaskMaster', points: '8,230', color: '#C0C0C0', icon: <div>🥈</div> },
          { rank: 1, name: 'TopWinner', points: '12,450', color: '#FFD700', icon: <TrophyIcon /> },
          { rank: 3, name: 'EarnQueen', points: '6,780', color: '#CD7F32', icon: <div>🥉</div> },
        ].map(user => (
          <GlassCard key={user.rank} className="p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">{user.icon}</div>
            <p className="font-bold text-white text-lg">{user.name}</p>
            <p className="text-2xl font-bold mt-2" style={{ color: user.color }}>{user.points}</p>
            <p className="text-gray-400 text-xs mt-2">Rank #{user.rank}</p>
          </GlassCard>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Top 10</h2>
        <GlassCard className="p-6">
          <div className="space-y-3">
            {[
              { rank: 1, name: 'TopWinner', points: '12,450' },
              { rank: 2, name: 'TaskMaster', points: '8,230' },
              { rank: 3, name: 'EarnQueen', points: '6,780' },
              { rank: 4, name: 'GrindPro', points: '5,610' },
              { rank: 5, name: 'WinKing', points: '4,900' },
            ].map(user => (
              <div key={user.rank} className="flex items-center justify-between p-3 bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold text-sm">
                    {user.rank}
                  </div>
                  <p className="font-bold text-white">{user.name}</p>
                </div>
                <p className="text-[#82E23E] font-bold">{user.points}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // ============ PROFILE TAB ============
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
          <div className="text-center">
            <p className="text-3xl font-bold text-[#82E23E]">1,250</p>
            <p className="text-gray-400 text-xs mt-1">Points</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FCD34D]">18</p>
            <p className="text-gray-400 text-xs mt-1">Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#F97316]">7</p>
            <p className="text-gray-400 text-xs mt-1">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#A78BFA]">$12.50</p>
            <p className="text-gray-400 text-xs mt-1">Earned</p>
          </div>
        </div>
      </GlassCard>

      <div>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <GlassCard className="p-6">
          <div className="grid grid-cols-5 gap-4">
            {[
              { icon: <TasksIcon />, label: 'First Steps' },
              { icon: <StreaksIcon />, label: 'Week Warrior' },
              { icon: <FireIcon />, label: 'Streak Master' },
              { icon: <TrophyIcon />, label: 'Task Master' },
              { icon: <StarIcon />, label: 'High Earner' },
            ].map((achievement, i) => (
              <div key={i} className="text-center p-3 bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40 transition-all transform hover:scale-110">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs text-gray-400">{achievement.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeNav) {
      case 'dashboard': return renderDashboard();
      case 'streaks': return renderStreaks();
      case 'rewards': return renderRewards();
      case 'leaderboard': return renderLeaderboard();
      case 'profile': return renderProfile();
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
          <p className="text-xs text-gray-400 mb-4">Get 10% of your friends' earnings.</p>
          <button className="w-full bg-gradient-to-r from-[#82E23E] to-[#FCD34D] text-[#0A0B0D] font-bold py-2 rounded-lg hover:opacity-90 text-xs transition-all transform hover:scale-105">
            Invite Friends
          </button>
        </GlassCard>

        <div className="mt-6 pt-6 border-t border-[#82E23E] border-opacity-20">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-[#82E23E] to-[#FCD34D] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs flex-1">
              <p className="font-bold truncate text-white">{user.email.split('@')[0]}</p>
              <button onClick={onLogout} className="text-[#82E23E] hover:text-[#FCD34D] transition-colors">Logout</button>
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
            Redeem Rewards
          </button>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-bold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-2"><TasksIcon /> Tasks Today</span>
              <span className="font-bold text-[#82E23E]">3 / 5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-2"><RewardsIcon /> Daily Bonus</span>
              <span className="font-bold text-[#FCD34D]">+150</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-2"><StreaksIcon /> Streak Days</span>
              <span className="font-bold text-[#F97316]">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 flex items-center gap-2"><ReferralsIcon /> Referrals</span>
              <span className="font-bold text-[#A78BFA]">12</span>
            </div>
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
      const { data, error } = await supabase
        .from('custom_tasks')
        .select('*')
        .eq('active', true)
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
        onLogin={(data) => {
          setUser(data.user);
          setScreen('dashboard');
          loadTasks();
        }}
      />
    );
  }

  if (user) {
    return (
      <Dashboard 
        user={user}
        tasks={tasks}
        onLogout={() => {
          supabase.auth.signOut();
          setUser(null);
          setScreen('login');
        }}
      />
    );
  }

  return null;
}
