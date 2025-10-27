import { useEffect, useState } from 'react';
import { deleteCar, getAllCars } from '../../service/carService';
import { useApi } from '../../hooks/useAPI';
import type { Cars } from '../Home';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import { useLoader } from '../../hooks/useLoader';
import toast from 'react-hot-toast';
import { FaCar } from 'react-icons/fa';
import { MainLayout } from '@/components/Layout/SideBar';
import { useNavigate } from 'react-router-dom';

const DeleteCar = () => {
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);

    const { data: cars, isLoading, refetch } = useApi<Cars[]>({
        queryKey: 'cars',
        queryFn: () => getAllCars(user?.domain_email),
        shouldRunOnInit: !!user
    })

    const loadingLoader = useLoader(loading);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteCar(user?.domain_email, selectedCar!);
            
            // Remove car from local state
            refetch();
            
            toast.success("Car deleted successfully!");
        } catch (error) {
            toast.error(`Error! Please, try again later! ${error}`);
        } finally {
            setLoading(false);
            setSelectedCar(null);
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        setSelectedCar(null);
        setShowModal(false);
    };

    const handleCarSelect = (vinCar: string) => {
        setSelectedCar(vinCar);
        setShowModal(true);
    };

    useEffect(() => {
            const handleData = async() =>{
                const user = JSON.parse(localStorage.getItem('users') ?? '{}');
                if(!user){
                    navigate('/');
                    return;
                }
                setUser(user);
            }
            handleData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    return (
        <MainLayout>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Loading State for Cars */}
                {isLoading && <LoaderOverlay/>}

                {/* Car Selection */}
                {!isLoading && (
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-red-400">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                🚗 Select the car you want to delete
                            </h2>
                        </div>
                        
                        {cars?.length === 0 ? (
                            <div className="col-span-full p-12 text-center">
                                <FaCar className="text-gray-300 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No cars found
                                </h3>
                                <p className="text-gray-500">Add some cars to get started.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cars?.map((car) => (
                                    <button
                                        key={car.vin_car}
                                        onClick={() => handleCarSelect(car.vin_car)}
                                        className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md group"
                                    >
                                        <div className="text-left">
                                            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                                                VIN
                                            </div>
                                            <div className="font-mono font-semibold text-gray-800 tracking-wide">
                                                {car.vin_car}
                                            </div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {car.make_car} {car.model_car} ({car.year_car})
                                            </div>
                                        </div>
                                        <div className="text-red-600 font-bold group-hover:translate-x-1 transition-transform duration-200">
                                            ▶
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300">
                            {/* Modal Header */}
                            <div className="bg-gray-800 px-6 py-6 border-b border-amber-200">
                                <h3 className="text-xl font-extrabold text-amber-50 text-center tracking-wide">
                                    Are you sure?
                                </h3>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="text-center mb-8">
                                    <div className="text-6xl mb-4">⚠️</div>
                                    <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                        Are you sure you want to delete this car?
                                    </p>
                                    {selectedCar && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <div className="font-mono font-semibold text-red-700 text-sm">
                                                VIN: {selectedCar}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Modal Actions */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            loading
                                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                                                <span>Deleting...</span>
                                            </div>
                                        ) : (
                                            '🗑️ Yes, Delete'
                                        )}
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            loading
                                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transform hover:scale-105 active:scale-95'
                                        }`}
                                    >
                                        ❌ No, Cancel
                                    </button>
                                </div>

                                {/* Loading Indicator in Modal */}
                                {loadingLoader && <LoaderOverlay/>}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </MainLayout>
    );
};

export default DeleteCar;