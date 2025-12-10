import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Car, KeyRound, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../components/ui';
import { useApp } from '../context/AppContext';

export function RoleSelectScreen() {
  const navigate = useNavigate();
  const { setUserRole, user } = useApp();

  const handleRoleSelect = (role: 'renter' | 'owner') => {
    setUserRole(role);
    navigate(role === 'renter' ? '/renter' : '/owner');
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-60 h-60 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 mb-12"
        >
          <div className="flex items-center gap-2 text-brand-400 mb-4">
            <Sparkles size={20} />
            <span className="text-sm font-medium">Welcome, {user?.name || 'there'}!</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 font-display">
            How would you like to use Wheels on Lease?
          </h2>
          <p className="text-surface-300">
            You can switch between modes anytime from settings
          </p>
        </motion.div>

        <div className="space-y-4">
          {/* Renter Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              variant="default"
              padding="lg"
              className="cursor-pointer hover:border-brand-500/50 transition-all group"
              onClick={() => handleRoleSelect('renter')}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center shrink-0">
                  <Car size={28} className="text-brand-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 font-display">
                    I want to rent
                  </h3>
                  <p className="text-surface-400 text-sm">
                    Browse and book cars, bikes, scooters, EVs, and more for your trips
                  </p>
                </div>
                <ArrowRight 
                  size={20} 
                  className="text-surface-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all mt-3" 
                />
              </div>

              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-surface-700/50 rounded-full text-xs text-surface-300">🚗 Cars</span>
                <span className="px-3 py-1 bg-surface-700/50 rounded-full text-xs text-surface-300">🏍️ Bikes</span>
                <span className="px-3 py-1 bg-surface-700/50 rounded-full text-xs text-surface-300">⚡ EVs</span>
                <span className="px-3 py-1 bg-surface-700/50 rounded-full text-xs text-surface-300">+3</span>
              </div>
            </Card>
          </motion.div>

          {/* Owner Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              variant="default"
              padding="lg"
              className="cursor-pointer hover:border-accent-500/50 transition-all group"
              onClick={() => handleRoleSelect('owner')}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent-500/20 flex items-center justify-center shrink-0">
                  <KeyRound size={28} className="text-accent-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 font-display">
                    I want to list my vehicle
                  </h3>
                  <p className="text-surface-400 text-sm">
                    Monetize your vehicle by listing it for others to rent
                  </p>
                </div>
                <ArrowRight 
                  size={20} 
                  className="text-surface-600 group-hover:text-accent-400 group-hover:translate-x-1 transition-all mt-3" 
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/32?img=1" className="w-6 h-6 rounded-full border-2 border-surface-850" alt="" />
                  <img src="https://i.pravatar.cc/32?img=2" className="w-6 h-6 rounded-full border-2 border-surface-850" alt="" />
                  <img src="https://i.pravatar.cc/32?img=3" className="w-6 h-6 rounded-full border-2 border-surface-850" alt="" />
                </div>
                <span className="text-xs text-surface-400">Join 5,000+ owners earning ₹15k+/month</span>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex-1" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-surface-500 text-sm"
        >
          Not sure? Start as a renter and switch anytime!
        </motion.p>
      </div>
    </div>
  );
}

