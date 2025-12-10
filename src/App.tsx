import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import {
  LoginScreen,
  OTPScreen,
  OnboardingScreen,
  KYCScreen,
  RoleSelectScreen,
  RenterHome,
  VehicleDetails,
  MyBookings,
  RenterProfile,
  OwnerHome,
  AddVehicle,
  OwnerEarnings,
  OwnerProfile,
  WalletScreen,
} from './screens';
import './App.css';

function AppRoutes() {
  const { isAuthenticated, user } = useApp();

  // If not authenticated, show auth flow
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/verify-otp" element={<OTPScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // If authenticated but no name set, show onboarding
  if (!user?.name) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // If authenticated but KYC not done, show KYC
  if (user?.kycStatus === 'not_started') {
    return (
      <Routes>
        <Route path="/kyc" element={<KYCScreen />} />
        <Route path="*" element={<Navigate to="/kyc" replace />} />
      </Routes>
    );
  }

  // If KYC pending/processing
  if (user?.kycStatus === 'pending') {
    return (
      <Routes>
        <Route path="/kyc" element={<KYCScreen />} />
        <Route path="*" element={<Navigate to="/kyc" replace />} />
      </Routes>
    );
  }

  // If authenticated but no role selected, show role selection
  if (!user?.role) {
    return (
      <Routes>
        <Route path="/role-select" element={<RoleSelectScreen />} />
        <Route path="*" element={<Navigate to="/role-select" replace />} />
      </Routes>
    );
  }

  // Full app access
  return (
    <Routes>
      {/* Renter Routes */}
      <Route path="/renter" element={<RenterHome />} />
      <Route path="/renter/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/renter/bookings" element={<MyBookings />} />
      <Route path="/renter/profile" element={<RenterProfile />} />
      <Route path="/renter/wallet" element={<WalletScreen />} />

      {/* Owner Routes */}
      <Route path="/owner" element={<OwnerHome />} />
      <Route path="/owner/add-vehicle" element={<AddVehicle />} />
      <Route path="/owner/earnings" element={<OwnerEarnings />} />
      <Route path="/owner/profile" element={<OwnerProfile />} />

      {/* Shared Routes */}
      <Route path="/wallet" element={<WalletScreen />} />

      {/* Role Selection (for switching) */}
      <Route path="/role-select" element={<RoleSelectScreen />} />

      {/* Default redirect based on role */}
      <Route
        path="*"
        element={
          <Navigate to={user?.role === 'owner' ? '/owner' : '/renter'} replace />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-surface-950">
          <AppRoutes />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
