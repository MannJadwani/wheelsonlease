import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter,
  Star,
  Zap,
  ChevronRight,
  Bell,
  Wallet
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { vehicleTypeIcons, vehicleTypeLabels } from '../../data/mockData';
import type { VehicleType } from '../../types';

export function RenterHome() {
  const [selectedType, setSelectedType] = useState<VehicleType | 'all'>('all');
  const navigate = useNavigate();
  const { vehicles, user, selectedCity } = useApp();

  const filteredVehicles = selectedType === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.type === selectedType);

  const vehicleTypes: (VehicleType | 'all')[] = ['all', 'car', 'bike', 'scooter', 'ev', 'commercial'];

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/5">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-surface-400 text-sm">Good morning</p>
              <h1 className="text-xl font-bold font-display">{user?.name || 'there'} 👋</h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/renter/wallet')}
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

          {/* Location & Date */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center gap-2 bg-surface-800/50 rounded-xl px-3 py-2.5 hover:bg-surface-800 transition-colors">
              <MapPin size={18} className="text-brand-400" />
              <span className="text-sm font-medium">{selectedCity}</span>
            </button>
            <button className="flex-1 flex items-center gap-2 bg-surface-800/50 rounded-xl px-3 py-2.5 hover:bg-surface-800 transition-colors">
              <Calendar size={18} className="text-brand-400" />
              <span className="text-sm font-medium">Today</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <button 
            onClick={() => navigate('/renter/search')}
            className="w-full flex items-center gap-3 bg-surface-800/50 border border-surface-700 rounded-2xl px-4 py-3 hover:bg-surface-800 transition-colors"
          >
            <Search size={20} className="text-surface-400" />
            <span className="text-surface-400">Search cars, bikes, scooters...</span>
            <div className="ml-auto">
              <Filter size={18} className="text-surface-500" />
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 stagger-children">
        {/* Vehicle Type Filters */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2">
            {vehicleTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
              >
                {type !== 'all' && <span>{vehicleTypeIcons[type]}</span>}
                <span className="text-sm font-medium">
                  {type === 'all' ? 'All' : vehicleTypeLabels[type]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="highlight" padding="md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                <Zap size={20} className="text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{vehicles.length}</p>
                <p className="text-xs text-surface-400">Vehicles available</p>
              </div>
            </div>
          </Card>
          <Card variant="default" padding="md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                <Star size={20} className="text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">4.8</p>
                <p className="text-xs text-surface-400">Avg. rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Vehicles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Available Now</h2>
            <button className="text-brand-400 text-sm font-medium flex items-center gap-1">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {filteredVehicles.slice(0, 6).map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  variant="default"
                  padding="none"
                  className="overflow-hidden cursor-pointer hover:border-surface-700 transition-all"
                  onClick={() => navigate(`/renter/vehicle/${vehicle.id}`)}
                >
                  <div className="flex">
                    <div className="w-32 h-32 relative shrink-0">
                      <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                      {vehicle.instantBook && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="brand" size="sm">
                            <Zap size={10} className="mr-1" /> Instant
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-3 flex flex-col">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-white">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-xs text-surface-400">
                            {vehicle.year} • {vehicle.transmission}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-surface-700/50 px-2 py-0.5 rounded">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-medium">{vehicle.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-surface-400 mt-1">
                        <MapPin size={12} />
                        <span>{vehicle.location.area}</span>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          <span className="text-lg font-bold text-white">₹{vehicle.pricePerDay}</span>
                          <span className="text-xs text-surface-400">/day</span>
                        </div>
                        <span className="text-xs text-surface-500">
                          {vehicle.freeKmsPerDay} km included
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/10 z-30">
      <div className="flex items-center justify-around py-3">
        <button className="flex flex-col items-center gap-1 text-brand-400">
          <Search size={22} />
          <span className="text-xs font-medium">Explore</span>
        </button>
        <button 
          onClick={() => navigate('/renter/bookings')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <Calendar size={22} />
          <span className="text-xs">Bookings</span>
        </button>
        <button 
          onClick={() => navigate('/renter/wallet')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <Wallet size={22} />
          <span className="text-xs">Wallet</span>
        </button>
        <button 
          onClick={() => navigate('/renter/profile')}
          className="flex flex-col items-center gap-1 text-surface-400 hover:text-white transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-xs font-medium">
            {/* User initial */}
            M
          </div>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

