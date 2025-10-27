import axios from "axios"

type UserCreateDTO = {
    email: string,
    name: string,
    password: string,
    phone: string,
    isAdmin : boolean;
}

export const loginUser = (domain_email: string, phone: string, password: string) => {
    return axios.get(`${import.meta.env.VITE_API_KEY}/users/loginUsers/${domain_email}/${phone}/${password}`);
}

export const getUserByEmail = (email: string) => {
    const res = axios.get(`${import.meta.env.VITE_API_KEY}/users/getUsers/${email}`); 
    return res;
}

export const getAllUsers = () => {
    const res = axios.get(`${import.meta.env.VITE_API_KEY}/users/getAllUsers`);
    return res;
}

export const insertUser = (userCreateDTO: UserCreateDTO) => {
    return axios.post(`${import.meta.env.VITE_API_KEY}/users/createUsers`, userCreateDTO)
}

export const updateUser = (email: string,  selectedOption: string, newData: string) => {
    return axios.put(`${import.meta.env.VITE_API_KEY}/users/updateUsers/${email}`, {
        [selectedOption]: newData
    })
}

export const deleteUser = (email: string) => {
    return axios.delete(`${import.meta.env.VITE_API_KEY}/users/deleteUsers/${email}`);
}