import { useState } from 'react';
import { insertCar } from '../../service/carService';
import { StatusEnums } from '../../enums/CarEnums';
import { useLoader } from '../../hooks/useLoader';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import toast from 'react-hot-toast';
import { MainLayout } from '@/components/Layout/SideBar';

const AddCar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loading = useLoader(isLoading);
    const [carData, setCarData] = useState({
        vin: '',
        origin: '',
        destination: '',
        make: '',
        model: '',
        year: 0,
        status: StatusEnums.PICKUP
    });
    
    const handleChange = (field: string, value: string) => {
        setCarData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await insertCar(carData);
            toast.success("Car added successfully!");

            // Reset form
            setCarData({
                vin: '',
                origin: '',
                destination: '',
                make: '',
                model: '',
                year: 0,
                status: StatusEnums.PICKUP
            });
        } catch (err) {
            toast.error("Error! Please try again later");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <MainLayout>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-amber-400">
                    <div className="space-y-6">
                        {/* VIN Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                VIN Car
                            </label>
                            <input
                                type="text"
                                placeholder="Type vin here..."
                                value={carData.vin}
                                onChange={(e) => handleChange('vin', e.target.value)}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Origin Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                📍 Origin
                            </label>
                            <input
                                type="text"
                                placeholder="Type origin here..."
                                value={carData.origin}
                                onChange={(e) => handleChange('origin', e.target.value)}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Destination Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                📍 Destination
                            </label>
                            <input
                                type="text"
                                placeholder="Type destination here..."
                                value={carData.destination}
                                onChange={(e) => handleChange('destination', e.target.value)}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Vehicle Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Make */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    Make
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type make here..."
                                    value={carData.make}
                                    onChange={(e) => handleChange('make', e.target.value)}
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Model */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type model here..."
                                    value={carData.model}
                                    onChange={(e) => handleChange('model', e.target.value)}
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Year */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    placeholder="Type year here..."
                                    value={carData.year === 0 ? '' : carData.year}
                                    onChange={(e) => handleChange('year', e.target.value)}
                                    min="1900"
                                    max="2030"
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    Status
                                </label>
                                <select
                                    value={carData.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 cursor-pointer"
                                >
                                    <option value="pickup">📥 Pickup</option>
                                    <option value="delivery">🚚 Delivery</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-amber-400 hover:bg-amber-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                                } text-gray-800`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
                                        <span>Adding...</span>
                                    </div>
                                ) : (
                                    '🚗 Add Car'
                                )}
                            </button>
                        </div>

                        {/* Loading State */}
                        {loading && <LoaderOverlay/>}
                    </div>
                </div>
            </main>
        </MainLayout>
    );
};

export default AddCar;