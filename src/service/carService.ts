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

export const getAllCars = async(): Promise<Cars[]> =>{
    const res = await axios.get<Cars[]>(`${import.meta.env.VITE_API_KEY}/cars/getAllCars`);
    return res.data;
}

export const insertCar = (car: CarProps) =>{
    return axios.post(`${import.meta.env.VITE_API_KEY}/cars/createCars`, car);
}

export const updateCar = (selectedCar: string, selectedOption: string, updateCarDTO: string) => {
    return axios.put(`${import.meta.env.VITE_API_KEY}/cars/updateCars/${selectedCar}`, { [selectedOption]: updateCarDTO });
}

export const deleteCar = (selectedCar: string) =>{
    return axios.delete(`${import.meta.env.VITE_API_KEY}/cars/deleteCars/${selectedCar}`);
}