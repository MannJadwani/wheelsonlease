import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Smartphone,
  Building2,
  Gift,
  Shield,
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check
} from 'lucide-react';
import { Card, Badge, Button, BottomSheet, Input } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function WalletScreen() {
  const navigate = useNavigate();
  const { user, transactions, addMoney } = useApp();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = async () => {
    if (!amount || parseInt(amount) < 100) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addMoney(parseInt(amount));
    setLoading(false);
    setShowAddMoney(false);
    setAmount('');
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('wheelsonlease@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display">Wallet</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card 
            variant="glass" 
            padding="lg"
            className="relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={20} className="text-brand-400" />
                <span className="text-surface-400">Available Balance</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold font-display">₹{(user?.walletBalance || 0).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button fullWidth onClick={() => setShowAddMoney(true)}>
                  <Plus size={18} className="mr-2" />
                  Add Money
                </Button>
                <Button variant="secondary" fullWidth>
                  <ArrowUpRight size={18} className="mr-2" />
                  Transfer
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: CreditCard, label: 'Cards', color: 'text-blue-400' },
            { icon: Smartphone, label: 'UPI', color: 'text-emerald-400' },
            { icon: Building2, label: 'Bank', color: 'text-purple-400' },
            { icon: Gift, label: 'Offers', color: 'text-amber-400' },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-800 flex items-center justify-center hover:bg-surface-700 transition-colors">
                <item.icon size={22} className={item.color} />
              </div>
              <span className="text-xs text-surface-400">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="highlight" className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center">
                <Gift size={24} className="text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Refer & Earn ₹500</p>
                <p className="text-sm text-surface-400">Invite friends and get rewards</p>
              </div>
              <ChevronRight size={20} className="text-surface-500" />
            </div>
          </Card>
        </motion.div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent Transactions</h2>
            <button className="text-brand-400 text-sm font-medium">View All</button>
          </div>

          {transactions.length === 0 ? (
            <Card variant="default" className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-surface-700 flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} className="text-surface-500" />
              </div>
              <h3 className="font-semibold mb-2">No transactions yet</h3>
              <p className="text-sm text-surface-400">Add money to start using your wallet</p>
            </Card>
          ) : (
            <Card variant="default" padding="none">
              {transactions.slice(0, 5).map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-4 ${
                    index !== Math.min(transactions.length - 1, 4) ? 'border-b border-surface-800' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft size={18} className="text-emerald-400" />
                    ) : (
                      <ArrowUpRight size={18} className="text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-surface-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                    {transaction.status === 'pending' && (
                      <Badge variant="warning" size="sm">Pending</Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </Card>
          )}
        </div>

        {/* Security Note */}
        <Card variant="default" className="text-sm">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Secure Payments</p>
              <p className="text-surface-400">All transactions are encrypted and secured by industry-standard protocols.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Money Bottom Sheet */}
      <BottomSheet
        isOpen={showAddMoney}
        onClose={() => setShowAddMoney(false)}
        title="Add Money"
      >
        <div className="p-6 space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-2">
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-surface-400">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-800/50 border border-surface-700 rounded-2xl pl-12 pr-4 py-4 text-2xl font-bold text-white placeholder-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              />
            </div>
            {parseInt(amount) > 0 && parseInt(amount) < 100 && (
              <p className="mt-2 text-sm text-red-400">Minimum amount is ₹100</p>
            )}
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-2">
            {quickAmounts.map(quickAmount => (
              <button
                key={quickAmount}
                onClick={() => setAmount(String(quickAmount))}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  amount === String(quickAmount)
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
              >
                ₹{quickAmount}
              </button>
            ))}
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-sm font-medium text-surface-200 mb-3">
              Pay via
            </label>
            <div className="space-y-2">
              <Card 
                variant="highlight" 
                padding="sm"
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Smartphone size={20} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">UPI</p>
                    <p className="text-xs text-surface-400">Pay with any UPI app</p>
                  </div>
                  <Check size={18} className="text-brand-400" />
                </div>
              </Card>

              <Card variant="default" padding="sm" className="cursor-pointer opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CreditCard size={20} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-xs text-surface-400">Coming soon</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* UPI ID */}
          <div className="flex items-center gap-2 p-3 bg-surface-800/50 rounded-xl">
            <span className="text-surface-400 text-sm">UPI ID:</span>
            <span className="font-mono text-sm flex-1">wheelsonlease@upi</span>
            <button
              onClick={handleCopyUPI}
              className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
            >
              {copied ? (
                <Check size={16} className="text-brand-400" />
              ) : (
                <Copy size={16} className="text-surface-400" />
              )}
            </button>
          </div>

          <Button 
            fullWidth 
            size="lg" 
            loading={loading}
            disabled={!amount || parseInt(amount) < 100}
            onClick={handleAddMoney}
          >
            Add ₹{amount || '0'}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}

