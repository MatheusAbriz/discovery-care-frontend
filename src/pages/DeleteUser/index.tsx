import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/Layout/SideBar';
import { useApi } from '@/hooks/useAPI';
import { getAllCars } from '@/service/carService';
import { deleteUser, getAllUsers } from '@/service/userService';
import toast from 'react-hot-toast';

interface User {
    email_user: string;
    name_user?: string;
    phone_user?: string;
    isAdmin?: boolean;
}

const DeleteUser = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: users, isLoading, refetch } = useApi({
        queryKey: "deleteUsers",
        queryFn: getAllUsers
    })

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteUser(selectedUser!);
            toast.success("Done! User deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Error! Please, try again later!")
        } finally {
            setLoading(false);
            setSelectedUser(null);
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    const handleUserSelect = (email: string) => {
        setSelectedUser(email);
        setShowModal(true);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-amber-50">
                {/* Header */}
                <header className="bg-gray-800 text-white px-6 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-50 mb-4">
                            Delete User
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 py-8">
                    {/* Loading State for Users */}
                    {isLoading && (
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-purple-400">
                            <div className="text-center py-8">
                                <div className="inline-flex items-center space-x-3">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                                    <span className="text-gray-600 font-medium">Loading users...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Selection */}
                    {!isLoading && (
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-red-400">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    👤 Select the user you want to delete
                                </h2>
                            </div>
                            
                            {users?.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-500 text-lg">No users available</div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {users?.data.map((user: User) => (
                                        <button
                                            key={user.email_user}
                                            onClick={() => handleUserSelect(user.email_user)}
                                            className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md group"
                                        >
                                            <div className="text-left flex-1">
                                                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                                                    EMAIL
                                                </div>
                                                <div className="font-mono font-semibold text-gray-800 tracking-wide text-sm mb-1">
                                                    {user.email_user}
                                                </div>
                                                {user.name_user && (
                                                    <div className="text-xs text-gray-600">
                                                        {user.name_user}
                                                        {user.isAdmin && (
                                                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
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
                                <div className="bg-gray-800 px-6 py-6 border-b border-purple-200">
                                    <h3 className="text-xl font-extrabold text-amber-50 text-center tracking-wide">
                                        Are you sure?
                                    </h3>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6">
                                    <div className="text-center mb-8">
                                        <div className="text-6xl mb-4">⚠️</div>
                                        <p className="text-gray-800 text-lg font-medium leading-relaxed mb-4">
                                            Are you sure you want to delete this user?
                                        </p>
                                        {selectedUser && (
                                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <div className="font-mono font-semibold text-red-700 text-sm break-all">
                                                    {selectedUser}
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
                                    {loading && (
                                        <div className="text-center py-4 mt-4">
                                            <div className="inline-flex items-center space-x-3">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                                                <span className="text-gray-600 font-medium">Deleting user...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </MainLayout>
    );
};

export default DeleteUser;