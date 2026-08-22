import React, { useState } from 'react';
import {
  LayoutDashboard, CheckSquare, Gift, Flame, Trophy, Share2, Wallet,
  History, User, Settings, HelpCircle, Bell, ChevronRight, CheckCircle2,
  XCircle, Clock, Copy, Search, ArrowUpRight, ArrowDownLeft, ShieldCheck,
  Globe, MessageSquare, Mail, ExternalLink, Moon, Lock, Play, Zap, Award
} from 'lucide-react';

export default function WinBigApp() {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [taskFilter, setTaskFilter] = useState('All');

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
                W
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[100px]">blapityblapitybloop</div>
                <div className="text-[10px] text-gray-400">1,250 Points</div>
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
        {activeTab === 'Tasks' && <TasksView filter={taskFilter} setFilter={setTaskFilter} />}
        {activeTab === 'Daily Bonus' && <DailyBonusView />}
        {activeTab === 'Streaks' && <StreaksView />}
        {activeTab === 'Rewards' && <RewardsView />}
        {activeTab === 'Referrals' && <ReferralsView />}
        {activeTab === 'Leaderboard' && <LeaderboardView />}
        {activeTab === 'Wallet' && <WalletView />}
        {activeTab === 'History' && <HistoryView />}
        {activeTab === 'Settings' && <SettingsView />}
        {activeTab === 'Help & Support' && <HelpSupportView />}
        {['Dashboard', 'Profile'].includes(activeTab) && (
          <div className="text-center py-20 text-gray-500">
            <h2 className="text-xl font-bold text-gray-300">{activeTab} Section</h2>
            <p className="text-sm mt-1">Select another tab from the sidebar to view detailed panels.</p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   SUB-VIEWS
   ========================================================================== */

// 1. TASKS VIEW
function TasksView({ filter, setFilter }) {
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
        {/* Main Task List Panel */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {['All Tasks', 'Featured', 'Apps', 'Surveys', 'Videos', 'Offers', 'Games'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filter === t ? 'bg-emerald-500 text-black' : 'bg-[#11161d] text-gray-400 border border-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Download the App', sub: 'Download and open the app from Play Store', pts: '+30', tag: 'Featured', icon: Zap },
              { title: 'Reach Level 5', sub: 'Play the app and reach Level 5.', pts: '+60', tag: 'Featured', icon: Trophy },
              { title: 'Watch a Video', sub: 'Watch a short video and earn easy points.', pts: '+15', icon: Play },
              { title: 'Complete a Survey', sub: 'Complete a quick survey and share your opinion.', pts: '+25', icon: CheckSquare },
              { title: 'Explore an Offer', sub: 'Check out this offer and complete the requirements.', pts: '+100', icon: Gift },
            ].map((task, i) => (
              <div key={i} className="bg-[#11161d] border border-gray-800/80 hover:border-gray-700 rounded-xl p-4 flex items-center justify-between transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-emerald-400">
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{task.title}</span>
                      {task.tag && <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-medium">{task.tag}</span>}
                    </div>
                    <div className="text-xs text-gray-400">{task.sub}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold text-sm">{task.pts}</span>
                    <div className="text-[10px] text-gray-500">POINTS</div>
                  </div>
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition">
                    Start Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Widget: Donut Chart & Filters */}
        <div className="space-y-4">
          <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 text-center">
            <h3 className="text-sm font-semibold text-white mb-1">Daily Task Progress</h3>
            <p className="text-xs text-gray-400 mb-4">Complete 5 tasks daily to get a bonus!</p>
            
            {/* SVG Donut Chart */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="60, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold text-white">3/5</span>
                <span className="text-[10px] text-gray-400">Tasks Completed</span>
              </div>
            </div>

            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5">
              <div className="text-emerald-400 font-bold text-sm">+50 BONUS POINTS</div>
              <div className="text-[10px] text-gray-400">Complete 2 more tasks to claim bonus!</div>
            </div>
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
        <p className="text-xs text-gray-400">Log in every day and claim bigger bonuses. Keep your streak alive!</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Main Donut & Streak Indicator */}
          <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 flex items-center justify-around">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="100, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <Flame className="w-8 h-8 text-amber-500 fill-amber-500 mb-1" />
                <span className="text-2xl font-black text-white">7</span>
                <span className="text-xs text-gray-400">Days</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Your 7-Day Streak</h3>
              <p className="text-xs text-gray-400 max-w-xs">Claim your bonus today and come back tomorrow for an even bigger reward!</p>
              <div className="flex gap-2">
                {[10, 20, 30, 50, 75, 100, 150].map((pts, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${idx < 6 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500 text-black'}`}>
                      ✓
                    </div>
                    <span className="text-[10px] text-gray-400">+{pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Claim Section */}
          <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl font-extrabold">
                +150
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Today's Bonus</h4>
                <p className="text-xs text-gray-400">Day 7 Streak Reward</p>
              </div>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition">
              Claim Bonus
            </button>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Points Summary</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Total Points</span>
              <span className="text-white font-bold">1,250</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Tasks Completed</span>
              <span className="text-white font-bold">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Earned</span>
              <span className="text-emerald-400 font-bold">$12.50</span>
            </div>
          </div>
        </div>
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
        <p className="text-xs text-gray-400">Complete tasks every day to build your streak and earn bigger rewards!</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 flex items-center gap-8">
          <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-500" strokeDasharray="70, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span className="text-xl font-extrabold text-white">7</span>
              <span className="text-[10px] text-gray-400">Days</span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-2">Streak Calendar</h3>
            <div className="flex gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs ${idx < 6 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-500 text-black font-bold'}`}>
                    ✓
                  </div>
                  <span className="text-[10px] text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-white">Streak Stats</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Total Streaks</span><span className="text-white font-bold">12</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Total Days Active</span><span className="text-white font-bold">48</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Streaks Broken</span><span className="text-white font-bold">3</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. REWARDS VIEW
function RewardsView() {
  const giftCards = [
    { title: 'Google Play Gift Card', value: '$5', pts: '500 Points', brand: 'Google Play' },
    { title: 'PayPal Cash', value: '$5', pts: '500 Points', brand: 'PayPal' },
    { title: 'Spotify Premium', value: '1 Month', pts: '750 Points', brand: 'Spotify' },
    { title: 'Netflix Gift Card', value: '$10', pts: '1,000 Points', brand: 'Netflix' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Rewards</h1>
        <p className="text-xs text-gray-400">Redeem your points for exciting rewards!</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {giftCards.map((card, i) => (
          <div key={i} className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-4">
            <div className="h-24 bg-gray-900 rounded-xl flex items-center justify-center font-black text-xl text-emerald-400 border border-gray-800">
              {card.brand}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{card.title}</div>
              <div className="text-xs text-emerald-400 font-semibold">{card.value}</div>
              <div className="text-[10px] text-gray-500 mt-1">{card.pts}</div>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-2 rounded-xl transition">
              Redeem Now
            </button>
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
        <p className="text-xs text-gray-400">Invite your friends, earn rewards, and climb the leaderboard!</p>
      </div>

      <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Your Referral Link</h3>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://winbig.pages.dev/join?ref=blapitybloop"
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
          />
          <button className="bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
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
        <p className="text-xs text-gray-400">Compete with others and climb to the top to earn exclusive rewards!</p>
      </div>

      {/* Podium Display */}
      <div className="flex justify-center items-end gap-6 my-8">
        {[
          { rank: '2', name: 'TaskMaster', pts: '8,230 Points', height: 'h-32', color: 'border-gray-400' },
          { rank: '1', name: 'TopWinner', pts: '12,450 Points', height: 'h-40', color: 'border-amber-400' },
          { rank: '3', name: 'EarnQueen', pts: '6,780 Points', height: 'h-24', color: 'border-amber-700' },
        ].map((p) => (
          <div key={p.rank} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-emerald-500 flex items-center justify-center font-bold text-white mb-2">
              {p.rank}
            </div>
            <span className="text-xs font-bold text-white">{p.name}</span>
            <span className="text-[10px] text-gray-400 mb-2">{p.pts}</span>
            <div className={`w-24 ${p.height} bg-[#11161d] border-t-2 ${p.color} rounded-t-xl flex items-center justify-center text-xl font-bold text-gray-600`}>
              {p.rank}
            </div>
          </div>
        ))}
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
        <p className="text-xs text-gray-400">View your balance, earnings, and withdraw your rewards.</p>
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
              <path
                d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 10"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
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

// 9. SETTINGS VIEW
function SettingsView() {
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
              <div className="text-gray-400">Username</div>
              <div className="text-white font-medium">blapityblapitybloop</div>
            </div>
            <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-[10px]">Change</button>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <div>
              <div className="text-gray-400">Email</div>
              <div className="text-white font-medium">blapitybloop@gmail.com</div>
            </div>
            <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-[10px]">Change</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. HELP & SUPPORT VIEW
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
            <input
              placeholder="Search for help articles, topics..."
              className="w-full bg-[#11161d] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-200 focus:outline-none"
            />
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