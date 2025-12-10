import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings2,
  Users,
  Shield,
  Zap,
  Check,
  ChevronRight,
  Clock
} from 'lucide-react';
import { Button, Card, Badge, BottomSheet } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles } = useApp();
  const [showBooking, setShowBooking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="phone-frame min-h-screen flex items-center justify-center">
        <p>Vehicle not found</p>
      </div>
    );
  }

  const fuelTypeLabels: Record<string, string> = {
    petrol: 'Petrol',
    diesel: 'Diesel',
    electric: 'Electric',
    hybrid: 'Hybrid',
    none: 'N/A',
  };

  return (
    <div className="phone-frame min-h-screen pb-28">
      {/* Image Gallery */}
      <div className="relative h-72">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={vehicle.images[currentImageIndex]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
        
        {/* Header buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-colors ${liked ? 'text-red-500' : ''}`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {vehicle.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-10 space-y-4">
        {/* Title Card */}
        <Card variant="glass" padding="lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold font-display text-white">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-surface-400">{vehicle.year} • {vehicle.color}</p>
            </div>
            <div className="flex items-center gap-1 bg-surface-700/50 px-2.5 py-1 rounded-lg">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold">{vehicle.rating}</span>
              <span className="text-surface-400 text-sm">({vehicle.totalTrips})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-surface-400">
            <MapPin size={16} />
            <span>{vehicle.location.area}, {vehicle.location.city}</span>
          </div>

          {vehicle.instantBook && (
            <div className="mt-3">
              <Badge variant="brand">
                <Zap size={12} className="mr-1" />
                Instant Book Available
              </Badge>
            </div>
          )}
        </Card>

        {/* Quick Specs */}
        <div className="grid grid-cols-4 gap-2">
          <Card variant="default" padding="sm" className="text-center">
            <Fuel size={18} className="mx-auto text-brand-400 mb-1" />
            <p className="text-xs text-surface-400">Fuel</p>
            <p className="text-sm font-medium">{fuelTypeLabels[vehicle.fuelType]}</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Settings2 size={18} className="mx-auto text-brand-400 mb-1" />
            <p className="text-xs text-surface-400">Trans.</p>
            <p className="text-sm font-medium capitalize">{vehicle.transmission}</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Users size={18} className="mx-auto text-brand-400 mb-1" />
            <p className="text-xs text-surface-400">Seats</p>
            <p className="text-sm font-medium">{vehicle.seats}</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Shield size={18} className="mx-auto text-brand-400 mb-1" />
            <p className="text-xs text-surface-400">Trips</p>
            <p className="text-sm font-medium">{vehicle.totalTrips}</p>
          </Card>
        </div>

        {/* Features */}
        <Card variant="default">
          <h3 className="font-semibold mb-3">Features</h3>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((feature, index) => (
              <span
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-700/50 rounded-full text-sm"
              >
                <Check size={14} className="text-brand-400" />
                {feature}
              </span>
            ))}
          </div>
        </Card>

        {/* Pricing */}
        <Card variant="default">
          <h3 className="font-semibold mb-3">Pricing</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-surface-400">Hourly rate</span>
              <span className="font-medium">₹{vehicle.pricePerHour}/hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-400">Daily rate</span>
              <span className="font-medium">₹{vehicle.pricePerDay}/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-400">Free kms/day</span>
              <span className="font-medium">{vehicle.freeKmsPerDay} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-400">Extra km charge</span>
              <span className="font-medium">₹{vehicle.extraKmCharge}/km</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-surface-700">
              <span className="text-surface-400">Security deposit</span>
              <span className="font-semibold text-amber-400">₹{vehicle.securityDeposit}</span>
            </div>
          </div>
        </Card>

        {/* Owner */}
        <Card variant="default">
          <h3 className="font-semibold mb-3">Hosted by</h3>
          <div className="flex items-center gap-3">
            <img
              src={vehicle.ownerAvatar}
              alt={vehicle.ownerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{vehicle.ownerName}</p>
              <div className="flex items-center gap-1 text-sm text-surface-400">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                {vehicle.ownerRating} rating
              </div>
            </div>
            <ChevronRight size={20} className="text-surface-500" />
          </div>
        </Card>

        {/* Policies */}
        <Card variant="default">
          <h3 className="font-semibold mb-3">Policies</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <Clock size={16} className="text-surface-400 shrink-0 mt-0.5" />
              <p className="text-surface-300">
                Free cancellation up to 24 hours before pickup
              </p>
            </div>
            <div className="flex gap-3">
              <Fuel size={16} className="text-surface-400 shrink-0 mt-0.5" />
              <p className="text-surface-300">
                Return with same fuel level as pickup
              </p>
            </div>
            <div className="flex gap-3">
              <Shield size={16} className="text-surface-400 shrink-0 mt-0.5" />
              <p className="text-surface-300">
                Insurance included in the rental
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">₹{vehicle.pricePerDay}</span>
            <span className="text-surface-400">/day</span>
          </div>
          <Button size="lg" onClick={() => setShowBooking(true)}>
            <Calendar size={18} className="mr-2" />
            Book Now
          </Button>
        </div>
      </div>

      {/* Booking Sheet */}
      <BottomSheet
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book this vehicle"
      >
        <BookingForm vehicle={vehicle} onClose={() => setShowBooking(false)} />
      </BottomSheet>
    </div>
  );
}

function BookingForm({ vehicle, onClose }: { vehicle: any; onClose: () => void }) {
  const navigate = useNavigate();
  const { createBooking, user } = useApp();
  const [loading, setLoading] = useState(false);
  
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  const totalAmount = vehicle.pricePerDay;
  const platformFee = Math.round(totalAmount * 0.1);

  const handleBook = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    createBooking(vehicle.id, startDate, endDate);
    setLoading(false);
    onClose();
    navigate('/renter/bookings');
  };

  return (
    <div className="p-6 space-y-4">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-surface-400 block mb-1">Pickup</label>
          <Card variant="default" padding="sm">
            <p className="font-medium">{startDate.toLocaleDateString()}</p>
            <p className="text-sm text-surface-400">10:00 AM</p>
          </Card>
        </div>
        <div>
          <label className="text-sm text-surface-400 block mb-1">Return</label>
          <Card variant="default" padding="sm">
            <p className="font-medium">{endDate.toLocaleDateString()}</p>
            <p className="text-sm text-surface-400">10:00 AM</p>
          </Card>
        </div>
      </div>

      {/* Summary */}
      <Card variant="highlight">
        <h4 className="font-semibold mb-3">Price Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-surface-400">1 day rental</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-surface-400">Platform fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-surface-400">Security deposit</span>
            <span className="text-amber-400">₹{vehicle.securityDeposit}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-surface-700 font-semibold">
            <span>Total</span>
            <span className="text-brand-400">₹{totalAmount + platformFee + vehicle.securityDeposit}</span>
          </div>
        </div>
      </Card>

      {/* Wallet Balance */}
      <div className="flex items-center justify-between p-3 bg-surface-800/50 rounded-xl">
        <span className="text-surface-400">Wallet Balance</span>
        <span className="font-semibold text-brand-400">₹{user?.walletBalance || 0}</span>
      </div>

      <Button fullWidth size="lg" loading={loading} onClick={handleBook}>
        Confirm Booking
      </Button>

      <p className="text-xs text-center text-surface-500">
        By booking, you agree to our cancellation policy
      </p>
    </div>
  );
}

