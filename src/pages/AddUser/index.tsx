import { useState } from 'react';
import { insertUser } from '../../service/userService';
import { useLoader } from '../../hooks/useLoader';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import toast from 'react-hot-toast';
import { MainLayout } from '@/components/Layout/SideBar';

interface UserCreateDTO {
    email: string;
    name: string;
    password: string;
    phone: string;
    isAdmin: boolean;
}

const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const loading = useLoader(isLoading);
    const [userData, setUserData] = useState<UserCreateDTO>({
        email: '',
        name: '',
        password: '',
        phone: '',
        isAdmin: false
    });
    
    const handleChange = (field: keyof UserCreateDTO, value: string | boolean) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleSubmit = async () => {
        // Validações básicas
        if (!userData.email || !userData.name || !userData.password || !userData.phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (userData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            await insertUser(userData);
            toast.success("User added successfully!");

            // Reset form
            setUserData({
                email: '',
                name: '',
                password: '',
                phone: '',
                isAdmin: false
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
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                👤 Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Type name here..."
                                value={userData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                ✉️ Email
                            </label>
                            <input
                                type="email"
                                placeholder="Type email here..."
                                value={userData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>

                        {/* User Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    📱 Phone
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Type phone here..."
                                    value={userData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                    🔒 Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type password here..."
                                    value={userData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                        </div>

                        {/* Admin Status Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                                👑 is Admin?
                            </label>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <label className="flex items-center cursor-pointer group">
                                    <select 
                                        name="isAdmin" 
                                        className="w-full"
                                        onChange={(e) => handleChange('isAdmin', e.target.value === "no" ? false : true)}
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </label>
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
                                        : 'bg-amber-400 hover:bg-amber-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer'
                                } text-gray-800`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
                                        <span>Adding...</span>
                                    </div>
                                ) : (
                                    '👤 Add User'
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

export default AddUser;