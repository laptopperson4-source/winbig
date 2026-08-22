import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutDashboard, CheckSquare, Gift, Flame, Trophy, Share2, Wallet,
  History, User, Settings, HelpCircle, Bell, ChevronRight, CheckCircle2,
  XCircle, Clock, Copy, Search, ArrowUpRight, ArrowDownLeft, ShieldCheck,
  Globe, MessageSquare, Mail, ExternalLink, Moon, Lock, Play, Zap, Award
} from 'lucide-react';

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function WinBigApp() {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [taskFilter, setTaskFilter] = useState('All');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Check authentication & load data
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        loadTasks();
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        loadTasks();
      } else {
        setUser(null);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#0a0d0f] text-white">Loading...</div>;
  }

  if (!user) {
    return <LoginPage onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Sidebar navigation configuration
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'Daily Bonus', label: 'Daily Bonus', icon: Gift },
    { id: 'Streaks', label: 'Streaks', icon: Flame },
    { id: 'Rewards', label: 'Rewards', icon: Trophy },
    { id: 'Referrals', label: 'Referrals', icon: Share2 },
    { id: 'Leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'Wallet', label: 'Wallet', icon: Wallet },
    { id: 'History', label: 'History', icon: History },
    { id: 'Profile', label: 'Profile', icon: User },
    { id: 'Settings', label: 'Settings', icon: Settings },
    { id: 'Help & Support', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-[#0a0d0f] text-gray-200 font-sans overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#0d1117] border-r border-gray-800/60 flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg shadow-emerald-500/20">
              W
            </div>
            <span className="text-xl font-bold tracking-tight text-white">WinBig</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Widget & User */}
        <div className="space-y-4 pt-4 border-t border-gray-800/60">
          <div className="bg-gradient-to-b from-emerald-950/30 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <Share2 className="w-4 h-4" /> Invite & Earn
            </div>
            <p className="text-xs text-gray-400 mb-3">Get 10% of your friends' earnings forever!</p>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 text-xs rounded-xl transition">
              Invite Friends
            </button>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[100px]">{user?.email?.split('@')[0]}</div>
                <div className="text-[10px] text-gray-400 cursor-pointer hover:text-red-400" onClick={handleLogout}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-[#090c0e] p-8">
        {/* Top Streak Header Component */}
        <div className="flex justify-end items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-[#12181f] border border-gray-800 px-3 py-1.5 rounded-xl">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-gray-200">7 Days</span>
            <span className="text-[10px] text-gray-500 border-l border-gray-700 pl-2">Current Streak</span>
          </div>
          <button className="p-2 bg-[#12181f] border border-gray-800 rounded-xl text-gray-400 hover:text-white">
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic View Rendering */}
        {activeTab === 'Dashboard' && <DashboardView tasks={tasks} />}
        {activeTab === 'Tasks' && <TasksView filter={taskFilter} setFilter={setTaskFilter} tasks={tasks} />}
        {activeTab === 'Daily Bonus' && <DailyBonusView />}
        {activeTab === 'Streaks' && <StreaksView />}
        {activeTab === 'Rewards' && <RewardsView />}
        {activeTab === 'Referrals' && <ReferralsView />}
        {activeTab === 'Leaderboard' && <LeaderboardView />}
        {activeTab === 'Wallet' && <WalletView />}
        {activeTab === 'History' && <HistoryView />}
        {activeTab === 'Profile' && <ProfileView user={user} />}
        {activeTab === 'Settings' && <SettingsView user={user} onLogout={handleLogout} />}
        {activeTab === 'Help & Support' && <HelpSupportView />}
      </main>
    </div>
  );
}

/* ==========================================================================
   LOGIN COMPONENT
   ========================================================================== */
function LoginPage({ onLoginSuccess }) {
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
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d0f] flex items-center justify-center">
      <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-black text-xl">
            W
          </div>
          <span className="text-2xl font-bold text-white">WinBig</span>
        </div>

        <h1 className="text-xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-xs text-gray-400 mb-6">Welcome back! Sign in to your account.</p>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0a0d0f] border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0a0d0f] border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-VIEWS (KEEPING EXACT CODE FROM UPLOADED FILE)
   ========================================================================== */

