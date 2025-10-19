import { useAuth, type User } from "@/context/authContext";
import logo from "../../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaEdit, FaTrash, FaUser, FaUserEdit, FaUserMinus, FaCar, FaUsers, FaCrown, FaTruck, FaChartLine, FaFileAlt } from "react-icons/fa";

export const Header = () => {
    const { getUser } = useAuth();
    const user: User = getUser();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const carMenuItems = [
        { path: "/adm", label: "Home", icon: FaHome },
        { path: "/addCar", label: "Add Car", icon: FaPlus },
        { path: "/updateCar", label: "Update Car", icon: FaEdit },
        { path: "/deleteCar", label: "Remove Car", icon: FaTrash }
    ];

    const deliveryMenuItems = [
        { path: "/deliveryDetails", label: "Details", icon: FaChartLine },
        { path: "/deliveryReports", label: "Reports", icon: FaFileAlt }
    ];

    const userMenuItems = [
        { path: "/addUser", label: "Add User", icon: FaUser },
        { path: "/updateUsers", label: "Update User", icon: FaUserEdit },
        { path: "/removeUsers", label: "Remove User", icon: FaUserMinus }
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700 flex flex-col z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-700 bg-gray-800/50">
                <div className="flex items-center justify-center mb-3">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <img 
                            src={logo} 
                            alt="Discovery Care Logo" 
                            width="60" 
                            height="60" 
                            className="relative rounded-full border-4 border-amber-400 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>
                <h2 className="text-amber-400 text-center font-bold text-lg tracking-wide">
                    Discovery Care
                </h2>
                <p className="text-gray-400 text-center text-xs mt-1">
                    Admin Panel
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {/* Car Management Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 px-3 mb-3">
                        <FaCar className="text-amber-400 text-sm" />
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                            Car Management
                        </h3>
                    </div>
                    <ul className="space-y-1">
                        {carMenuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-lg
                                            transition-all duration-300 group relative overflow-hidden
                                            ${active 
                                                ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/50' 
                                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-amber-400'
                                            }
                                        `}
                                    >
                                        {/* Animated Background on Hover */}
                                        {!active && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        )}
                                        
                                        <Icon className={`
                                            text-lg relative z-10 transition-transform duration-300
                                            ${active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}
                                        `} />
                                        <span className={`
                                            font-medium text-sm relative z-10
                                            ${active ? 'font-bold' : ''}
                                        `}>
                                            {item.label}
                                        </span>
                                        
                                        {/* Active Indicator */}
                                        {active && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Delivery Insights Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 px-3 mb-3">
                        <FaTruck className="text-blue-400 text-sm" />
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                            Deliveries Details
                        </h3>
                    </div>
                    <ul className="space-y-1">
                        {deliveryMenuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-lg
                                            transition-all duration-300 group relative overflow-hidden
                                            ${active 
                                                ? 'bg-blue-400 text-gray-900 shadow-lg shadow-blue-400/50' 
                                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-blue-400'
                                            }
                                        `}
                                    >
                                        {/* Animated Background on Hover */}
                                        {!active && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        )}
                                        
                                        <Icon className={`
                                            text-lg relative z-10 transition-transform duration-300
                                            ${active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}
                                        `} />
                                        <span className={`
                                            font-medium text-sm relative z-10
                                            ${active ? 'font-bold' : ''}
                                        `}>
                                            {item.label}
                                        </span>
                                        
                                        {/* Active Indicator */}
                                        {active && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* User Management Section - Admin Only */}
                {user.isAdmin && (
                    <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-2 px-3 mb-3">
                            <FaUsers className="text-purple-400 text-sm" />
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                User Management
                            </h3>
                            <FaCrown className="text-yellow-400 text-xs ml-auto" title="Admin Only" />
                        </div>
                        <ul className="space-y-1">
                            {userMenuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                
                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg
                                                transition-all duration-300 group relative overflow-hidden
                                                ${active 
                                                    ? 'bg-purple-400 text-gray-900 shadow-lg shadow-purple-400/50' 
                                                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-purple-400'
                                                }
                                            `}
                                        >
                                            {/* Animated Background on Hover */}
                                            {!active && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            )}
                                            
                                            <Icon className={`
                                                text-lg relative z-10 transition-transform duration-300
                                                ${active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}
                                            `} />
                                            <span className={`
                                                font-medium text-sm relative z-10
                                                ${active ? 'font-bold' : ''}
                                            `}>
                                                {item.label}
                                            </span>
                                            
                                            {/* Active Indicator */}
                                            {active && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 rounded-r-full"></div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>            
        </div>
    );
};