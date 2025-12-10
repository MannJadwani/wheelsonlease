import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, ArrowRight } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function OnboardingScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setUserName(name);
    setLoading(false);
    navigate('/kyc');
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col p-6 relative z-10">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1.5 mt-2"
        >
          <div className="flex-1 h-1 bg-brand-500 rounded-full" />
          <div className="flex-1 h-1 bg-surface-700 rounded-full" />
          <div className="flex-1 h-1 bg-surface-700 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-display">
            Tell us about yourself
          </h2>
          <p className="text-surface-300">
            We need a few details to personalize your experience
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4"
        >
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={20} />}
            autoFocus
          />

          <Input
            label="Email (Optional)"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={20} />}
          />

          <div className="flex-1" />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            disabled={!name.trim()}
          >
            Continue
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </motion.form>
      </div>
    </div>
  );
}

