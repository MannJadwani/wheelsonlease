import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Upload, 
  Check,
  Car,
  Bike,
  Zap,
  Truck,
  MapPin,
  IndianRupee,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Button, Card, Input } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import type { VehicleType, FuelType, TransmissionType } from '../../types';

type Step = 'type' | 'details' | 'photos' | 'pricing' | 'documents' | 'review';

export function AddVehicle() {
  const navigate = useNavigate();
  const { addVehicle } = useApp();
  const [step, setStep] = useState<Step>('type');
  const [loading, setLoading] = useState(false);

  // Form state
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [fuelType, setFuelType] = useState<FuelType>('petrol');
  const [transmission, setTransmission] = useState<TransmissionType>('manual');
  const [seats, setSeats] = useState('5');
  const [city, setCity] = useState('Mumbai');
  const [area, setArea] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [deposit, setDeposit] = useState('');
  const [freeKms, setFreeKms] = useState('150');
  const [extraKmCharge, setExtraKmCharge] = useState('10');
  const [photosUploaded, setPhotosUploaded] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);

  const vehicleTypes = [
    { type: 'car' as VehicleType, icon: Car, label: 'Car' },
    { type: 'bike' as VehicleType, icon: Bike, label: 'Bike' },
    { type: 'scooter' as VehicleType, icon: Bike, label: 'Scooter' },
    { type: 'ev' as VehicleType, icon: Zap, label: 'Electric' },
    { type: 'commercial' as VehicleType, icon: Truck, label: 'Commercial' },
  ];

  const steps: Step[] = ['type', 'details', 'photos', 'pricing', 'documents', 'review'];
  const currentStepIndex = steps.indexOf(step);

  const handleNext = () => {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = steps[currentStepIndex - 1];
    if (prevStep) setStep(prevStep);
    else navigate(-1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    addVehicle({
      type: vehicleType,
      brand,
      model,
      year: parseInt(year),
      color,
      licensePlate,
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      ],
      fuelType,
      transmission,
      seats: parseInt(seats),
      features: ['AC', 'Bluetooth', 'Power Windows'],
      pricePerHour: parseInt(pricePerHour),
      pricePerDay: parseInt(pricePerDay),
      securityDeposit: parseInt(deposit),
      freeKmsPerDay: parseInt(freeKms),
      extraKmCharge: parseInt(extraKmCharge),
      location: {
        city,
        area,
        coordinates: { lat: 19.0760, lng: 72.8777 },
      },
      availability: true,
      instantBook: true,
    });

    setLoading(false);
    navigate('/owner');
  };

  const canProceed = () => {
    switch (step) {
      case 'type': return true;
      case 'details': return brand && model && year && color && licensePlate && area;
      case 'photos': return photosUploaded;
      case 'pricing': return pricePerHour && pricePerDay && deposit;
      case 'documents': return documentsUploaded;
      default: return true;
    }
  };

  return (
    <div className="phone-frame min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold font-display">Add Vehicle</h1>
            <p className="text-xs text-surface-400">Step {currentStepIndex + 1} of {steps.length}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mt-3">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i <= currentStepIndex ? 'bg-brand-500' : 'bg-surface-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Vehicle Type */}
          {step === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">What type of vehicle?</h2>
                <p className="text-surface-400">Select the category that best fits your vehicle</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {vehicleTypes.map(({ type, icon: Icon, label }) => (
                  <Card
                    key={type}
                    variant={vehicleType === type ? 'highlight' : 'default'}
                    className={`cursor-pointer transition-all ${
                      vehicleType === type ? 'border-brand-500' : 'hover:border-surface-600'
                    }`}
                    onClick={() => setVehicleType(type)}
                  >
                    <div className="flex flex-col items-center gap-2 py-4">
                      <Icon size={32} className={vehicleType === type ? 'text-brand-400' : 'text-surface-400'} />
                      <span className="font-medium">{label}</span>
                      {vehicleType === type && (
                        <Check size={16} className="text-brand-400" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Vehicle Details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Vehicle Details</h2>
                <p className="text-surface-400">Enter your vehicle information</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Brand"
                    placeholder="e.g., Maruti"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <Input
                    label="Model"
                    placeholder="e.g., Swift"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Year"
                    type="number"
                    placeholder="e.g., 2022"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <Input
                    label="Color"
                    placeholder="e.g., White"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>

                <Input
                  label="License Plate"
                  placeholder="e.g., MH 01 AB 1234"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value as FuelType)}
                      className="w-full bg-surface-800/50 border border-surface-700 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Transmission</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                      className="w-full bg-surface-800/50 border border-surface-700 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                    >
                      <option value="manual">Manual</option>
                      <option value="automatic">Automatic</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Seats"
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />

                <div className="border-t border-surface-800 pt-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-brand-400" />
                    Pickup Location
                  </h3>
                  <div className="space-y-3">
                    <Input
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                      label="Area / Neighborhood"
                      placeholder="e.g., Andheri West"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Photos */}
          {step === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Add Photos</h2>
                <p className="text-surface-400">Upload clear photos of your vehicle</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Front', 'Back', 'Interior', 'Side'].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setPhotosUploaded(true)}
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                      photosUploaded
                        ? 'border-brand-500 bg-brand-500/10'
                        : 'border-surface-700 hover:border-surface-600'
                    }`}
                  >
                    {photosUploaded ? (
                      <CheckCircle2 size={24} className="text-brand-400" />
                    ) : (
                      <Camera size={24} className="text-surface-500" />
                    )}
                    <span className="text-sm text-surface-400">{angle}</span>
                  </button>
                ))}
              </div>

              <Card variant="default" className="text-sm text-surface-400">
                <p className="mb-2 font-medium text-white">Photo tips:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Use good lighting</li>
                  <li>Show the vehicle from multiple angles</li>
                  <li>Include interior shots</li>
                  <li>Make sure the license plate is visible</li>
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Pricing */}
          {step === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Set Your Pricing</h2>
                <p className="text-surface-400">You can update this anytime</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Price per Hour (₹)"
                  type="number"
                  placeholder="e.g., 150"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  icon={<IndianRupee size={18} />}
                />

                <Input
                  label="Price per Day (₹)"
                  type="number"
                  placeholder="e.g., 1200"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  icon={<IndianRupee size={18} />}
                />

                <Input
                  label="Security Deposit (₹)"
                  type="number"
                  placeholder="e.g., 3000"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  icon={<IndianRupee size={18} />}
                />

                <div className="border-t border-surface-800 pt-4">
                  <h3 className="font-semibold mb-3">Distance Policy</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Free KMs/Day"
                      type="number"
                      value={freeKms}
                      onChange={(e) => setFreeKms(e.target.value)}
                    />
                    <Input
                      label="Extra KM Charge (₹)"
                      type="number"
                      value={extraKmCharge}
                      onChange={(e) => setExtraKmCharge(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Card variant="highlight">
                <p className="text-sm">
                  <strong>Tip:</strong> Check similar vehicles in your area to set competitive pricing. You'll earn approximately <span className="text-brand-400 font-semibold">₹{parseInt(pricePerDay || '0') * 20}/month</span> if booked 20 days.
                </p>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Documents */}
          {step === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Upload Documents</h2>
                <p className="text-surface-400">Required for verification</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Registration Certificate (RC)', required: true },
                  { name: 'Insurance', required: true },
                  { name: 'PUC Certificate', required: true },
                  { name: 'Fitness Certificate', required: false },
                ].map((doc) => (
                  <button
                    key={doc.name}
                    onClick={() => setDocumentsUploaded(true)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      documentsUploaded
                        ? 'border-brand-500 bg-brand-500/10'
                        : 'border-surface-700 hover:border-surface-600'
                    }`}
                  >
                    {documentsUploaded ? (
                      <CheckCircle2 size={24} className="text-brand-400" />
                    ) : (
                      <FileText size={24} className="text-surface-500" />
                    )}
                    <div className="flex-1 text-left">
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-surface-400">
                        {doc.required ? 'Required' : 'Optional'}
                      </p>
                    </div>
                    <Upload size={18} className="text-surface-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 6: Review */}
          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Review & Submit</h2>
                <p className="text-surface-400">Make sure everything looks good</p>
              </div>

              <Card variant="highlight">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-surface-400">Vehicle</span>
                    <span className="font-medium">{brand} {model} ({year})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Type</span>
                    <span className="font-medium capitalize">{vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Color</span>
                    <span className="font-medium">{color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">License Plate</span>
                    <span className="font-medium">{licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-400">Location</span>
                    <span className="font-medium">{area}, {city}</span>
                  </div>
                  <div className="border-t border-surface-700 pt-3 flex justify-between">
                    <span className="text-surface-400">Daily Rate</span>
                    <span className="font-semibold text-brand-400">₹{pricePerDay}/day</span>
                  </div>
                </div>
              </Card>

              <Card variant="default" className="text-sm text-surface-400">
                <p>By listing your vehicle, you agree to our <span className="text-brand-400">Terms of Service</span> and <span className="text-brand-400">Vehicle Guidelines</span>.</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-surface-800">
        {step === 'review' ? (
          <Button fullWidth size="lg" loading={loading} onClick={handleSubmit}>
            Submit for Review
          </Button>
        ) : (
          <Button fullWidth size="lg" disabled={!canProceed()} onClick={handleNext}>
            Continue
            <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

