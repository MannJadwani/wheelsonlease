import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(phone);
    setLoading(false);
    navigate('/verify-otp');
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col p-6 relative z-10">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-2xl">🚗</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">Wheels on Lease</h1>
              <p className="text-surface-400 text-sm">Any vehicle, anytime</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            Welcome!
          </h2>
          <p className="text-surface-300">
            Enter your phone number to get started
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col"
        >
          <Input
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            icon={<Phone size={20} />}
            autoFocus
          />

          <div className="flex-1" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              disabled={phone.length < 10}
            >
              Continue
              <ArrowRight size={20} className="ml-2" />
            </Button>

            <p className="text-center text-surface-400 text-sm mt-6">
              By continuing, you agree to our{' '}
              <span className="text-brand-400">Terms of Service</span> and{' '}
              <span className="text-brand-400">Privacy Policy</span>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}

