import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  ChevronRight,
  Banknote,
  Clock
} from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';

export function OwnerEarnings() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const earnings = {
    total: 45600,
    thisMonth: 15600,
    lastMonth: 12400,
    pending: 3200,
    available: 12400,
  };

  const transactions = [
    { id: 1, type: 'credit', amount: 1200, description: 'Trip - Swift VXi', date: '10 Dec 2024', status: 'completed' },
    { id: 2, type: 'credit', amount: 2000, description: 'Trip - Swift VXi', date: '8 Dec 2024', status: 'completed' },
    { id: 3, type: 'debit', amount: 350, description: 'Platform Fee', date: '8 Dec 2024', status: 'completed' },
    { id: 4, type: 'credit', amount: 600, description: 'Trip - Swift VXi', date: '5 Dec 2024', status: 'completed' },
    { id: 5, type: 'credit', amount: 1800, description: 'Trip - Swift VXi', date: '2 Dec 2024', status: 'pending' },
  ];

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/owner')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display">Earnings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Total Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="highlight" padding="lg">
            <div className="text-center mb-6">
              <p className="text-surface-400 text-sm mb-1">Total Earnings</p>
              <p className="text-4xl font-bold font-display">₹{earnings.total.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-emerald-400 text-sm">
                <TrendingUp size={16} />
                <span>+25.8% from last month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-800/50 rounded-xl p-3 text-center">
                <p className="text-xs text-surface-400">Available</p>
                <p className="text-lg font-bold text-emerald-400">₹{earnings.available.toLocaleString()}</p>
              </div>
              <div className="bg-surface-800/50 rounded-xl p-3 text-center">
                <p className="text-xs text-surface-400">Pending</p>
                <p className="text-lg font-bold text-amber-400">₹{earnings.pending.toLocaleString()}</p>
              </div>
            </div>

            <Button fullWidth className="mt-4">
              <Banknote size={18} className="mr-2" />
              Withdraw ₹{earnings.available.toLocaleString()}
            </Button>
          </Card>
        </motion.div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-800 text-surface-400'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="default">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-brand-400" />
              <span className="text-sm text-surface-400">Trips</span>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-surface-500">This month</p>
          </Card>
          <Card variant="default">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-brand-400" />
              <span className="text-sm text-surface-400">Avg. Duration</span>
            </div>
            <p className="text-2xl font-bold">1.5</p>
            <p className="text-xs text-surface-500">Days per trip</p>
          </Card>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent Transactions</h2>
            <button className="text-brand-400 text-sm font-medium flex items-center gap-1">
              <Download size={14} />
              Export
            </button>
          </div>

          <Card variant="default" padding="none">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-4 ${
                  index !== transactions.length - 1 ? 'border-b border-surface-800' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  {transaction.type === 'credit' ? (
                    <TrendingUp size={18} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={18} className="text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-surface-400">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  {transaction.status === 'pending' && (
                    <Badge variant="warning" size="sm">Pending</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </Card>
        </div>

        {/* Payout Schedule */}
        <Card variant="default">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Next Payout</h3>
              <p className="text-sm text-surface-400">Every Monday</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-400">₹{earnings.pending.toLocaleString()}</p>
              <p className="text-xs text-surface-400">Dec 16, 2024</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