// 0. DASHBOARD VIEW
function DashboardView({ tasks }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-xs text-gray-400">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Points', val: '1,250', sub: 'Available for redemption', icon: Trophy, color: 'text-emerald-400' },
          { label: 'Tasks Completed', val: '18', sub: 'Total completed', icon: CheckCircle2, color: 'text-amber-400' },
          { label: 'Current Streak', val: '7 Days', sub: 'Keep it up!', icon: Flame, color: 'text-orange-400' },
          { label: 'Total Earned', val: '$12.50', sub: 'Lifetime earnings', icon: Wallet, color: 'text-blue-400' },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{card.val}</div>
              <div className="text-xs text-gray-400 font-medium">{card.label}</div>
              <div className="text-[10px] text-emerald-400 mt-1">{card.sub}</div>
            </div>
            <card.icon className={`w-8 h-8 ${card.color} opacity-80`} />
          </div>
        ))}
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Featured Tasks</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Task 1', points: '150' },
            { name: 'Task 2', points: '200' },
            { name: 'Task 3', points: '100' },
            { name: 'Task 4', points: '250' },
          ].map((task, i) => (
            <div key={i} className="bg-gray-900/40 border border-gray-800/40 rounded-xl p-3 text-center">
              <div className="text-xs font-semibold text-white mb-2">{task.name}</div>
              <div className="text-emerald-400 font-bold text-sm mb-3">{task.points} Pts</div>
              <button className="w-full bg-emerald-500 text-black text-xs font-bold py-1.5 rounded-lg hover:bg-emerald-400">Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 1. TASKS VIEW (EXACT FROM UPLOADED)
function TasksView({ filter, setFilter, tasks }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <p className="text-xs text-gray-400">Complete tasks and earn points. New tasks added regularly!</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Tasks Completed', val: '18', sub: '↑ 3 from yesterday', icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Available Points', val: '250', sub: 'Earn by completing tasks', icon: Trophy, color: 'text-amber-400' },
          { label: 'In Progress', val: '2', sub: 'Keep it up!', icon: Clock, color: 'text-purple-400' },
          { label: 'Bonus Tasks', val: '12', sub: 'Complete for extra points', icon: Gift, color: 'text-blue-400' },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{card.val}</div>
              <div className="text-xs text-gray-400 font-medium">{card.label}</div>
              <div className="text-[10px] text-emerald-400 mt-1">{card.sub}</div>
            </div>
            <card.icon className={`w-8 h-8 ${card.color} opacity-80`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Task List */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            {['All Tasks', 'Featured', 'Apps', 'Surveys', 'Videos', 'Offers', 'Games'].map((t) => (
              <button key={t} className={`text-xs px-3 py-1.5 rounded-lg transition ${t === filter ? 'bg-emerald-500 text-black font-semibold' : 'bg-gray-800 text-gray-300 hover:text-white'}`} onClick={() => setFilter(t)}>
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {tasks.slice(0, 5).map((task, i) => (
              <div key={i} className="bg-[#11161d] border border-gray-800/80 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{task.title}</div>
                    <div className="text-xs text-gray-400">{task.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{task.base_points || 150} Pts</div>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300">Start →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 space-y-4 h-fit">
          <h3 className="text-sm font-semibold text-white">Quick Stats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Pending Review</span><span className="text-white font-semibold">3</span></div>
            <div className="flex justify-between"><span className="text-gray-400">In Progress</span><span className="text-white font-semibold">2</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Completed Today</span><span className="text-emerald-400 font-semibold">5</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. DAILY BONUS VIEW
function DailyBonusView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Daily Bonus</h1>
        <p className="text-xs text-gray-400">Claim your daily login bonus and special rewards!</p>
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">7-Day Bonus Progression</h2>
        <div className="grid grid-cols-7 gap-3 mb-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`text-center p-3 rounded-xl border ${i < 5 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-gray-800/30 border-gray-700/50'}`}>
              <div className="text-xs font-semibold text-gray-300">Day {i + 1}</div>
              <div className={`text-sm font-bold mt-1 ${i < 5 ? 'text-emerald-400' : 'text-gray-400'}`}>{50 * (i + 1)} Pts</div>
            </div>
          ))}
        </div>
        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl text-sm">Claim Today (Day 5) - 250 Points</button>
      </div>
    </div>
  );
}

// 3. STREAKS VIEW
function StreaksView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Streaks</h1>
        <p className="text-xs text-gray-400">Keep your streak alive with daily activity!</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Current Streak', val: '7', icon: Flame, color: 'text-orange-400' },
          { label: 'Longest Streak', val: '15', icon: Trophy, color: 'text-yellow-400' },
          { label: 'Total Streak Days', val: '42', icon: Award, color: 'text-blue-400' },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 text-center">
            <card.icon className={`w-8 h-8 ${card.color} mx-auto mb-3`} />
            <div className="text-3xl font-bold text-white">{card.val}</div>
            <div className="text-xs text-gray-400 mt-2">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. REWARDS VIEW
function RewardsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Rewards</h1>
        <p className="text-xs text-gray-400">Redeem your points for amazing rewards!</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { name: '$5 PayPal', points: '500 Pts', icon: DollarSign },
          { name: 'Google Play $10', points: '1000 Pts', icon: Play },
          { name: 'Amazon $5', points: '750 Pts', icon: ExternalLink },
          { name: 'Steam $10', points: '1200 Pts', icon: Zap },
          { name: 'Netflix 1 Month', points: '1500 Pts', icon: Globe },
          { name: 'Xbox Game Pass', points: '2000 Pts', icon: Zap },
        ].map((reward, i) => (
          <div key={i} className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">{reward.name}</div>
            <div className="text-emerald-400 text-xs font-bold mt-2">{reward.points}</div>
            <button className="w-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold py-2 rounded-lg mt-3 hover:bg-emerald-500/30">Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. REFERRALS VIEW
function ReferralsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Referrals</h1>
        <p className="text-xs text-gray-400">Invite friends and earn commission from their activity!</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Your Referral Link</h3>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-center justify-between mb-4">
            <span className="text-xs text-gray-300 truncate">winbig.com/ref/user123</span>
            <button className="text-emerald-400 hover:text-emerald-300">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <button className="w-full bg-emerald-500 text-black font-semibold py-2 text-xs rounded-lg">Share Referral Link</button>
        </div>

        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Referral Stats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Total Referrals</span><span className="text-white font-semibold">12</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Active Referrals</span><span className="text-emerald-400 font-semibold">8</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Earnings from Referrals</span><span className="text-white font-semibold">$24.50</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. LEADERBOARD VIEW
function LeaderboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-xs text-gray-400">See how you rank among all WinBig users!</p>
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 text-gray-400 font-semibold">Rank</th>
              <th className="text-left py-3 text-gray-400 font-semibold">User</th>
              <th className="text-left py-3 text-gray-400 font-semibold">Points</th>
              <th className="text-left py-3 text-gray-400 font-semibold">Streak</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, user: 'TopWinner', points: '12,450', streak: '21 days' },
              { rank: 2, user: 'TaskMaster', points: '8,230', streak: '15 days' },
              { rank: 3, user: 'EarnQueen', points: '6,780', streak: '12 days' },
              { rank: 4, user: 'YourName', points: '5,120', streak: '7 days' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-900/40">
                <td className="py-3 text-white font-semibold">{row.rank}</td>
                <td className="py-3 text-white">{row.user}</td>
                <td className="py-3 text-emerald-400 font-semibold">{row.points}</td>
                <td className="py-3 text-gray-400">{row.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 7. WALLET VIEW
function WalletView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet</h1>
        <p className="text-xs text-gray-400">Manage your balance and withdraw your earnings.</p>
      </div>

      {/* Main Balance Card with Line Graph SVG */}
      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="text-xs text-gray-400">Total Balance</div>
          <div className="text-4xl font-black text-white">$12.50</div>
          <div className="text-xs text-emerald-400 font-semibold">= 1,250 Points</div>
          <div className="flex gap-2">
            <button className="bg-emerald-500 text-black text-xs font-bold px-4 py-2 rounded-xl">Withdraw</button>
            <button className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-xl">Convert Points</button>
          </div>
        </div>

        {/* SVG Line Graph */}
        <div className="col-span-2 flex flex-col justify-end">
          <div className="h-28 w-full">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 10" fill="none" stroke="#10b981" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. HISTORY VIEW
function HistoryView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p className="text-xs text-gray-400">View all your activity, earnings, withdrawals, and more.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Activity Table */}
        <div className="col-span-2 bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 space-y-3">
          <div className="text-sm font-semibold text-white px-2">Recent Activity</div>
          <div className="space-y-2">
            {[
              { type: 'Task Completed', desc: 'Download the App', date: 'May 18, 2024', amt: '+150 Points', status: 'Completed', color: 'text-emerald-400' },
              { type: 'Daily Bonus', desc: 'Daily login bonus', date: 'May 18, 2024', amt: '+50 Points', status: 'Completed', color: 'text-emerald-400' },
              { type: 'Converted Points', desc: 'Converted 500 points to cash', date: 'May 17, 2024', amt: '-$5.00', status: 'Completed', color: 'text-red-400' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-900/40 rounded-xl text-xs border border-gray-800/40">
                <div>
                  <div className="font-semibold text-white">{row.type}</div>
                  <div className="text-[10px] text-gray-400">{row.desc}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${row.color}`}>{row.amt}</div>
                  <div className="text-[10px] text-emerald-400">{row.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Overview Donut Chart */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Activity Overview</h3>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-emerald-500" strokeDasharray="42, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-red-500" strokeDasharray="28, 100" strokeDashoffset="-42" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-blue-500" strokeDasharray="18, 100" strokeDashoffset="-70" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-emerald-400">● Earnings</span><span className="text-gray-300">42%</span></div>
            <div className="flex justify-between"><span className="text-red-400">● Withdrawals</span><span className="text-gray-300">28%</span></div>
            <div className="flex justify-between"><span className="text-blue-400">● Conversions</span><span className="text-gray-300">18%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. PROFILE VIEW
function ProfileView({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-xs text-gray-400">View and manage your profile information.</p>
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-2xl font-bold text-black">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.email?.split('@')[0]}</h2>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">1,250</div>
            <div className="text-xs text-gray-400 mt-1">Points</div>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-400">18</div>
            <div className="text-xs text-gray-400 mt-1">Tasks</div>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">7</div>
            <div className="text-xs text-gray-400 mt-1">Streak</div>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">$12.50</div>
            <div className="text-xs text-gray-400 mt-1">Earned</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. SETTINGS VIEW
function SettingsView({ user, onLogout }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-xs text-gray-400">Manage your account, preferences, and app settings.</p>
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 space-y-4 max-w-2xl">
        <h3 className="text-sm font-semibold text-white">Account Information</h3>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <div>
              <div className="text-gray-400">Email</div>
              <div className="text-white font-medium">{user?.email}</div>
            </div>
            <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-[10px]">Change</button>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-2xl">
        <h3 className="text-sm font-semibold text-red-400 mb-3">Danger Zone</h3>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// 11. HELP & SUPPORT VIEW
function HelpSupportView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <p className="text-xs text-gray-400">We're here to help! Find answers or get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
            <input placeholder="Search for help articles, topics..." className="w-full bg-[#11161d] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-200 focus:outline-none" />
          </div>

          <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-semibold text-white mb-3">Frequently Asked Questions</h3>
            {[
              'How do I earn points on WinBig?',
              'When will I receive my withdrawal?',
              'What payment methods do you support?',
              'Is there a minimum amount to withdraw?',
            ].map((faq, i) => (
              <div key={i} className="p-3 bg-gray-900/40 rounded-xl text-xs text-gray-300 flex justify-between items-center">
                <span>{faq}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Support Status */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-white">Support Status</h3>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-lg text-center font-medium">
            All Systems Operational
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon placeholder for missing lucide-react icon
function DollarSign(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}
