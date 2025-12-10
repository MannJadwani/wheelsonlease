import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole, KYCStatus, KYCData, Vehicle, Booking, Transaction, VehicleType } from '../types';
import { mockVehicles, mockTransactions, mockBookings } from '../data/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  vehicles: Vehicle[];
  myVehicles: Vehicle[];
  bookings: Booking[];
  transactions: Transaction[];
  selectedCity: string;
}

interface AppContextType extends AppState {
  // Auth actions
  login: (phone: string) => void;
  logout: () => void;
  setUserName: (name: string) => void;
  setUserRole: (role: UserRole) => void;
  updateKYCStatus: (status: KYCStatus) => void;
  submitKYC: (data: KYCData) => void;
  
  // Vehicle actions
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'rating' | 'totalTrips'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  
  // Booking actions
  createBooking: (vehicleId: string, startDate: Date, endDate: Date) => void;
  cancelBooking: (bookingId: string) => void;
  
  // Wallet actions
  addMoney: (amount: number) => void;
  
  // Search/Filter
  searchVehicles: (type?: VehicleType, city?: string) => Vehicle[];
  setSelectedCity: (city: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    vehicles: mockVehicles,
    myVehicles: [],
    bookings: mockBookings,
    transactions: mockTransactions,
    selectedCity: 'Mumbai',
  });

  const login = (phone: string) => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      phone,
      name: '',
      role: null,
      kycStatus: 'not_started',
      walletBalance: 0,
      createdAt: new Date(),
    };
    setState(prev => ({ ...prev, user: newUser, isAuthenticated: true }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
      myVehicles: [],
    }));
  };

  const setUserName = (name: string) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, name },
      }));
    }
  };

  const setUserRole = (role: UserRole) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, role },
      }));
    }
  };

  const updateKYCStatus = (kycStatus: KYCStatus) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, kycStatus },
      }));
    }
  };

  const submitKYC = (_data: KYCData) => {
    // Simulate KYC verification
    setTimeout(() => {
      updateKYCStatus('verified');
    }, 2000);
    updateKYCStatus('pending');
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'rating' | 'totalTrips'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: 'v_' + Date.now(),
      ownerId: state.user?.id || '',
      ownerName: state.user?.name || 'Owner',
      ownerAvatar: 'https://i.pravatar.cc/150?img=8',
      ownerRating: 5.0,
      rating: 0,
      totalTrips: 0,
    };
    setState(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle],
      myVehicles: [...prev.myVehicles, newVehicle],
    }));
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setState(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => v.id === id ? { ...v, ...updates } : v),
      myVehicles: prev.myVehicles.map(v => v.id === id ? { ...v, ...updates } : v),
    }));
  };

  const deleteVehicle = (id: string) => {
    setState(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(v => v.id !== id),
      myVehicles: prev.myVehicles.filter(v => v.id !== id),
    }));
  };

  const createBooking = (vehicleId: string, startDate: Date, endDate: Date) => {
    const vehicle = state.vehicles.find(v => v.id === vehicleId);
    if (!vehicle || !state.user) return;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = days * vehicle.pricePerDay;
    const platformFee = Math.round(totalAmount * 0.1);

    const newBooking: Booking = {
      id: 'b_' + Date.now(),
      vehicleId,
      vehicle,
      renterId: state.user.id,
      ownerId: vehicle.ownerId,
      status: vehicle.instantBook ? 'confirmed' : 'pending',
      startDate,
      endDate,
      pickupLocation: vehicle.location.area,
      totalAmount,
      deposit: vehicle.securityDeposit,
      platformFee,
      createdAt: new Date(),
    };

    const newTransaction: Transaction = {
      id: 't_' + Date.now(),
      type: 'debit',
      amount: totalAmount + platformFee,
      description: `Booking - ${vehicle.brand} ${vehicle.model}`,
      date: new Date(),
      status: 'completed',
    };

    setState(prev => ({
      ...prev,
      bookings: [...prev.bookings, newBooking],
      transactions: [newTransaction, ...prev.transactions],
      user: prev.user ? {
        ...prev.user,
        walletBalance: prev.user.walletBalance - (totalAmount + platformFee),
      } : null,
    }));
  };

  const cancelBooking = (bookingId: string) => {
    setState(prev => ({
      ...prev,
      bookings: prev.bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      ),
    }));
  };

  const addMoney = (amount: number) => {
    const newTransaction: Transaction = {
      id: 't_' + Date.now(),
      type: 'credit',
      amount,
      description: 'Wallet Top-up',
      date: new Date(),
      status: 'completed',
    };

    setState(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      user: prev.user ? {
        ...prev.user,
        walletBalance: prev.user.walletBalance + amount,
      } : null,
    }));
  };

  const searchVehicles = (type?: VehicleType, city?: string) => {
    return state.vehicles.filter(v => {
      if (type && v.type !== type) return false;
      if (city && v.location.city !== city) return false;
      return v.availability;
    });
  };

  const setSelectedCity = (city: string) => {
    setState(prev => ({ ...prev, selectedCity: city }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setUserName,
        setUserRole,
        updateKYCStatus,
        submitKYC,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        createBooking,
        cancelBooking,
        addMoney,
        searchVehicles,
        setSelectedCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

