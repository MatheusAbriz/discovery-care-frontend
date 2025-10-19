import { createRoot } from 'react-dom/client'
import { Home } from "./pages/Home";
import { GlobalStyle } from "./globals/theme";
import { Login } from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AddCar from './pages/AddCar';
import UpdateCar from './pages/UpdateCar';
import DeleteCar from './pages/DeleteCar';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './Guard/protectedRoute';
import AddUser from './pages/AddUser';
import DeliveriesDetails from './pages/DeliveryDetails';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(<>
  <AuthProvider>
    <GlobalStyle/>
    <Toaster position="top-right"/>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Login/></ProtectedRoute>}/>
          <Route path="/adm" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/addCar" element={<AddCar/>}/>
          <Route path="/updateCar" element={<UpdateCar/>}/>
          <Route path="/deleteCar" element={<DeleteCar/>}/>

          <Route path="/addUser" element={<AddUser/>}/>

          <Route path="/deliveryDetails" element={<DeliveriesDetails/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
</>)
