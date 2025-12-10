import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { user } = useApp();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    navigate('/onboarding');
  };

  const handleResend = () => {
    setTimer(30);
    // Resend OTP logic
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col p-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-display">
            Verify your number
          </h2>
          <p className="text-surface-300">
            We've sent a 6-digit code to{' '}
            <span className="text-white font-medium">+91 {user?.phone}</span>
          </p>
        </motion.div>

        {/* OTP Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 justify-center mb-8"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-12 h-14 text-center text-xl font-semibold
                bg-surface-800/50 border rounded-xl
                focus:outline-none focus:ring-2 focus:ring-brand-500/50
                transition-all duration-200
                ${digit ? 'border-brand-500 text-white' : 'border-surface-700 text-surface-400'}
              `}
            />
          ))}
        </motion.div>

        {/* Resend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          {timer > 0 ? (
            <p className="text-surface-400">
              Resend code in <span className="text-white font-medium">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="flex items-center gap-2 mx-auto text-brand-400 hover:text-brand-300 transition-colors"
            >
              <RotateCcw size={16} />
              Resend OTP
            </button>
          )}
        </motion.div>

        <div className="flex-1" />

        {/* Verify Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            fullWidth
            size="lg"
            loading={loading}
            disabled={!isComplete}
            onClick={handleSubmit}
          >
            Verify & Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

