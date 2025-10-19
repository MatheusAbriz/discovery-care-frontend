import axios from "axios"

type UserCreateDTO = {
    email: string,
    name: string,
    password: string,
    phone: string,
    isAdmin : boolean;
}

export const loginUser = (email: string, password: string) => {
    return axios.get(`${import.meta.env.VITE_API_KEY}/users/loginUsers/${email}/${password}`);
}

export const insertUser = (userCreateDTO: UserCreateDTO) => {
    return axios.post(`${import.meta.env.VITE_API_KEY}/users/createUsers`, userCreateDTO)
}