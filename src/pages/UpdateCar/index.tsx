import { useEffect, useState } from "react";
import { getAllCars, updateCar } from "../../service/carService";
import { useLoader } from "../../hooks/useLoader";
import { useApi } from "../../hooks/useAPI";
import type { Cars } from "../Home";
import { LoaderOverlay } from "../../components/LoaderOverlay";
import toast from "react-hot-toast";
import { FaCar } from "react-icons/fa";
import { MainLayout } from "@/components/Layout/SideBar";
import { useNavigate } from "react-router-dom";

export const UpdateCar = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [newData, setNewData] = useState("");

  const { data: cars, isLoading } = useApi<Cars[]>({
    queryKey: "cars",
    queryFn: () => getAllCars(user?.domain_email),
    shouldRunOnInit: !!user
  });

  const [loading, setLoading] = useState(false);

  const loadingLoader = useLoader(loading);

  const handleSend = async () => {
    if (!newData.trim()) return;

    setLoading(true);
    try {
      await updateCar(user?.domain_email, selectedCar!, selectedOption, newData);
      toast.success("Car updated successfully!");
      location.reload();
      // Reset form
      setSelectedOption("");
      setNewData("");
    } catch (err) {
      toast.error(`Error! Please try again later ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCar(null);
    setSelectedOption("");
    setNewData("");
  };

  useEffect(() => {
    const handleData = async () => {
      const user = JSON.parse(localStorage.getItem("users") ?? "{}");
      if (!user) {
        navigate("/");
        return;
      }
      setUser(user);
    };
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {isLoading && <LoaderOverlay />}

        {/* Car Selection Step */}
        {!isLoading && cars && cars.length > 0 && !selectedCar ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-amber-400">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                🚗 Select the car you want to update
              </h2>
              <p className="text-gray-600 italic text-sm">
                If you want to change the VIN car, select the wrong one
              </p>
            </div>

            <div className="space-y-3">
              {cars.map((car) => (
                <button
                  key={car.vin_car}
                  onClick={() => setSelectedCar(car.vin_car)}
                  className="w-full bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md group"
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
                  <div className="text-amber-600 font-bold group-hover:translate-x-1 transition-transform duration-200">
                    ▶
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Exibe a mensagem "No cars found" se não houver carros e nenhum carro for selecionado
          !isLoading &&
          (!cars || cars.length === 0 || !selectedCar) && (
            <div className="col-span-full bg-white rounded-2xl p-12 shadow-lg text-center">
              <FaCar className="text-gray-300 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No cars found
              </h3>
              <p className="text-gray-500">Add some cars to get started.</p>
            </div>
          )
        )}

        {/* Update Form Steps */}
        {selectedCar && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-l-8 border-amber-400">
            {/* Selected Car Info */}
            <div className="text-center mb-8">
              <div className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
                Selected Car VIN
              </div>
              <div className="bg-amber-50 border-2 border-dashed border-amber-400 rounded-xl p-4 mb-4 inline-block">
                <div className="font-mono font-semibold text-gray-800 tracking-wide text-lg">
                  {selectedCar}
                </div>
              </div>
              <button
                onClick={resetForm}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 transition-colors duration-200"
              >
                🔄 Change Car
              </button>
            </div>

            {/* Field Selection */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                Select what you want to update
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="">Choose a field...</option>
                <option value="vin">🔤 VIN</option>
                <option value="destination">📍 Destination</option>
                <option value="make">🏭 Make</option>
                <option value="model">🚗 Model</option>
                <option value="year">📅 Year</option>
                <option value="status">📊 Status</option>
              </select>
            </div>

            {/* Data Input */}
            {selectedOption && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    Now type the new {selectedOption}
                  </label>

                  {selectedOption === "status" ? (
                    <select
                      value={newData}
                      onChange={(e) => setNewData(e.target.value)}
                      className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Select status...</option>
                      <option value="pickup">📥 Pickup</option>
                      <option value="delivery">🚚 Delivery</option>
                    </select>
                  ) : (
                    <input
                      type={selectedOption === "year" ? "number" : "text"}
                      placeholder={`Type ${selectedOption} here...`}
                      value={newData}
                      onChange={(e) => setNewData(e.target.value)}
                      min={selectedOption === "year" ? "1900" : undefined}
                      max={selectedOption === "year" ? "2030" : undefined}
                      className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                    />
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSend}
                    disabled={!newData.trim() || loading}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                      !newData.trim() || loading
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-amber-400 hover:bg-amber-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-gray-800"
                    }`}
                  >
                    {loadingLoader ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "✅ Update Car"
                    )}
                  </button>
                </div>

                {/* Loading Indicator */}
                {loadingLoader && <LoaderOverlay />}
              </div>
            )}
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default UpdateCar;
