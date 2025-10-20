import { useState } from 'react';
import { MainLayout } from '@/components/Layout/SideBar';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useApi } from '@/hooks/useAPI';
import { getAllCars } from '@/service/carService';
import { getAllRecipes } from '@/service/recipeService';

interface Car {
    vin_car: string;
    make_car: string;
    model_car: string;
    year_car: string;
    destination_car: string;
    status_car: string;
    isDelivered: boolean;
}

interface Recipe {
    destination_recipe: string;
    timeStamp_recipe: number;
    driverSignature_recipe: boolean;
    customerSignature_recipe: boolean;
    deliveryComments_recipe: string;
    reportedDamages_recipe: any;
    carData_recipe: any;
}

const DeliveriesDetails = () => {
    const { data: cars, isLoading } = useApi<Car[]>({
        queryKey: "deliveryCars",
        queryFn: getAllCars
    })
    const { data: recipes, isLoading: isLoadingRecipes } = useApi<Recipe[]>({
        queryKey: "recipes",
        queryFn: getAllRecipes
    })
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const getRecipeForVin = (vin: string) => {
        if(!recipes) return undefined;
        return recipes?.find(recipe => {
            const carData = recipe?.carData_recipe?.[0]?.car;
            const carVin = Array.isArray(carData) ? carData[0]?.vinCar : carData?.vinCar;
            return carVin === vin;
        });
    };

    const formatTimestamp = (timestamp: number) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getDeliveryStatus = (car: Car) => {
        if (car.isDelivered) {
            return { status: 'COMPLETED', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-300', icon: FaCheckCircle };
        } else {
            return { status: 'IN DELIVERY', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300', icon: FaExclamationTriangle };
        }
    };

    const openRecipeModal = (car: Car, recipeData: Recipe | undefined) => {
        setSelectedCar(car);
        setSelectedRecipe(recipeData || null);
        setModalVisible(true);
    };

    const closeRecipeModal = () => {
        setModalVisible(false);
        setSelectedRecipe(null);
        setSelectedCar(null);
    };

    const availableDeliveries = cars?.filter(car => car.isDelivered) ?? [];

    const getStats = () => {
        if (!cars?.length) return { total: 0, pending: 0, completed: 0, failed: 0 };

        const total = cars.length;
        let pending = 0, completed = 0;

        cars.forEach(car => {
            const statusInfo = getDeliveryStatus(car);
            if (statusInfo.status === 'COMPLETED') {
                completed++;
            } else {
                pending++;
            }
        });

        return { total, pending, completed };
    };

    const stats = getStats();

    return (
        <MainLayout>
            <div className="min-h-screen bg-amber-50">
                {/* Header with Stats */}
                <header className="bg-gray-800 text-white px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-50 mb-6">
                            Deliveries List
                        </h1>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-700/50 rounded-2xl p-4 border border-gray-600">
                                <div className="text-3xl font-bold text-amber-50">{stats.total}</div>
                                <div className="text-sm text-gray-300 mt-1">Total</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-2xl p-4 border border-gray-600">
                                <div className="text-3xl font-bold text-amber-50">{stats.pending}</div>
                                <div className="text-sm text-gray-300 mt-1">Pending</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-2xl p-4 border border-gray-600">
                                <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
                                <div className="text-sm text-gray-300 mt-1">Completed</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-8">
                    {isLoading && isLoadingRecipes ? (
                        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
                            <div className="inline-flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
                                <span className="text-gray-600 font-medium text-lg">Loading deliveries...</span>
                            </div>
                        </div>
                    ) : availableDeliveries?.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {availableDeliveries?.map((car) => {
                                const recipeData = getRecipeForVin(car.vin_car);
                                const statusInfo = getDeliveryStatus(car);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div key={car.vin_car} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-amber-400">
                                        {/* Card Header */}
                                        <div className="p-6 border-b border-gray-100">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-amber-600 mb-1">📍 DESTINATION</div>
                                                    <div className="text-lg font-bold text-gray-800">
                                                        {recipeData?.destination_recipe || car.destination_car}
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} flex items-center gap-2`}>
                                                    <StatusIcon size={12} />
                                                    {statusInfo.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vehicle Details */}
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">VIN</div>
                                                    <div className="font-mono text-sm font-bold text-gray-800">
                                                        {car.vin_car.slice(-8)}
                                                    </div>
                                                </div>
                                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">MAKE</div>
                                                    <div className="text-sm font-bold text-gray-800">{car.make_car}</div>
                                                </div>
                                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">MODEL</div>
                                                    <div className="text-sm font-bold text-gray-800">{car.model_car}</div>
                                                </div>
                                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">YEAR</div>
                                                    <div className="text-sm font-bold text-gray-800">{car.year_car}</div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => openRecipeModal(car, recipeData)}
                                                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
                            <div className="text-6xl mb-4 opacity-50">📦</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No deliveries found</h3>
                            <p className="text-gray-600">
                                There are no pending deliveries at the moment. Check back later.
                            </p>
                        </div>
                    )}
                </main>

                {/* Modal */}
                {modalVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-2xl font-extrabold text-gray-800">Delivery Details</h3>
                                <button
                                    onClick={closeRecipeModal}
                                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                                >
                                    <FaTimes className="text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[70vh]">
                                {selectedRecipe ? (
                                    <div className="space-y-6">
                                        {/* Vehicle Info Section */}
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-3">Vehicle Information</h4>
                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                    <span className="text-sm font-semibold text-gray-600">VIN</span>
                                                    <span className="font-mono text-sm font-bold text-gray-800">
                                                        {selectedCar?.vin_car.slice(-8)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-sm font-semibold text-gray-600">Make/Model</span>
                                                    <span className="text-sm font-bold text-gray-800">
                                                        {selectedCar?.make_car} {selectedCar?.model_car}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delivery Status Section */}
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-3">Delivery Status</h4>
                                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                    <span className="text-sm font-semibold text-gray-600">Timestamp</span>
                                                    <span className="text-sm font-bold text-gray-800">
                                                        {formatTimestamp(selectedRecipe.timeStamp_recipe)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-sm font-semibold text-gray-600">Signatures</span>
                                                    <span className="text-sm font-bold text-gray-800">
                                                        Driver: {selectedRecipe.driverSignature_recipe ? '✅' : '❌'} | 
                                                        Customer: {selectedRecipe.customerSignature_recipe ? '✅' : '❌'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comments */}
                                        {selectedRecipe.deliveryComments_recipe && (
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-3">Comments</h4>
                                                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
                                                    <p className="text-gray-800 leading-relaxed">
                                                        {selectedRecipe.deliveryComments_recipe}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h4 className="text-xl font-bold text-gray-600 mb-2">No Delivery Data</h4>
                                        <p className="text-gray-500">
                                            The delivery process for this vehicle has not started yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default DeliveriesDetails;