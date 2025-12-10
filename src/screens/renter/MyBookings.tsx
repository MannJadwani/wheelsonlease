import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight,
  Car
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import type { BookingStatus } from '../../types';

export function MyBookings() {
  const navigate = useNavigate();
  const { bookings } = useApp();

  const statusColors: Record<BookingStatus, { bg: string; text: string }> = {
    pending: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
    confirmed: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
    completed: { bg: 'bg-surface-700', text: 'text-surface-300' },
    cancelled: { bg: 'bg-red-500/20', text: 'text-red-400' },
  };

  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="phone-frame min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/renter')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display">My Bookings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-surface-800 flex items-center justify-center mb-4">
              <Car size={40} className="text-surface-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
            <p className="text-surface-400 text-center mb-6">
              Start exploring vehicles to make your first booking
            </p>
            <button
              onClick={() => navigate('/renter')}
              className="text-brand-400 font-medium"
            >
              Browse Vehicles
            </button>
          </motion.div>
        ) : (
          <>
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-surface-400 mb-3">ACTIVE</h2>
                <div className="space-y-3">
                  {activeBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        variant="highlight"
                        padding="none"
                        className="overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/renter/booking/${booking.id}`)}
                      >
                        <div className="flex">
                          <img
                            src={booking.vehicle.images[0]}
                            alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                            className="w-28 h-28 object-cover"
                          />
                          <div className="flex-1 p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">
                                  {booking.vehicle.brand} {booking.vehicle.model}
                                </h3>
                                <Badge 
                                  variant={booking.status === 'active' ? 'success' : 'brand'}
                                  size="sm"
                                >
                                  {booking.status}
                                </Badge>
                              </div>
                              <ChevronRight size={18} className="text-surface-500" />
                            </div>

                            <div className="space-y-1 text-xs text-surface-400">
                              <div className="flex items-center gap-2">
                                <Calendar size={12} />
                                <span>
                                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={12} />
                                <span>{booking.pickupLocation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-surface-400 mb-3">PAST</h2>
                <div className="space-y-3">
                  {pastBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        variant="default"
                        padding="none"
                        className="overflow-hidden cursor-pointer opacity-80"
                        onClick={() => navigate(`/renter/booking/${booking.id}`)}
                      >
                        <div className="flex">
                          <img
                            src={booking.vehicle.images[0]}
                            alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                            className="w-24 h-24 object-cover grayscale"
                          />
                          <div className="flex-1 p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">
                                  {booking.vehicle.brand} {booking.vehicle.model}
                                </h3>
                                <span className={`text-xs px-2 py-0.5 rounded ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <ChevronRight size={18} className="text-surface-500" />
                            </div>

                            <div className="flex items-center gap-2 text-xs text-surface-400">
                              <Clock size={12} />
                              <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

