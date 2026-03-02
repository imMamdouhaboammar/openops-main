
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from './Icons';
import { useUser } from '../hooks/useUser';
import { AuditLogEntry, Invoice, TeamMember } from '../types';
import { ApiKeyPanel } from './account/ApiKeyPanel';

interface AccountCenterProps {
  onBack: () => void;
}

// Mock Data
const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'evt_1', action: 'Login Attempt', actor: 'user@example.com', ip: '192.168.1.1', timestamp: 'Just now', status: 'Success' },
  { id: 'evt_2', action: 'License Key Export', actor: 'user@example.com', ip: '192.168.1.1', timestamp: '2 hours ago', status: 'Success' },
  { id: 'evt_3', action: 'Failed Login', actor: 'Unknown', ip: '45.33.22.11', timestamp: 'Yesterday', status: 'Warning' },
  { id: 'evt_4', action: 'Invite Member', actor: 'user@example.com', ip: '192.168.1.1', timestamp: '3 days ago', status: 'Success' },
];

const MOCK_INVOICES: Invoice[] = [
  { id: 'inv_003', date: 'Oct 01, 2024', amount: 299.00, status: 'Paid', items: 3 },
  { id: 'inv_002', date: 'Sep 01, 2024', amount: 149.00, status: 'Paid', items: 1 },
  { id: 'inv_001', date: 'Aug 01, 2024', amount: 149.00, status: 'Paid', items: 1 },
];

const MOCK_TEAM: TeamMember[] = [
  { id: 'tm_1', name: 'Commander (You)', email: 'user@example.com', role: 'Owner', status: 'Active', lastActive: 'Now' },
  { id: 'tm_2', name: 'Sarah Engineer', email: 'sarah@example.com', role: 'Member', status: 'Active', lastActive: '2h ago' },
  { id: 'tm_3', name: 'DevOps Bot', email: 'bot@example.com', role: 'Viewer', status: 'Invited', lastActive: '-' },
];

// Mock Usage Data for Chart
const USAGE_DATA = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 72 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 20 },
  { day: 'Sun', value: 10 },
];

type View = 'overview' | 'security' | 'team' | 'billing' | 'settings';

