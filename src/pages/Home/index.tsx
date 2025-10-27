import { useEffect, useState } from 'react';
import { FaPlus, FaCar, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaClock, FaTruck, FaInbox, FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../globals/buttons';
import { Button } from '../components/ui/button';
import { useApi } from '../../hooks/useAPI';
import { deleteCar, getAllCars } from '../../service/carService';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import { useLoader } from '../../hooks/useLoader';
import toast from 'react-hot-toast';
import { MainLayout } from '@/components/Layout/SideBar';

export type Cars = {
    vin_car: string,
    make_car: string,
    model_car: string,
    year_car: string,
    destination_car: string,
    status_car: string,
    isDelivered: boolean
}

export const Home = () => {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();
    const [loadingDelete, setLoadingDelete] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    
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

    const { data: cars, isLoading, refetch } = useApi<Cars[]>({
        queryKey: 'cars',
        queryFn: () => getAllCars(user?.domain_email),
        shouldRunOnInit: !!user
    })

    const loading = useLoader(isLoading);


    const getStatusIcon = (status: string, isDelivered: boolean) => {
        if (isDelivered) {
            return <FaCheckCircle className="text-green-500" />;
        }
        return status === 'pickup' ? 
            <FaInbox className="text-blue-500" /> : 
            <FaTruck className="text-orange-500" />;
    };

    const getStatusText = (status: string, isDelivered: boolean) => {
        if (isDelivered) return 'Delivered';
        return status === 'pickup' ? 'Pickup' : 'In Delivery';
    };

    const getStatusColor = (status: string, isDelivered: boolean) => {
        if (isDelivered) return 'bg-green-100 text-green-800 border-green-200';
        return status === 'pickup' ? 
            'bg-blue-100 text-blue-800 border-blue-200' : 
            'bg-orange-100 text-orange-800 border-orange-200';
    };

    const filteredCars = cars?.filter(car => {
        if (filter === 'all') return true;
        if (filter === 'delivered') return car.isDelivered;
        return car.status_car === filter;
    });

    const handleDeleteCar = async(vin: string) => {
        try{
            setLoadingDelete(true);
            await deleteCar(user?.domain_email, vin);
            toast.success("Car deleted successfully!");
            refetch();
        }catch(err){
            console.log(err);
            toast.error('Error! Please, try again later!');
        }finally{
            setLoadingDelete(false);
        }
    }

    return (
        //  className="bg-amber-50"
        <MainLayout>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Cars</p>
                                <p className="text-3xl font-bold text-gray-800">{cars?.length}</p>
                            </div>
                            <FaCar className="text-blue-400 text-2xl" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Delivered</p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {cars?.filter(car => car.isDelivered).length}
                                </p>
                            </div>
                            <FaCheckCircle className="text-green-400 text-2xl" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">In Transit</p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {cars?.filter(car => car.status_car === 'delivery' && !car.isDelivered).length}
                                </p>
                            </div>
                            <FaTruck className="text-orange-400 text-2xl" />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Pickup</p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {cars?.filter(car => car.status_car === 'pickup').length}
                                </p>
                            </div>
                            <FaInbox className="text-amber-400 text-2xl" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Cars</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { key: 'all', label: 'All Cars' },
                            { key: 'pickup', label: 'Pickup' },
                            { key: 'delivered', label: 'Delivered' },
                        ].map(filterOption => (
                            <button
                                key={filterOption.key}
                                onClick={() => setFilter(filterOption.key)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    filter === filterOption.key
                                        ? 'bg-amber-400 text-gray-800 shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filterOption.label}
                            </button>
                        ))}
                        <StyledButton size="large" variant="primary" onClick={() => navigate('/addCar')}>
                            <FaPlus className="mr-2"/> 
                            Add Car
                        </StyledButton>
                    </div>
                </div>

                {loading && <LoaderOverlay/>}

                {/* Cars Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredCars?.length === 0 ? (
                            <div className="col-span-full bg-white rounded-2xl p-12 shadow-lg text-center">
                                <FaCar className="text-gray-300 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars found</h3>
                                <p className="text-gray-500">Try adjusting your filters or add some cars to get started.</p>
                            </div>
                        ) : (
                            filteredCars?.map((car) => (
                                <div key={car.vin_car} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 text-white">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">
                                                    {car.make_car} {car.model_car}
                                                </h3>
                                                <div className="flex items-center gap-2 text-amber-200">
                                                    <FaCalendarAlt size={14}/>
                                                    <span className="text-sm">{car.year_car}</span>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(car.status_car, car.isDelivered)}`}>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(car.status_car, car.isDelivered)}
                                                    {getStatusText(car.status_car, car.isDelivered)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {/* VIN */}
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                                                    VIN Number
                                                </p>
                                                <p className="font-mono text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                                                    {car.vin_car}
                                                </p>
                                            </div>

                                            {/* Destination */}
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
                                                    Destination
                                                </p>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaMapMarkerAlt className="text-red-500" />
                                                    <span className="font-medium">{car.destination_car}</span>
                                                </div>
                                            </div>

                                            {/* Status Details */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Delivery Status</span>
                                                    <div className="flex items-center gap-2">
                                                        {car.isDelivered ? (
                                                            <span className="text-green-600 font-medium flex items-center gap-1">
                                                                <FaCheckCircle size={16} />
                                                                Complete
                                                            </span>
                                                        ) : (
                                                            <span className="text-orange-600 font-medium flex items-center gap-1">
                                                                <FaClock size={16} />
                                                                In Progress
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex items-center justify-start gap-4 flex-wrap">
                                                    <Button 
                                                        variant="destructive" 
                                                        onClick={() => handleDeleteCar(car.vin_car)}
                                                        disabled={loadingDelete} 
                                                        className="cursor-pointer"
                                                        >
                                                            <FaTrashAlt size={16}/>
                                                            <span className="text-sm text-white">
                                                                {loadingDelete ? "Deleting..." : "Delete Car"}
                                                            </span>  
                                                    </Button>

                                                    <Button
                                                        variant="default"
                                                        onClick={() => navigate(`/updateCar`)}
                                                        className="cursor-pointer"
                                                    >
                                                        <FaEdit size={16}/>
                                                        <span className="text-sm text-white">Update Car</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Results Summary */}
                {!loading && filteredCars && filteredCars.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-center text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{filteredCars?.length}</span> of <span className="font-semibold text-gray-800">{cars?.length}</span> cars
                        </div>
                    </div>
                )}
            </main>
        </MainLayout>
    );
};