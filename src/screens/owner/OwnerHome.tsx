import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  Car, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  Bell,
  ChevronRight,
  MoreVertical,
  Star,
  Eye,
  Power
} from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { vehicleTypeIcons } from '../../data/mockData';

export function OwnerHome() {
  const navigate = useNavigate();
  const { user, myVehicles, bookings } = useApp();

  const ownerBookings = bookings.filter(b => b.ownerId === user?.id);
  const activeBookings = ownerBookings.filter(b => b.status === 'active' || b.status === 'confirmed');

  // Mock earnings data
  const earnings = {
    thisMonth: 15600,
    lastMonth: 12400,
    pending: 3200,
  };

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/5">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-400 text-sm">Owner Dashboard</p>
              <h1 className="text-xl font-bold font-display">{user?.name || 'Owner'} 👋</h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/owner/earnings')}
                className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center hover:bg-surface-700 transition-colors"
              >
                <Wallet size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center hover:bg-surface-700 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Earnings Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="highlight" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">This Month's Earnings</h2>
              <button className="text-brand-400 text-sm font-medium flex items-center gap-1">
                Details <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold font-display">₹{earnings.thisMonth.toLocaleString()}</span>
              <span className="text-emerald-400 text-sm flex items-center gap-1 mb-1">
                <TrendingUp size={14} />
                +25.8%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-800/50 rounded-xl p-3">
                <p className="text-xs text-surface-400">Last Month</p>
                <p className="font-semibold">₹{earnings.lastMonth.toLocaleString()}</p>
              </div>
              <div className="bg-surface-800/50 rounded-xl p-3">
                <p className="text-xs text-surface-400">Pending Payout</p>
                <p className="font-semibold text-amber-400">₹{earnings.pending.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card variant="default" className="text-center">
              <p className="text-2xl font-bold text-brand-400">{myVehicles.length}</p>
              <p className="text-xs text-surface-400">Vehicles</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="default" className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{activeBookings.length}</p>
              <p className="text-xs text-surface-400">Active</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card variant="default" className="text-center">
              <p className="text-2xl font-bold text-amber-400">4.8</p>
              <p className="text-xs text-surface-400">Rating</p>
            </Card>
          </motion.div>
        </div>

        {/* Active Bookings */}
        {activeBookings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Active Bookings</h2>
              <button className="text-brand-400 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {activeBookings.slice(0, 2).map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Card variant="default" padding="sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.vehicle.images[0]}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{booking.vehicle.brand} {booking.vehicle.model}</p>
                        <p className="text-xs text-surface-400">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="success">{booking.status}</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* My Vehicles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">My Vehicles</h2>
            <Button 
              size="sm" 
              onClick={() => navigate('/owner/add-vehicle')}
            >
              <Plus size={16} className="mr-1" />
              Add Vehicle
            </Button>
          </div>

          {myVehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="default" className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-surface-700 flex items-center justify-center mx-auto mb-4">
                  <Car size={32} className="text-surface-500" />
                </div>
                <h3 className="font-semibold mb-2">No vehicles listed</h3>
                <p className="text-sm text-surface-400 mb-4">
                  Add your first vehicle to start earning
                </p>
                <Button onClick={() => navigate('/owner/add-vehicle')}>
                  <Plus size={18} className="mr-2" />
                  Add Your First Vehicle
                </Button>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {myVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Card variant="default" padding="none" className="overflow-hidden">
                    <div className="flex">
                      <div className="w-28 h-28 relative">
                        <img
                          src={vehicle.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-lg">{vehicleTypeIcons[vehicle.type]}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{vehicle.brand} {vehicle.model}</h3>
                            <p className="text-xs text-surface-400">{vehicle.licensePlate}</p>
                          </div>
                          <button className="p-1">
                            <MoreVertical size={18} className="text-surface-500" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-surface-400">
                            <Star size={12} className="text-amber-400" />
                            {vehicle.rating || '-'}
                          </span>
                          <span className="flex items-center gap-1 text-surface-400">
                            <Eye size={12} />
                            {vehicle.totalTrips} trips
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold">₹{vehicle.pricePerDay}/day</span>
                          <Badge variant={vehicle.availability ? 'success' : 'danger'} size="sm">
                            <Power size={10} className="mr-1" />
                            {vehicle.availability ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <OwnerBottomNav />
    </div>
  );
}

function OwnerBottomNav() {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/10 z-30">
      <div className="flex items-center justify-around py-3">
        <button className="flex flex-col items-center gap-1 text-brand-400">
          <Car size={22} />
          <span className="text-xs font-medium">Dashboard</span>
        </button>
        <button 
          onClick={() => navigate('/owner/bookings')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <Calendar size={22} />
          <span className="text-xs">Bookings</span>
        </button>
        <button 
          onClick={() => navigate('/owner/add-vehicle')}
          className="flex flex-col items-center justify-center w-12 h-12 -mt-6 rounded-full gradient-brand shadow-lg shadow-brand-500/30"
        >
          <Plus size={24} />
        </button>
        <button 
          onClick={() => navigate('/owner/earnings')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <Wallet size={22} />
          <span className="text-xs">Earnings</span>
        </button>
        <button 
          onClick={() => navigate('/owner/profile')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-xs font-medium">
            O
          </div>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

