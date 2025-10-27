import axios from "axios";
import type { StatusEnums } from "../enums/CarEnums";
import type { Cars } from "../pages/Home";

type CarProps = {
    vin: string,
    destination: string,
    make: string,
    model: string,
    year: number,
    status: StatusEnums.PICKUP | StatusEnums.DELIVERY | StatusEnums.DELIVERED
}

export const getAllCars = async(domain_email: string): Promise<Cars[]> =>{
    const res = await axios.get<Cars[]>(`${import.meta.env.VITE_API_KEY}/cars/getAllCars/${domain_email}`);
    return res.data;
}

export const insertCar = (domain_email: string, car: CarProps) =>{
    return axios.post(`${import.meta.env.VITE_API_KEY}/cars/createCars/${domain_email}`, car);
}

export const updateCar = (domain_email: string, selectedCar: string, selectedOption: string, updateCarDTO: string) => {
    return axios.put(`${import.meta.env.VITE_API_KEY}/cars/updateCars/${domain_email}/${selectedCar}`, { [selectedOption]: updateCarDTO });
}

export const deleteCar = (domain_email: string, selectedCar: string) =>{
    return axios.delete(`${import.meta.env.VITE_API_KEY}/cars/deleteCars/${domain_email}/${selectedCar}`);
}