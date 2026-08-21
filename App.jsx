import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ============ SVG ICONS ============
const DashboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const TasksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
const BonusIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const StreaksIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const RewardsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ReferralsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.74 1.97 2.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const LeaderboardIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>;
const WalletIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h9v-8h-9v8zm4-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>;
const HistoryIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.8-4.92-2.05l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v6l5.25 3.15.75-1.23-4-2.42z"/></svg>;
const ProfileIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.23-.37-.29-.59-.17l-2.39 1.83c-.52-.4-1.08-.73-1.69-.98l-.38-3.05c-.04-.24-.24-.42-.49-.42h-3.84c-.25 0-.45.18-.49.42l-.38 3.05c-.61.25-1.17.59-1.69.98l-2.39-1.83c-.23-.13-.47-.06-.59.17L2.74 8.87c-.12.23-.07.5.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.23.37.29.59.17l2.39-1.83c.52.4 1.08.73 1.69.98l.38 3.05c.05.24.24.42.49.42h3.84c.25 0 .45-.18.49-.42l.38-3.05c.61-.25 1.17-.59 1.69-.98l2.39 1.83c.23.13.47.06.59-.17l1.92-3.32c.12-.23.07-.5-.12-.64l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const HelpIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;

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
    <div className="min-h-screen bg-[#0A0B0D] text-white overflow-hidden flex flex-col items-center justify-center px-4">
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