export const AccountCenter: React.FC<AccountCenterProps> = ({ onBack }) => {
  const { user, toggle2FA } = useUser();
  const [activeView, setActiveView] = useState<View>('overview');

  const renderSidebarItem = (view: View, label: string, icon: any) => {
    const Icon = icon;
    const isActive = activeView === view;
    return (
      <button
        onClick={() => setActiveView(view)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
          isActive
            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-20 pb-20 animate-fade-in transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation / Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors">
            <Icons.ArrowLeft className="w-4 h-4" /> Exit to Fleet
          </button>
          <div className="flex items-center gap-2 bg-white dark:bg-dark-900 px-3 py-1.5 rounded-full border border-gray-200 dark:border-dark-800 shadow-sm">
             <div className={`w-2 h-2 rounded-full ${user.riskScore < 20 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
             <span className="text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">System: Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-4 shadow-sm sticky top-24">
              
              {/* User Profile Snippet */}
              <div className="px-4 py-4 mb-4 border-b border-gray-100 dark:border-dark-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-black dark:text-white text-sm truncate">{user.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{user.organization?.name || 'Personal Account'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {renderSidebarItem('overview', 'Dashboard', Icons.Layout)}
                {renderSidebarItem('security', 'Security & Access', Icons.ShieldCheck)}
                {renderSidebarItem('team', 'Team & Roles', Icons.Users)}
                {renderSidebarItem('billing', 'Billing & Invoices', Icons.CreditCard)}
                {renderSidebarItem('settings', 'Settings', Icons.Settings)}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-dark-800 px-4">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-xs font-bold transition-colors w-full p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10">
                  <Icons.Lock className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {activeView === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Hero / Operator Status */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-dark-900 dark:to-dark-950 rounded-2xl p-8 text-white relative overflow-hidden border border-gray-800">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Icons.Terminal className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-[10px] font-mono uppercase tracking-widest text-brand-300">
                        Level {user.operatorLevel} Operator
                      </span>
                      {user.isVerifiedOperator && <Icons.CheckCircle2 className="w-4 h-4 text-brand-400" />}
                    </div>
                    <h1 className="text-3xl font-black mb-6">Welcome back, {user.name.split(' ')[0]}.</h1>
                    
                    <div className="max-w-md">
                      <div className="flex justify-between text-xs mb-2 text-gray-400">
                        <span>XP Progress</span>
                        <span>{user.accountMaturityScore}/100</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-1000" 
                          style={{ width: `${user.accountMaturityScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Verify 1 more agent deployment to reach Level {user.operatorLevel + 1}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Fleet Size */}
                  <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl group hover:border-brand-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                        <Icons.Cpu className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <Icons.TrendingUp className="w-3 h-3" /> +1
                      </span>
                    </div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">3</div>
                    <div className="text-xs text-gray-500 font-medium">Active Agents</div>
                  </div>

                  {/* Monthly Spend */}
                  <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl group hover:border-brand-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                        <Icons.CreditCard className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-400">USD</span>
                    </div>
                    <div className="text-3xl font-black text-black dark:text-white mb-1">$597</div>
                    <div className="text-xs text-gray-500 font-medium">Total Spend</div>
                  </div>

                  {/* Risk Score */}
                  <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl group hover:border-brand-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
                        <Icons.ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-400">
                        Score
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-black text-black dark:text-white mb-1">{user.riskScore}</div>
                        <span className="text-xs text-gray-400">/ 100</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                        {user.riskScore < 20 ? 'Security Optimal' : 'Action Required'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-black dark:text-white">Agent Activity (7d)</h3>
                            <button className="text-xs text-gray-400 hover:text-brand-500 flex items-center gap-1">
                                View Report <Icons.ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex items-end justify-between h-32 gap-2">
                            {USAGE_DATA.map((data, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-gray-100 dark:bg-dark-800 rounded-t-lg relative overflow-hidden h-full flex items-end">
                                        <div 
                                            className="w-full bg-brand-500 opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-lg"
                                            style={{ height: `${data.value}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                        <h3 className="font-bold text-black dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-gray-50 dark:bg-dark-950 hover:bg-brand-50 dark:hover:bg-brand-900/20 border border-gray-100 dark:border-dark-800 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                                <Icons.Plus className="w-5 h-5 text-gray-500 group-hover:text-brand-500" />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">New Order</span>
                            </button>
                            <button className="p-3 bg-gray-50 dark:bg-dark-950 hover:bg-brand-50 dark:hover:bg-brand-900/20 border border-gray-100 dark:border-dark-800 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                                <Icons.Users className="w-5 h-5 text-gray-500 group-hover:text-brand-500" />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">Invite Team</span>
                            </button>
                            <button className="p-3 bg-gray-50 dark:bg-dark-950 hover:bg-brand-50 dark:hover:bg-brand-900/20 border border-gray-100 dark:border-dark-800 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                                <Icons.Download className="w-5 h-5 text-gray-500 group-hover:text-brand-500" />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">Export Keys</span>
                            </button>
                            <button className="p-3 bg-gray-50 dark:bg-dark-950 hover:bg-brand-50 dark:hover:bg-brand-900/20 border border-gray-100 dark:border-dark-800 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                                <Icons.HelpCircle className="w-5 h-5 text-gray-500 group-hover:text-brand-500" />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">Support</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-6">Live Stream</h3>
                  <div className="relative border-l-2 border-gray-100 dark:border-dark-800 ml-3 space-y-8">
                    {MOCK_AUDIT_LOGS.map((log, i) => (
                      <div key={i} className="relative pl-8">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-dark-900 ${
                            log.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                                <h4 className="text-sm font-bold text-black dark:text-white">{log.action}</h4>
                                <p className="text-xs text-gray-500">Actor: {log.actor} • IP: {log.ip}</p>
                            </div>
                            <span className="text-xs font-mono text-gray-400 bg-gray-50 dark:bg-dark-950 px-2 py-1 rounded self-start sm:self-center">
                                {log.timestamp}
                            </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'security' && (
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-2xl font-black text-black dark:text-white">Security & Access</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your credentials, 2FA, and audit logs.</p>
                
                {/* 2FA Toggle */}
                <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                      Two-Factor Authentication
                      {user.twoFactorEnabled ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Enabled</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">Disabled</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Protect your fleet with an extra layer of security.</p>
                  </div>
                  <button 
                    onClick={toggle2FA}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                      user.twoFactorEnabled 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                    }`}
                  >
                    {user.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>

                {/* API Key Management */}
                <ApiKeyPanel />

                {/* Full Audit Log */}
                <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl overflow-hidden mt-8">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-800 bg-gray-50 dark:bg-dark-950 flex justify-between items-center">
                    <h3 className="font-bold text-sm text-black dark:text-white uppercase tracking-wider">Audit Log</h3>
                    <button className="text-xs text-brand-600 hover:underline">Export CSV</button>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-dark-950 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Event</th>
                        <th className="px-6 py-3 font-medium">Actor</th>
                        <th className="px-6 py-3 font-medium">IP Address</th>
                        <th className="px-6 py-3 font-medium">Time</th>
                        <th className="px-6 py-3 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
                      {MOCK_AUDIT_LOGS.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-black dark:text-white">{log.action}</td>
                          <td className="px-6 py-4 text-gray-500">{log.actor}</td>
                          <td className="px-6 py-4 font-mono text-gray-500">{log.ip}</td>
                          <td className="px-6 py-4 text-gray-500">{log.timestamp}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                              log.status === 'Success' 
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'team' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-black text-black dark:text-white">Team & Roles</h1>
                  <button className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold text-sm hover:bg-brand-700 transition-colors flex items-center gap-2">
                    <Icons.Users className="w-4 h-4" /> Invite Member
                  </button>
                </div>

                <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-dark-950 border-b border-gray-200 dark:border-dark-800">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Members</h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-dark-800">
                    {MOCK_TEAM.map(member => (
                      <div key={member.id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-black dark:text-white">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${
                              member.role === 'Owner' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              member.role === 'Admin' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            }`}>
                              {member.role}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 w-20 text-right">
                            {member.status === 'Invited' ? 'Pending' : member.lastActive}
                          </div>
                          <button className="text-gray-400 hover:text-black dark:hover:text-white">
                            <Icons.Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'billing' && (
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-2xl font-black text-black dark:text-white">Billing & Invoices</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-dark-800 rounded-xl bg-gray-50 dark:bg-dark-950">
                      <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center">
                        <div className="flex -space-x-1">
                          <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-sm font-bold dark:text-white">•••• 4242</div>
                        <div className="text-xs text-gray-500">Exp 12/28</div>
                      </div>
                      <button className="text-brand-600 text-xs font-bold hover:underline">Edit</button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Billing Contact</h3>
                    <div className="text-sm dark:text-white font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-500 mt-2">
                      123 Innovation Dr.<br/>
                      Dubai Internet City, UAE
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-dark-950 border-b border-gray-200 dark:border-dark-800">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice History</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="text-gray-500 border-b border-gray-100 dark:border-dark-800">
                      <tr>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Invoice ID</th>
                        <th className="px-6 py-3 font-medium">Items</th>
                        <th className="px-6 py-3 font-medium text-right">Amount</th>
                        <th className="px-6 py-3 font-medium text-right">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
                      {MOCK_INVOICES.map(inv => (
                        <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/50">
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{inv.date}</td>
                          <td className="px-6 py-4 font-mono text-gray-500">{inv.id}</td>
                          <td className="px-6 py-4 text-gray-500">{inv.items} Agent{inv.items > 1 ? 's' : ''}</td>
                          <td className="px-6 py-4 font-bold text-black dark:text-white text-right">${inv.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-brand-500 transition-colors">
                              <Icons.FileText className="w-4 h-4 ml-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView === 'settings' && (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Icons.Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Global Settings Placeholder</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
