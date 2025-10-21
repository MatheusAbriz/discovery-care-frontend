import { useState } from 'react';
import { MainLayout } from '@/components/Layout/SideBar';
import toast from 'react-hot-toast';
import { getUserByEmail, updateUser } from '@/service/userService';

type UserDTO = {
    email_user: {
        stringValue: string,
        valueType: string
    },
    isAdmin: {
        booleanValue: boolean,
        valueType: string
    },
    name_user: string,
    password_user: string,
    phone_user: string
}

const UpdateUser = () => {
    const [userEmail, setUserEmail] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [newData, setNewData] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const handleEmail = async () => {
        if (!userEmail.trim()) {
            toast.error('Please enter an email address');
            return;
        }

        setVerifying(true);
        try {
            const res = await getUserByEmail(userEmail);
            if(res.status === 200 && res.data === undefined){
                setSelectedUser(res.data._fieldsProto);
            }else{
                toast.error("Error! Please, type a valid email!");
            }
        } catch (err) {
            toast.error('Please type a valid email!');
        } finally {
            setVerifying(false);
        }
    };

    const handleSend = async () => {
        if (!newData.trim()) {
            toast.error('Please enter a value');
            return;
        }

        setLoading(true);
        try {
            await updateUser(userEmail, selectedOption, newData);
            toast.success('User updated successfully!');
            
            setSelectedUser(null);
            setUserEmail('');
            setSelectedOption('');
            setNewData('');
        } catch (err) {
            toast.error(`We found an error! ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-amber-50">
                {/* Header */}
                <header className="bg-gray-800 text-white px-6 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-50 mb-4">
                            Update User
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-6 py-8">
                    {/* Email Verification Step */}
                    {!selectedUser && (
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-purple-400">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    Type the email of the user you want to update
                                </h2>
                                <p className="text-gray-600 italic text-sm">
                                    If you want to change a wrong email, type the wrong one and then type it right!
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-purple-600 uppercase tracking-wide">
                                        ✉️ Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Type the email here..."
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleEmail()}
                                        className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <button
                                    onClick={handleEmail}
                                    disabled={verifying || !userEmail.trim()}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                                        verifying || !userEmail.trim()
                                            ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                            : 'bg-purple-400 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-gray-800'
                                    }`}
                                >
                                    {verifying ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                                            <span>Verifying...</span>
                                        </div>
                                    ) : (
                                        '🔍 Verify User'
                                    )}
                                </button>

                                {verifying && (
                                    <div className="text-center py-4">
                                        <div className="inline-flex items-center space-x-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                                            <span className="text-gray-600 font-medium">Searching for user...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Update Form Steps */}
                    {selectedUser && (
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-purple-400">
                            {/* Selected User Info */}
                            <div className="text-center mb-8">
                                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                                    Selected User Email
                                </div>
                                <div className="bg-purple-50 border-2 border-dashed border-purple-400 rounded-xl p-4 mb-4 inline-block">
                                    <div className="font-mono font-semibold text-gray-800 tracking-wide text-lg">
                                        {selectedUser.email_user.stringValue}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setUserEmail('');
                                        setSelectedOption('');
                                        setNewData('');
                                    }}
                                    className="bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 transition-colors duration-200"
                                >
                                    🔄 Change User
                                </button>
                            </div>

                            {/* Field Selection */}
                            <div className="space-y-2 mb-6">
                                <label className="block text-sm font-semibold text-purple-600 uppercase tracking-wide">
                                    Select what you want to update
                                </label>
                                <select
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        setNewData('');
                                    }}
                                    className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 cursor-pointer"
                                >
                                    <option value="">Choose a field...</option>
                                    <option value="email">✉️ Email</option>
                                    <option value="password">🔒 Password</option>
                                    <option value="phone">📱 Phone</option>
                                </select>
                            </div>

                            {/* Data Input */}
                            {selectedOption && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-purple-600 uppercase tracking-wide">
                                            Now type the new {selectedOption}
                                        </label>
                                        <input
                                            type={selectedOption === 'password' ? 'password' : selectedOption === 'email' ? 'email' : 'tel'}
                                            placeholder={`Type ${selectedOption} here...`}
                                            value={newData}
                                            onChange={(e) => setNewData(e.target.value)}
                                            className="w-full px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4">
                                        <button
                                            onClick={handleSend}
                                            disabled={!newData.trim() || loading}
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                                                (!newData.trim() || loading)
                                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                    : 'bg-purple-400 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-gray-800'
                                            }`}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center space-x-2">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                                                    <span>Updating...</span>
                                                </div>
                                            ) : (
                                                '✅ Update User'
                                            )}
                                        </button>
                                    </div>

                                    {/* Loading Indicator */}
                                    {loading && (
                                        <div className="text-center py-4">
                                            <div className="inline-flex items-center space-x-3">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                                                <span className="text-gray-600 font-medium">Updating user...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </MainLayout>
    );
};

export default UpdateUser;