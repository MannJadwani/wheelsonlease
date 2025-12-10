export type VehicleType = 'car' | 'bike' | 'scooter' | 'ev' | 'commercial' | 'cycle';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'none';
export type TransmissionType = 'manual' | 'automatic' | 'none';
export type UserRole = 'renter' | 'owner' | null;
export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'not_started';
export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  kycStatus: KYCStatus;
  walletBalance: number;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  ownerRating: number;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  images: string[];
  fuelType: FuelType;
  transmission: TransmissionType;
  seats: number;
  features: string[];
  pricePerHour: number;
  pricePerDay: number;
  securityDeposit: number;
  freeKmsPerDay: number;
  extraKmCharge: number;
  rating: number;
  totalTrips: number;
  location: {
    city: string;
    area: string;
    coordinates: { lat: number; lng: number };
  };
  availability: boolean;
  instantBook: boolean;
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  renterId: string;
  ownerId: string;
  status: BookingStatus;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  totalAmount: number;
  deposit: number;
  platformFee: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface KYCData {
  licenseNumber: string;
  licenseExpiry: string;
  licenseImage?: string;
  selfieImage?: string;
  panNumber?: string;
  aadhaarNumber?: string;
}

