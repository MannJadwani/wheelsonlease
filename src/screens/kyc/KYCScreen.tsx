import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CreditCard, 
  Camera, 
  CheckCircle2, 
  Upload,
  Shield
} from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { useApp } from '../../context/AppContext';

type KYCStep = 'license' | 'selfie' | 'processing' | 'complete';

export function KYCScreen() {
  const [step, setStep] = useState<KYCStep>('license');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const navigate = useNavigate();
  const { submitKYC, updateKYCStatus } = useApp();

  const handleLicenseSubmit = () => {
    if (!licenseNumber || !licenseExpiry || !licenseUploaded) return;
    setStep('selfie');
  };

  const handleSelfieSubmit = async () => {
    if (!selfieUploaded) return;
    setStep('processing');
    
    submitKYC({
      licenseNumber,
      licenseExpiry,
    });

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    updateKYCStatus('verified');
    setStep('complete');
  };

  const handleComplete = () => {
    navigate('/role-select');
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col p-6 relative z-10">
        {/* Header */}
        {step !== 'complete' && step !== 'processing' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => step === 'license' ? navigate(-1) : setStep('license')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <div className="flex gap-1.5">
                <div className={`flex-1 h-1 rounded-full ${step === 'license' || step === 'selfie' ? 'bg-brand-500' : 'bg-surface-700'}`} />
                <div className={`flex-1 h-1 rounded-full ${step === 'selfie' ? 'bg-brand-500' : 'bg-surface-700'}`} />
                <div className="flex-1 h-1 bg-surface-700 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* License Step */}
          {step === 'license' && (
            <motion.div
              key="license"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col mt-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2 font-display">
                Verify your license
              </h2>
              <p className="text-surface-300 mb-8">
                We need your driving license to verify your eligibility
              </p>

              <Card variant="highlight" className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                    <Shield size={20} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Your data is secure</p>
                    <p className="text-xs text-surface-400">Encrypted & never shared</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    License Number
                  </label>
                  <div className="relative">
                    <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input
                      type="text"
                      placeholder="e.g., MH01 20190000123"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                      className="w-full bg-surface-800/50 border border-surface-700 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={licenseExpiry}
                    onChange={(e) => setLicenseExpiry(e.target.value)}
                    className="w-full bg-surface-800/50 border border-surface-700 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    Upload License Photo
                  </label>
                  <button
                    onClick={() => setLicenseUploaded(true)}
                    className={`w-full p-6 border-2 border-dashed rounded-2xl transition-all ${
                      licenseUploaded 
                        ? 'border-brand-500 bg-brand-500/10' 
                        : 'border-surface-700 hover:border-surface-600'
                    }`}
                  >
                    {licenseUploaded ? (
                      <div className="flex flex-col items-center gap-2 text-brand-400">
                        <CheckCircle2 size={32} />
                        <span className="text-sm font-medium">License uploaded</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-surface-400">
                        <Upload size={32} />
                        <span className="text-sm">Tap to upload front side</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1" />

              <Button
                fullWidth
                size="lg"
                disabled={!licenseNumber || !licenseExpiry || !licenseUploaded}
                onClick={handleLicenseSubmit}
              >
                Continue
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Selfie Step */}
          {step === 'selfie' && (
            <motion.div
              key="selfie"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col mt-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2 font-display">
                Take a selfie
              </h2>
              <p className="text-surface-300 mb-8">
                We'll match this with your license photo to verify your identity
              </p>

              <div className="flex-1 flex flex-col items-center justify-center">
                <button
                  onClick={() => setSelfieUploaded(true)}
                  className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all ${
                    selfieUploaded 
                      ? 'border-brand-500 bg-brand-500/20' 
                      : 'border-surface-700 border-dashed hover:border-surface-600'
                  }`}
                >
                  {selfieUploaded ? (
                    <div className="text-center">
                      <CheckCircle2 size={48} className="text-brand-400 mx-auto mb-2" />
                      <span className="text-sm text-brand-400 font-medium">Photo captured</span>
                    </div>
                  ) : (
                    <div className="text-center text-surface-400">
                      <Camera size={48} className="mx-auto mb-2" />
                      <span className="text-sm">Tap to take selfie</span>
                    </div>
                  )}
                </button>

                <div className="mt-8 space-y-2 text-center text-sm text-surface-400">
                  <p>• Look straight at the camera</p>
                  <p>• Ensure good lighting</p>
                  <p>• Remove glasses if wearing</p>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                disabled={!selfieUploaded}
                onClick={handleSelfieSubmit}
              >
                Verify Identity
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-brand-500/30 border-t-brand-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield size={32} className="text-brand-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 font-display">Verifying your identity</h2>
              <p className="text-surface-400 text-center">This usually takes a few seconds...</p>
            </motion.div>
          )}

          {/* Complete Step */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
              >
                <CheckCircle2 size={48} className="text-emerald-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2 font-display">You're verified!</h2>
              <p className="text-surface-400 text-center mb-8">Your identity has been successfully verified</p>
              
              <Button fullWidth size="lg" onClick={handleComplete}>
                Continue to App
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

