import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// SVG Icons
const DashboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const TasksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
const BonusIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const StreaksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const RewardsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ReferralsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.74 1.97 2.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const LeaderboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>;
const WalletIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h9v-8h-9v8zm4-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.8-4.92-2.05l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v6l5.25 3.15.75-1.23-4-2.42z"/></svg>;
const ProfileIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.23-.37-.29-.59-.17l-2.39 1.83c-.52-.4-1.08-.73-1.69-.98l-.38-3.05c-.04-.24-.24-.42-.49-.42h-3.84c-.25 0-.45.18-.49.42l-.38 3.05c-.61.25-1.17.59-1.69.98l-2.39-1.83c-.23-.13-.47-.06-.59.17L2.74 8.87c-.12.23-.07.5.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.23.37.29.59.17l2.39-1.83c.52.4 1.08.73 1.69.98l.38 3.05c.05.24.24.42.49.42h3.84c.25 0 .45-.18.49-.42l.38-3.05c.61-.25 1.17-.59 1.69-.98l2.39 1.83c.23.13.47.06.59-.17l1.92-3.32c.12-.23.07-.5-.12-.64l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const HelpIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
const StarIcon = () => <svg className="w-6 h-6" fill="#82E23E" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const FireIcon = () => <svg className="w-6 h-6" fill="#F59E0B" viewBox="0 0 24 24"><path d="M11.76 6.84l1.24-2.75c.02-.05.04-.1.04-.15 0-.18-.15-.33-.33-.33-.18 0-.33.15-.33.33 0 .05.02.1.04.15l1.24 2.75c.36-.89.65-1.75.92-2.67.02-.08.04-.16.04-.24 0-.18-.15-.33-.33-.33-.18 0-.33.15-.33.33 0 .08.02.16.04.24-.27.92-.56 1.78-.92 2.67zm10.58-5.64c-.16-.1-.36-.06-.47.1l-1.08 1.77c-.2.32-.16.73.09 1.01.26.29.66.35 1 .15.34-.2.53-.6.47-1v-.02l-.01-.01zm-20 0c.1-.16.06-.36-.1-.47-.16-.1-.36-.06-.47.1L.13 2.24c-.2.32-.16.73.09 1.01.26.29.66.35 1 .15.34-.2.53-.6.47-1l-.01-.02zm9.21 4.2c-.92 0-1.67.75-1.67 1.67S9.63 9.34 10.55 9.34s1.67-.75 1.67-1.67-.75-1.67-1.67-1.67zm0 2.67c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>;
const TrophyIcon = () => <svg className="w-6 h-6" fill="#FCD34D" viewBox="0 0 24 24"><path d="M12 3C7.59 3 4 6.59 4 11c0 2.64 1.35 4.97 3.36 6.39C7.16 19.29 8.08 20.73 8.08 20.73h7.84s.92-1.44 1.72-3.34C18.65 15.97 20 13.64 20 11c0-4.41-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>;
const GiftIcon = () => <svg className="w-6 h-6" fill="#A78BFA" viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 .9-2 2h-1V2h-2v2H6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v10c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V10h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1V2h-2v2h-1c0-1.1-.9-2-2-2zm0 2h4v2h-4V4zm0 4h4v8h-4V8z"/></svg>;
const PlayIcon = () => <svg className="w-6 h-6" fill="#9333EA" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;

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
    <div className="min-h-screen bg-[#0A0B0D] text-white overflow-hidden relative flex flex-col items-center justify-center px-4">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#82E23E] rounded-lg flex items-center justify-center">
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
          <span className="text-[#82E23E]">Get paid big.</span>
        </h2>
      </div>

      <div className="w-full max-w-sm">
        <div className="bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border border-[#82E23E] border-opacity-30 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Get Started</h3>
          
          {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4 text-red-200 text-sm">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#82E23E] focus:border-opacity-100"
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// TaskCard Component
const TaskCard = ({ task }) => {
  return (
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl overflow-hidden hover:border-opacity-40 transition-all">
      {task.cover_image_url && (
        <div className="w-full h-40 overflow-hidden bg-gradient-to-b from-[#82E23E] to-[#0A0B0D]">
          <img 
            src={task.cover_image_url} 
            alt={task.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}

      <div className="p-4">
        <p className="text-gray-400 text-xs mb-1 uppercase">EARN</p>
        <p className="text-2xl font-bold text-[#82E23E] mb-3">{task.base_points || 0} POINTS</p>

        <h3 className="text-sm font-bold text-white mb-1">{task.title}</h3>
        <p className="text-gray-400 text-xs mb-4 line-clamp-2">{task.description}</p>

        <button className="w-full bg-[#82E23E] bg-opacity-20 border border-[#82E23E] text-[#82E23E] font-semibold py-2 rounded-lg hover:bg-opacity-30 transition-colors text-sm">
          Start Task
        </button>
      </div>
    </div>
  );
};

// Main Dashboard
const Dashboard = ({ user, onLogout, tasks, profile }) => {
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
    { id: 'help', label: 'Help & Support', icon: HelpIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white flex">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border-r border-[#82E23E] border-opacity-10 p-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#82E23E] rounded-lg flex items-center justify-center">
            <span className="text-[#0A0B0D] font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-lg">WinBig</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                activeNav === item.id
                  ? 'bg-[#82E23E] bg-opacity-20 text-[#82E23E] border-l-2 border-[#82E23E]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Invite Card */}
        <div className="bg-[#82E23E] bg-opacity-10 border border-[#82E23E] border-opacity-30 rounded-2xl p-4">
          <p className="text-xs font-bold text-[#82E23E] mb-2">Invite & Earn</p>
          <p className="text-xs text-gray-400 mb-4">Get 10% of your friends' earnings.</p>
          <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-2 rounded-lg text-xs hover:bg-[#9AE744] transition-colors">
            Invite Friends
          </button>
        </div>

        {/* Profile Section */}
        <div className="mt-6 pt-6 border-t border-[#82E23E] border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#82E23E] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs">
              <p className="font-bold truncate">{user.email.split('@')[0]}</p>
              <button className="text-[#82E23E] hover:underline">View Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex">
        <div className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-[#82E23E]">{user.email.split('@')[0]}</span>! 👋</h1>
              <p className="text-gray-400">Complete tasks and earn rewards</p>
            </div>
            <button
              onClick={onLogout}
              className="text-[#82E23E] hover:text-[#9AE744] font-semibold text-sm"
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Total Points</p>
                <StarIcon />
              </div>
              <p className="text-3xl font-bold text-white">1,250</p>
              <p className="text-xs text-[#82E23E] mt-2">+150 from yesterday</p>
            </div>

            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Tasks Completed</p>
                <GiftIcon />
              </div>
              <p className="text-3xl font-bold text-white">18</p>
              <p className="text-xs text-[#82E23E] mt-2">+3 from yesterday</p>
            </div>

            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Current Streak</p>
                <FireIcon />
              </div>
              <p className="text-3xl font-bold text-white">7 Days</p>
              <p className="text-xs text-[#82E23E] mt-2">Keep it up!</p>
            </div>

            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Total Earned</p>
                <TrophyIcon />
              </div>
              <p className="text-3xl font-bold text-white">$12.50</p>
              <p className="text-xs text-[#82E23E] mt-2">Redeemable balance</p>
            </div>
          </div>

          {/* Featured Tasks */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Tasks</h2>
              <a href="#" className="text-[#82E23E] hover:text-[#9AE744] text-sm font-semibold">View All Tasks →</a>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {tasks.slice(0, 4).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasks.length === 0 && (
                <div className="col-span-4 text-center py-12 text-gray-400">
                  No tasks available yet
                </div>
              )}
            </div>
          </div>

          {/* Daily Streak & Bonus */}
          <div className="grid grid-cols-2 gap-6">
            {/* Daily Streak */}
            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Daily Streak</h3>
              <p className="text-gray-400 text-sm mb-4">Complete tasks every day to build your streak and earn bigger bonuses!</p>
              
              <div className="flex gap-2 justify-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold mb-1 ${
                      i < 7 ? 'bg-[#82E23E] bg-opacity-20 border border-[#82E23E] text-[#82E23E]' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {i < 7 ? '✓' : '○'}
                    </div>
                    <p className="text-xs text-gray-400">{day}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Bonus */}
            <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Daily Bonus</h3>
                <p className="text-xs text-gray-400">How it works?</p>
              </div>
              <p className="text-gray-400 text-sm mb-4">You're on a 7-day streak! Claim your bonus.</p>
              
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {[
                  { days: '3 Days', points: '+25' },
                  { days: '5 Days', points: '+50' },
                  { days: '7 Days', points: '+100', active: true },
                  { days: '14 Days', points: '+250' },
                  { days: '30 Days', points: '+500' },
                ].map((bonus, i) => (
                  <div key={i} className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
                    bonus.active 
                      ? 'bg-[#82E23E] bg-opacity-30 border border-[#82E23E] text-[#82E23E]'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {bonus.days} <br/> {bonus.points}
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-2 rounded-lg hover:bg-[#9AE744] transition-colors text-sm">
                Claim Bonus
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-80 bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border-l border-[#82E23E] border-opacity-10 p-6 overflow-y-auto">
          {/* Wallet Balance */}
          <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6 mb-6">
            <h3 className="text-gray-400 text-sm mb-4">Wallet Balance</h3>
            <div className="flex items-end gap-2 mb-2">
              <svg className="w-6 h-6 text-[#82E23E]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <p className="text-3xl font-bold text-white">1,250</p>
              <p className="text-sm text-gray-400">POINTS</p>
            </div>
            <p className="text-xs text-gray-400 mb-6">≈ $12.50 USD</p>
            
            <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-colors text-sm mb-2">
              Redeem Rewards
            </button>
            <a href="#" className="text-center block text-[#82E23E] hover:underline text-xs">View Rewards →</a>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <a href="#" className="text-[#82E23E] text-xs hover:underline">View All →</a>
            </div>

            <div className="space-y-3">
              {[
                { activity: 'Download the App', date: 'May 16, 2024 - 10:30 AM', points: '+30', icon: PlayIcon },
                { activity: 'Reach Level 5', date: 'May 16, 2024 - 09:45 AM', points: '+60', icon: TrophyIcon },
                { activity: 'Daily Bonus Claimed', date: 'May 15, 2024 - 08:15 PM', points: '+50', icon: GiftIcon },
                { activity: 'Watch Video', date: 'May 15, 2024 - 06:30 PM', points: '+15', icon: PlayIcon },
                { activity: 'Survey Completed', date: 'May 15, 2024 - 05:20 PM', points: '+25', icon: TasksIcon },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#82E23E] border-opacity-10">
                  <div className="w-10 h-10 rounded-lg bg-[#82E23E] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <item.icon />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="text-white font-semibold">{item.activity}</p>
                    <p className="text-gray-400">{item.date}</p>
                  </div>
                  <p className="text-[#82E23E] font-bold text-sm">{item.points}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Leaderboard</h3>
              <a href="#" className="text-[#82E23E] text-xs hover:underline">View All →</a>
            </div>

            <div className="space-y-2">
              {[
                { rank: '1', name: 'krypto_ninja', points: '2,450' },
                { rank: '2', name: 'satoshi_wins', points: '1,980' },
                { rank: '3', name: 'queen_winner', points: '1,760' },
                { rank: '4', name: 'blapityblabloop', points: '1,250', highlight: true },
                { rank: '5', name: 'earn_master', points: '980' },
              ].map((user, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                  user.highlight ? 'bg-[#82E23E] bg-opacity-20 border border-[#82E23E]' : 'bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20'
                }`}>
                  <p className={`font-bold w-6 text-center ${user.highlight ? 'text-[#82E23E]' : 'text-gray-400'}`}>
                    {user.rank}
                  </p>
                  <div className="w-8 h-8 bg-[#82E23E] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold text-xs flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className={user.highlight ? 'text-white font-semibold' : 'text-gray-400'}>{user.name}</p>
                  </div>
                  <p className={`font-bold ${user.highlight ? 'text-[#82E23E]' : 'text-white'}`}>{user.points}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setScreen('dashboard');
        loadTasks();
        loadProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setScreen('dashboard');
        loadTasks();
        loadProfile(session.user.id);
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

  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  if (screen === 'login') {
    return (
      <LoginPage 
        onLogin={(data) => {
          setUser(data.user);
          setScreen('dashboard');
          loadTasks();
          loadProfile(data.user.id);
        }}
      />
    );
  }

  if (user) {
    return (
      <Dashboard 
        user={user}
        tasks={tasks}
        profile={profile}
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
