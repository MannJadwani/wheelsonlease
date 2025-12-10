import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Wallet,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
  Star,
  RefreshCw
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function RenterProfile() {
  const navigate = useNavigate();
  const { user, logout, setUserRole } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchRole = () => {
    setUserRole('owner');
    navigate('/owner');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', onClick: () => {} },
    { icon: Shield, label: 'KYC Status', badge: user?.kycStatus, onClick: () => {} },
    { icon: Wallet, label: 'Wallet & Payments', onClick: () => navigate('/renter/wallet') },
    { icon: FileText, label: 'Documents', onClick: () => {} },
    { icon: Star, label: 'My Reviews', onClick: () => {} },
    { icon: Settings, label: 'Settings', onClick: () => {} },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => {} },
  ];

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/renter')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display">Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="highlight" padding="lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-brand-400">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                <div className="flex items-center gap-2 text-surface-400">
                  <Phone size={14} />
                  <span>+91 {user?.phone}</span>
                </div>
              </div>
              <Badge variant="brand">Renter</Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-700/50 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-surface-400">Trips</p>
              </div>
              <div>
                <p className="text-xl font-bold">0</p>
                <p className="text-xs text-surface-400">Reviews</p>
              </div>
              <div>
                <p className="text-xl font-bold">-</p>
                <p className="text-xs text-surface-400">Rating</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Switch Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            variant="default" 
            className="cursor-pointer hover:border-accent-500/50 transition-all"
            onClick={handleSwitchRole}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                <RefreshCw size={20} className="text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Switch to Owner Mode</p>
                <p className="text-sm text-surface-400">List your vehicles and earn</p>
              </div>
              <ChevronRight size={20} className="text-surface-500" />
            </div>
          </Card>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="default" padding="none">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-800/50 transition-colors border-b border-surface-800 last:border-0"
              >
                <item.icon size={20} className="text-surface-400" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.badge === 'verified' ? 'success' : 'warning'} size="sm">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight size={18} className="text-surface-500" />
              </button>
            ))}
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            variant="default" 
            className="cursor-pointer hover:border-red-500/50 transition-all"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3 text-red-400">
              <LogOut size={20} />
              <span className="font-medium">Log Out</span>
            </div>
          </Card>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-surface-600 text-sm pt-4">
          Wheels on Lease v1.0.0
        </p>
      </div>
    </div>
  );
}