// ============ TAB CONTENT RENDERERS ============
const TasksTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Tasks Completed</p>
        <p className="text-3xl font-bold text-white">18</p>
        <p className="text-xs text-[#82E23E] mt-1">↑ 3 from yesterday</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Available Points</p>
        <p className="text-3xl font-bold text-white">250</p>
        <p className="text-xs text-gray-400 mt-1">Earn by completing tasks</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">In Progress</p>
        <p className="text-3xl font-bold text-white">2</p>
        <p className="text-xs text-gray-400 mt-1">Keep it up!</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Bonus Tasks</p>
        <p className="text-3xl font-bold text-white">12</p>
        <p className="text-xs text-gray-400 mt-1">Complete for extra</p>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['All Tasks', 'Featured', 'Apps', 'Surveys', 'Videos', 'Offers', 'Games'].map(tab => (
          <button key={tab} className="px-4 py-2 bg-[#82E23E] bg-opacity-20 text-[#82E23E] rounded-lg text-sm font-semibold hover:bg-opacity-30 whitespace-nowrap">
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { icon: '📱', title: 'Download the App', points: '+30', difficulty: 'Easy', time: '1 min' },
          { icon: '🎮', title: 'Reach Level 5', points: '+60', difficulty: 'Medium', time: '10-15 min' },
          { icon: '🎥', title: 'Watch a Video', points: '+15', difficulty: 'Easy', time: '1-2 min' },
          { icon: '📋', title: 'Complete a Survey', points: '+25', difficulty: 'Medium', time: '5-10 min' },
        ].map((task, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40 transition-all">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{task.icon}</div>
              <div>
                <p className="font-bold text-white">{task.title}</p>
                <p className="text-xs text-gray-400">{task.difficulty} • {task.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#82E23E]">{task.points}</p>
              <button className="text-[#82E23E] hover:text-[#9AE744] text-sm font-semibold mt-1">Start Task</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WalletTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-400 text-sm mb-2">Total Balance</p>
          <p className="text-4xl font-bold text-white">$12.50</p>
          <p className="text-[#82E23E] text-sm mt-2">= 1,250 Points</p>
        </div>
        <div className="text-right">
          <button className="bg-[#82E23E] text-[#0A0B0D] font-bold px-4 py-2 rounded-lg hover:bg-[#9AE744] transition-colors mb-2">
            Withdraw
          </button>
          <button className="bg-[#82E23E] bg-opacity-20 text-[#82E23E] font-bold px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors block w-full">
            Convert Points
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#82E23E] border-opacity-10">
        <div>
          <p className="text-gray-400 text-xs mb-1">Points Balance</p>
          <p className="text-2xl font-bold text-white">1,250</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-white">$28.70</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Withdraw</p>
          <p className="text-2xl font-bold text-white">$16.20</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Pending</p>
          <p className="text-2xl font-bold text-white">$2.30</p>
        </div>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {[
          { type: 'Task', desc: 'Task Completed', amount: '+150 Pts', status: 'Completed', date: 'May 18, 10:30 AM' },
          { type: 'Bonus', desc: 'Daily Bonus', amount: '+50 Pts', status: 'Completed', date: 'May 18, 08:00 AM' },
          { type: 'Convert', desc: 'Points Converted', amount: '-500 Pts / +$5', status: 'Completed', date: 'May 17, 06:45 PM' },
        ].map((tx, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">{tx.desc}</p>
              <p className="text-gray-400 text-xs">{tx.date}</p>
            </div>
            <p className="text-[#82E23E] font-bold">{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LeaderboardTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Top 10</h3>
      <div className="space-y-2">
        {[
          { rank: 1, name: 'TopWinner', points: '12,450', badge: '🏆' },
          { rank: 2, name: 'TaskMaster', points: '8,230', badge: '🥈' },
          { rank: 3, name: 'EarnQueen', points: '6,780', badge: '🥉' },
          { rank: 4, name: 'GrindPro', points: '5,610', badge: '' },
          { rank: 5, name: 'WinKing', points: '4,900', badge: '' },
        ].map(user => (
          <div key={user.rank} className="flex items-center justify-between p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#82E23E] bg-opacity-20 rounded-full flex items-center justify-center text-[#82E23E] font-bold">
                {user.rank}
              </div>
              <p className="font-bold text-white">{user.name}</p>
            </div>
            <p className="text-[#82E23E] font-bold">{user.points}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Rank</h3>
      <div className="text-center">
        <p className="text-5xl font-bold text-[#82E23E] mb-2">14 / 2,345</p>
        <p className="text-gray-400">Keep going! You're in the top 1%</p>
      </div>
    </div>
  </div>
);

const RewardsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-2">Total Points</p>
        <p className="text-2xl font-bold text-white">1,250</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-2">Rewards Claimed</p>
        <p className="text-2xl font-bold text-white">18</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-2">Available Rewards</p>
        <p className="text-2xl font-bold text-white">12</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-2">Total Redeemed</p>
        <p className="text-2xl font-bold text-white">$12.50</p>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Available Rewards</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Google Play $5', points: '500 Points' },
          { name: 'PayPal Cash $5', points: '500 Points' },
          { name: 'Netflix 1 Month', points: '750 Points' },
          { name: 'Amazon Gift Card $10', points: '1,000 Points' },
        ].map((reward, i) => (
          <div key={i} className="bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg p-4 text-center hover:border-opacity-40 transition-all cursor-pointer">
            <p className="font-bold text-white mb-2">{reward.name}</p>
            <p className="text-[#82E23E] text-sm mb-3">{reward.points}</p>
            <button className="w-full bg-[#82E23E] bg-opacity-20 text-[#82E23E] font-bold py-2 rounded-lg hover:bg-opacity-30">
              Redeem Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StreaksTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Your Current Streak</h3>
          <p className="text-gray-400">Keep it up!</p>
        </div>
        <div className="text-right">
          <p className="text-6xl font-bold text-[#82E23E]">7</p>
          <p className="text-gray-400 text-sm">Days</p>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div key={day} className="text-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-1 ${
              i < 7 ? 'bg-[#82E23E] bg-opacity-20 border border-[#82E23E] text-[#82E23E]' : 'bg-gray-700 text-gray-400'
            }`}>
              {i < 7 ? '✓' : '○'}
            </div>
            <p className="text-xs text-gray-400">{day}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Streak Rewards</h3>
      <div className="flex gap-2 overflow-x-auto">
        {[
          { day: 'Day 1', points: '+10' },
          { day: 'Day 2', points: '+20' },
          { day: 'Day 3', points: '+30' },
          { day: 'Day 4', points: '+50' },
          { day: 'Day 5', points: '+75' },
          { day: 'Day 6', points: '+100' },
          { day: 'Day 7', points: '+150', active: true },
          { day: 'Day 10', points: '+500', locked: true },
        ].map((reward, i) => (
          <div key={i} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
            reward.locked ? 'bg-gray-700 text-gray-400' : reward.active ? 'bg-[#82E23E] bg-opacity-30 border border-[#82E23E] text-[#82E23E]' : 'bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 text-white'
          }`}>
            {reward.day}<br/>{reward.points}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DailyBonusTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Your 7-Day Streak</h3>
      <p className="text-gray-400 mb-6">Claim your bonus today and come back tomorrow for an even bigger reward!</p>
      
      <div className="flex gap-2 mb-6 justify-center">
        {['+10', '+20', '+30', '+50', '+75', '+100', '+150'].map((bonus, i) => (
          <div key={i} className={`px-3 py-2 rounded-lg text-xs font-bold text-center ${
            i === 6 ? 'bg-[#82E23E] bg-opacity-30 border border-[#82E23E] text-[#82E23E]' : 'bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 text-white'
          }`}>
            Day {i+1}<br/>{bonus}
          </div>
        ))}
      </div>

      <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-3 rounded-lg hover:bg-[#9AE744] transition-colors">
        Claim Bonus
      </button>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Bonus History</h3>
      <div className="space-y-2">
        {[
          { day: 'Day 7', date: 'May 16, 2024', bonus: '+150 Points' },
          { day: 'Day 6', date: 'May 15, 2024', bonus: '+100 Points' },
          { day: 'Day 5', date: 'May 14, 2024', bonus: '+75 Points' },
        ].map((history, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">{history.day}</p>
              <p className="text-gray-400 text-xs">{history.date}</p>
            </div>
            <p className="text-[#82E23E] font-bold">{history.bonus}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReferralsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Total Referrals</p>
        <p className="text-3xl font-bold text-[#82E23E]">12</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Verified</p>
        <p className="text-3xl font-bold text-[#82E23E]">8</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Points Earned</p>
        <p className="text-3xl font-bold text-[#82E23E]">1,250</p>
      </div>
      <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-2">Total Earned</p>
        <p className="text-3xl font-bold text-[#82E23E]">$12.50</p>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Referral Link</h3>
      <div className="flex gap-2">
        <input type="text" value="https://winbig.pages.dev/join?ref=blapityblabloop" readOnly className="flex-1 bg-[#1a1a1d] border border-[#82E23E] border-opacity-20 rounded-lg px-4 py-3 text-white text-sm" />
        <button className="bg-[#82E23E] text-[#0A0B0D] font-bold px-4 py-3 rounded-lg hover:bg-[#9AE744]">
          Copy
        </button>
      </div>
      <p className="text-gray-400 text-xs mt-3 text-center">You earn 10% of all points your friends earn. There's no limit!</p>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Referrals</h3>
      <div className="space-y-2">
        {[
          { email: 'alice@example.com', date: 'May 18, 2024', status: 'Verified', points: '+52' },
          { email: 'john@example.com', date: 'May 16, 2024', status: 'Verified', points: '+32' },
          { email: 'mike@example.com', date: 'May 14, 2024', status: 'Verified', points: '+28' },
        ].map((ref, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">{ref.email}</p>
              <p className="text-gray-400 text-xs">{ref.date}</p>
            </div>
            <div className="text-right">
              <p className="text-[#82E23E] font-bold text-sm">{ref.status}</p>
              <p className="text-[#82E23E] font-bold">{ref.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProfileTab = ({ user }) => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#82E23E] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold text-2xl">
            {user?.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user?.email.split('@')[0]}</p>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-[#82E23E] text-sm mt-1">Active</p>
          </div>
        </div>
        <button className="bg-[#82E23E] bg-opacity-20 text-[#82E23E] font-bold px-4 py-2 rounded-lg hover:bg-opacity-30">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#82E23E]">1,250</p>
          <p className="text-gray-400 text-xs mt-1">Total Points</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-[#82E23E]">18</p>
          <p className="text-gray-400 text-xs mt-1">Tasks Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-[#82E23E]">7</p>
          <p className="text-gray-400 text-xs mt-1">Current Streak</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-[#82E23E]">$12.50</p>
          <p className="text-gray-400 text-xs mt-1">Total Earned</p>
        </div>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Achievements</h3>
      <div className="flex gap-4 flex-wrap">
        {[
          { icon: '✓', label: 'First Steps' },
          { icon: '7', label: 'Week Warrior' },
          { icon: '🔥', label: 'Streak Master' },
          { icon: '🏆', label: 'Task Master' },
        ].map((achievement, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 mx-auto bg-[#82E23E] bg-opacity-20 border border-[#82E23E] rounded-full flex items-center justify-center text-lg mb-2">
              {achievement.icon}
            </div>
            <p className="text-xs text-gray-400">{achievement.label}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Account Settings</h3>
      <div className="space-y-3">
        <button className="w-full flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40">
          <span className="text-white font-semibold">Notification Settings</span>
          <span className="text-gray-400">→</span>
        </button>
        <button className="w-full flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40">
          <span className="text-white font-semibold">Privacy Settings</span>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  </div>
);

const HistoryTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-2">
        {[
          { activity: 'Task Completed', date: 'May 18, 2024', amount: '+150 Points', status: 'Completed' },
          { activity: 'Daily Bonus', date: 'May 18, 2024', amount: '+50 Points', status: 'Completed' },
          { activity: 'Points Converted', date: 'May 17, 2024', amount: '-500 Points', status: 'Completed' },
          { activity: 'Withdrawal', date: 'May 16, 2024', amount: '-$10.00', status: 'Completed' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40">
            <div>
              <p className="font-bold text-white text-sm">{item.activity}</p>
              <p className="text-gray-400 text-xs">{item.date}</p>
            </div>
            <div className="text-right">
              <p className="text-[#82E23E] font-bold text-sm">{item.amount}</p>
              <p className="text-[#82E23E] text-xs">{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Account Information</h3>
      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-sm mb-1">Email</p>
          <p className="text-white font-semibold">blapityblabloop@gmail.com</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Member Since</p>
          <p className="text-white font-semibold">May 10, 2024</p>
        </div>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Preferences</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-white">Language</p>
          <p className="text-[#82E23E]">English →</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-white">Timezone</p>
          <p className="text-[#82E23E]">West Africa Time →</p>
        </div>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4 text-red-400">Account Actions</h3>
      <div className="space-y-2">
        <button className="w-full p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-400 font-bold rounded-lg hover:bg-opacity-30">
          Change Password
        </button>
        <button className="w-full p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-400 font-bold rounded-lg hover:bg-opacity-30">
          Delete Account
        </button>
      </div>
    </div>
  </div>
);

const HelpTab = () => (
  <div className="space-y-6">
    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {[
          'How do I earn points on WinBig?',
          'When will I receive my withdrawal?',
          'What payment methods do you support?',
          'Is there a minimum amount to withdraw?',
        ].map((faq, i) => (
          <button key={i} className="w-full text-left p-3 bg-[#0A0B0D] bg-opacity-40 border border-[#82E23E] border-opacity-20 rounded-lg hover:border-opacity-40">
            <p className="text-white font-semibold text-sm">{faq}</p>
          </button>
        ))}
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Contact Support</h3>
      <div className="space-y-3">
        <button className="w-full p-3 bg-[#82E23E] bg-opacity-20 text-[#82E23E] font-bold rounded-lg hover:bg-opacity-30">
          Email Support
        </button>
        <button className="w-full p-3 bg-[#82E23E] bg-opacity-20 text-[#82E23E] font-bold rounded-lg hover:bg-opacity-30">
          Live Chat
        </button>
      </div>
    </div>

    <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-2">Support Status</h3>
      <p className="text-[#82E23E] font-bold mb-3">All Systems Operational</p>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Website</span>
          <span className="text-[#82E23E]">Operational</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">API</span>
          <span className="text-[#82E23E]">Operational</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Payments</span>
          <span className="text-[#82E23E]">Operational</span>
        </div>
      </div>
    </div>
  </div>
);

// ============ MAIN DASHBOARD ============
const Dashboard = ({ user, onLogout, tasks }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showStats, setShowStats] = useState(true);

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

  const renderTab = () => {
    switch(activeNav) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Total Points</p>
                <p className="text-3xl font-bold text-white">1,250</p>
                <p className="text-[#82E23E] text-xs mt-2">+150 from yesterday</p>
              </div>
              <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Tasks Completed</p>
                <p className="text-3xl font-bold text-white">18</p>
                <p className="text-[#82E23E] text-xs mt-2">+3 from yesterday</p>
              </div>
              <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Current Streak</p>
                <p className="text-3xl font-bold text-white">7 Days</p>
                <p className="text-[#82E23E] text-xs mt-2">Keep it up!</p>
              </div>
              <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Total Earned</p>
                <p className="text-3xl font-bold text-white">$12.50</p>
                <p className="text-[#82E23E] text-xs mt-2">Redeemable balance</p>
              </div>
            </div>
          </div>
        );
      case 'tasks': return <TasksTab />;
      case 'wallet': return <WalletTab />;
      case 'leaderboard': return <LeaderboardTab />;
      case 'rewards': return <RewardsTab />;
      case 'streaks': return <StreaksTab />;
      case 'bonus': return <DailyBonusTab />;
      case 'referrals': return <ReferralsTab />;
      case 'profile': return <ProfileTab user={user} />;
      case 'history': return <HistoryTab />;
      case 'settings': return <SettingsTab />;
      case 'help': return <HelpTab />;
      default: return <TasksTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white flex">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border-r border-[#82E23E] border-opacity-10 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#82E23E] rounded-lg flex items-center justify-center">
            <span className="text-[#0A0B0D] font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-lg">WinBig</span>
        </div>

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

        <div className="bg-[#82E23E] bg-opacity-10 border border-[#82E23E] border-opacity-30 rounded-2xl p-4 mb-6">
          <p className="text-xs font-bold text-[#82E23E] mb-2">Invite & Earn</p>
          <p className="text-xs text-gray-400 mb-4">Get 10% of your friends' earnings.</p>
          <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-2 rounded-lg text-xs hover:bg-[#9AE744] transition-colors">
            Invite Friends
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-[#82E23E] border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#82E23E] rounded-full flex items-center justify-center text-[#0A0B0D] font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs">
              <p className="font-bold truncate">{user.email.split('@')[0]}</p>
              <button onClick={onLogout} className="text-[#82E23E] hover:underline">Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        {renderTab()}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-80 bg-[#0A0B0D] bg-opacity-80 backdrop-blur-sm border-l border-[#82E23E] border-opacity-10 p-6 overflow-y-auto">
        <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6 mb-6">
          <h3 className="text-gray-400 text-sm mb-4">Wallet Balance</h3>
          <p className="text-3xl font-bold text-white mb-1">1,250</p>
          <p className="text-gray-400 text-xs mb-4">≈ $12.50 USD</p>
          <button className="w-full bg-[#82E23E] text-[#0A0B0D] font-bold py-2 rounded-lg hover:bg-[#9AE744] text-sm">
            Redeem Rewards
          </button>
        </div>

        <div className="bg-[#0A0B0D] bg-opacity-40 backdrop-blur-md border border-[#82E23E] border-opacity-20 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Tasks Today</span>
              <span className="text-[#82E23E] font-bold">3 / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Daily Bonus</span>
              <span className="text-[#82E23E] font-bold">+150 Pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Streak Days</span>
              <span className="text-[#82E23E] font-bold">7 Days</span>
            </div>
          </div>
        </div>
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
